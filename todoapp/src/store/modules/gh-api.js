//This file serves as a store module for all API calls
//It uses Axios library fot HTTP requests

import axios from 'axios';

//Set our base url and GitHub authority token to increase rate limit of HTTP requests to Github API
axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common['Authorization'] = 'token a5e20b6590b5f7b8c79d9b9ccb11f5ca25dbef85';

//Looking for the last page in header 'link' and add it to response.lastPage
axios.interceptors.response.use(function (response) {
    if (response.headers.link) {
        const regex = /&(?:page)=(\d+?)>; rel="last"/;
        const match =  regex.exec(response.headers.link);
        if(match) {
            response.lastPage = match[1];
        }
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default {
    //Set namespacing to true so our module getters and functions will receive 'githubApi/' prefix
    namespaced: true,

    state: {
        isLoading: false, //status for loading user details
        repositories: [], //array of repositories populated with contributors for each repository
        contributors: [], //array of users who contributes to Angular repositories populated with contributions and user details
        userDetails: [], //array of users with their personal data
        timestamp: Date.now(), //time of the latest backup
    },

    getters: {
        getRepos: (state) => (state.repositories),

        getUsers: (state) => state.contributors,

        getBackupTime:  (state) => new Date (state.timestamp),

        getLoadingStatus: (state) => state.isLoading
    },

    mutations: {
        //Add passed data to repositories array
        loadRepositories (state, data) {
            state.repositories.push(...data);
        },

        //Populate passed repository with passed contributors array
        addRepo (state, data)  {
            state.repositories.find(repo => repo.name === data.repo).contributors.push(...data.contributors);
        },

        //Add passed user (user login and contributions) to the contributors array
        addUser (state, data) {
            state.contributors.push(data);
        },

        //Populate passed user with new contributions and increase his total contributions count by passed value
        addContribution (state, data) {
            state.contributors.find(e => e.login === data.login).total += data.count;
            state.contributors.find(e => e.login === data.login).contributions.push({repository: data.repo, count: data.count});
        },

        //Fill array of user details with received array of data
        loadUsers (state, data) {
            state.userDetails = data.users;
            state.timestamp = data.timestamp;
        },

        //Populate each contributor from contributors array woth details from userDetails array
        loadUsersDetails (state, data) {
            state.contributors.forEach(user => {
                user.details = data.users.find(e => e.login === user.login)
            });
            state.userDetails = data.users;
        },

        //Changed loading status to passed value
        changeLoadingStatus (state, status) {
            state.isLoading = status;
        },
    },

    actions: {
        //Create an array of repositories. Call the function for each repository to populate it with contributors
        //As far as Github data are paginated, function will be called recursively until we get the last page
        async loadRepositories ({ commit, dispatch }, payload ) {
            try {
                //Waiting until userDetails array will be loaded from database
                await dispatch ('loadCachedData');

                //Set current page and last page from payload data
                let page = payload.page;

                //Requesting passed page of repositories of Angular organisation
                const response =  await axios.get('orgs/angular/repos?per_page=100', {params: {page}});

                //For each repository in received data create the field 'contributors' and call a function
                //to fill this field with contributors of a given repository
                //Page 1 is passed because contributors data are paginated too and we're starting from the 1st page for each repository
                response.data.forEach(repo => {
                    repo.contributors = [];
                    const params = {repo: repo, page: 1};
                    dispatch ('addContributors', params);
                });

                //Add loaded repositories to store
                commit('loadRepositories', response.data);

                //If last page exists and current page is not last, call function recursively and pass the next page to it
                if (response.lastPage && page < response.lastPage) {
                    const params = {page: page + 1};
                    return dispatch ('loadRepositories', params);
                }

            }
            catch (error) {
                console.log('There was an error: ', error)
            }
        },

        //Populate passed repository with contributors and add new found contributors to corresponding array in store
        async addContributors ({ state, commit, dispatch }, payload ) {
            try {
                let repo = payload.repo;
                let page = payload.page;

                //Request passed page of contributors for the passed repository
                const response = await axios.get('repos/angular/' + repo.name +'/contributors?per_page=100', {params: {page}});

                //Check if there are contributors to this repository at all
                if (response.data.length) {
                    //Check if each contributor is present in state contributors array
                    response.data.forEach(user => {
                        if (!state.contributors.filter(e => e.login === user.login).length) {
                            //If there is no such user, push the object with his name, contributions amount, contributions broken down by repository
                            //and user details to contributors array
                            const payload = {
                                login: user.login,
                                total: user.contributions,
                                contributions: [{repository: repo.name, count: user.contributions}],
                                details: state.userDetails.find(e => e.login === user.login) //look for details of a given user in userDetails array
                            };
                            commit('addUser', payload);
                        }
                        else {
                            //If this user is present in contributors array, just add new contributions and increase the amount of contributions
                            const payload = {login: user.login, repo: repo.name, count: user.contributions};
                            commit('addContribution', payload);
                        }
                    });
                }

                //Commit mutation to add passed repository populated with contributors to repositories array
                const storeData = {repo: repo.name, contributors: response.data};
                commit('addRepo', storeData);

                //If last page exists and current page is not last, call function recursively and pass the next page to it
                if (response.lastPage && page < response.lastPage) {
                    const payload = {repo: repo, page: page + 1};
                    return dispatch('addContributors', payload);
                }

            }
            catch (error) {
                console.log('There was an error: ', error)
            }
        },

        //Load cached data from Firebase database at the start of application
        async loadCachedData ({ commit }) {
            const response = await axios.get('data.json', {
                baseURL: 'https://scalac-test.firebaseio.com/'
            });
            const payload = {users: response.data.users, timestamp: response.data.timestamp};
            commit('loadUsers', payload);
        },

        //Load actual user data for all contributors from Github API. Due to huge amount of users this process lasts about 2 minutes
        //That's why the backup array was created - because wait 2 minutes to get data is a bad UX
        async loadActualData ({ state, commit }) {
            try {
                //Set loading status to true
                commit('changeLoadingStatus', true);

                //Create an array of promises
                const promises = [];
                //Fulfil a request of user data and add a promise for each user to promises array
                state.contributors.forEach(user => {
                    promises.push(axios.get('users/' + user.login));
                });

                //Resolve all promises and get the data from them
                const users = await Promise.all(promises);
                const usersData = users.map(user => {
                    return user.data;
                });

                //Save loaded users array to store, overwriting cached user details
                const payload = {users: usersData};
                commit('loadUsersDetails', payload);

                //Send POST-request with received data to Firebase DB creating a new backup
                axios('data.json', {
                    method: 'PUT',
                    baseURL: 'https://scalac-test.firebaseio.com/',
                    data: {
                        users: usersData,
                        timestamp: Date.now()
                    },
                });

                //Set loading status to false
                commit('changeLoadingStatus', false);

            }
            catch (error) {
                console.log('There was an error: ', error)
            }
        },
    }
}