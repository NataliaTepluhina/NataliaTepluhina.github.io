//Store module created for pagination on Home page to prevent application crash on routing from
//User or Repo page back to home after refreshing

export default {
    state: {
        page: 1,
    },

    mutations: {
       ['sortedContributors/PAGINATE'](state, page) {
            state.page = page
            }
        }
}