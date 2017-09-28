//Main store for application state

import Vue from 'vue'
import Vuex from 'vuex'
import sortedContributors from './modules/page'
import githubApi from './modules/gh-api'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        sortedContributors,
        githubApi
    },

    state: {
        sortParameter: 'total', //Initial sorting parameter for the homepage table
        reverse: false,         //Parameter for switching homepage table sort order (ascending/descending)
    },

    getters: {
        //Get current page of homepage table
        getPage: (state) => state.sortedContributors.page,

        getReverse: (state) => state.reverse,

        getSortParameter: (state) => state.sortParameter
    },

    mutations: {
        setSortParameters (state, payload) {
            state.reverse = payload.reverse;
            state.sortParameter = payload.sortParameter;
        }
    },

    actions: {
        //Change sorting parameters to new values
        setSortParameters ({ state, commit }, parameter) {

            //If user clicks on already sorted column, change sorting order to opposite value
            //If user clicks on other column, set sorting order to descending
            const payload = {
                reverse: state.sortParameter === parameter ? !state.reverse : false,
                sortParameter: parameter
            };
            commit ('setSortParameters', payload)
        }
    }
});