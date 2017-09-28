<template>
    <md-layout md-column>
        <h1 class="md-display-1 main-title">Github.com/Angular contributors</h1>
        <!--Table pagination-->
        <md-layout md-align="center" class="pagination-container">
            <pagination ref="pagination" for="sortedContributors" :records="sortedContributors.length" :per-page="rowsOnPage" :vuex="true"></pagination>
        </md-layout>
        <md-layout md-column>
            <p v-if="!dataLoaded" class="md-title warning">Contributors data is loading...</p>
            <!--Select sorting parameters field for mobile view-->
            <md-layout md-hide-small-and-up >
                <md-input-container class="select-sorting">
                    <label for="parameter">Select sorting parameter</label>
                    <md-select id="parameter" v-model="parameter" @change="sort(parameter)">
                        <md-option value="total">Total contributions</md-option>
                        <md-option value="details.followers">Followers</md-option>
                        <md-option value="details.public_repos">Public repositories</md-option>
                        <md-option value="details.public_gists">Public gists</md-option>
                    </md-select>
                </md-input-container>
            </md-layout>
            <!--Main table-->
            <transition name="slide" mode="out-in">
                <md-table v-if="dataLoaded" class="users-table" md-sort="0">
                    <md-table-header>
                        <md-table-row>
                            <!--Only selected column is visible on mobile-->
                            <md-table-head class="table-user-header">User</md-table-head>
                            <md-table-head :class="{ 'sm-hidden': sortParameter !== 'total' }"
                                           md-sort-by="1"
                                           @click.native="sort('total')">
                                <md-icon class="sort-icon"
                                        v-if="sortParameter === 'total'"
                                        :class="{ 'desc': reverse }">arrow_upward</md-icon>
                                Total contributions
                            </md-table-head>
                            <md-table-head :class="{ 'sm-hidden': sortParameter !== 'details.followers' }"
                                           md-sort-by="2"
                                           @click.native="sort('details.followers')">
                                <md-icon class="sort-icon"
                                         v-if="sortParameter === 'details.followers'"
                                         :class="{ 'desc': reverse }" >arrow_upward</md-icon>
                                Followers
                            </md-table-head>
                            <md-table-head :class="{ 'sm-hidden': sortParameter !== 'details.public_repos' }"
                                           md-sort-by="3"
                                           @click.native="sort('details.public_repos')">
                                <md-icon class="sort-icon"
                                         v-if="sortParameter === 'details.public_repos'"
                                         :class="{ 'desc': reverse }">arrow_upward</md-icon>
                                Public repositories
                            </md-table-head>
                            <md-table-head :class="{ 'sm-hidden': sortParameter !== 'details.public_gists' }"
                                           md-sort-by="4"
                                           @click.native="sort('details.public_gists')">
                                <md-icon class="sort-icon"
                                         v-if="sortParameter === 'details.public_gists'"
                                         :class="{ 'desc': reverse }">arrow_upward</md-icon>
                                Public gists
                            </md-table-head>
                        </md-table-row>
                    </md-table-header>
                    <md-table-body>
                        <md-table-row v-for="(user, index) in currentContributors" v-if="user.details" :key="index">
                            <md-table-cell>
                                <router-link tag="span" class="table-link" :to="'/user/' + user.login">
                                    <md-icon>face</md-icon>
                                    {{ user.login }}
                                </router-link>
                            </md-table-cell >
                            <md-table-cell :class="{ 'sm-hidden': sortParameter !== 'total' }">{{ user.total }}</md-table-cell>
                            <md-table-cell :class="{ 'sm-hidden': sortParameter !== 'details.followers' }">{{ user.details.followers }}</md-table-cell>
                            <md-table-cell :class="{ 'sm-hidden': sortParameter !== 'details.public_repos' }">{{user.details.public_repos}}</md-table-cell>
                            <md-table-cell :class="{ 'sm-hidden': sortParameter !== 'details.public_gists' }">{{user.details.public_gists}}</md-table-cell>
                        </md-table-row>
                    </md-table-body>
                </md-table>
            </transition>
        </md-layout>
    </md-layout>
</template>

<script>
    import {Pagination, PaginationEvent} from 'vue-pagination-2';

    export default {
        data() {
            return {
                rowsOnPage: 15,
                parameter: '', //v-model for select field on mobile view
            }
        },

        components: {
            Pagination,
        },

        methods: {
            //Change sortParameter in store
            sort (parameter) {
                this.$store.dispatch('setSortParameters', parameter);
            },
        },

        computed: {
            //Sorting table according to selected parameter using lodash
            sortedContributors() {
                let reverse = this.reverse ? 'asc' : 'desc';
                return _.orderBy(this.$store.getters['githubApi/getUsers'], this.sortParameter, reverse);
            },

            //Array or contributors for the current page
            currentContributors() {
                return this.sortedContributors.filter((element, index) => {
                    return (index  >= (this.page - 1) * this.rowsOnPage) && (index  < this.page * this.rowsOnPage);
                });
            },

            page() {
                return this.$store.getters['getPage'];
            },

            //Flag for showing table
            dataLoaded() {
                return this.sortedContributors.length
            },

            sortParameter() {
                return this.$store.getters['getSortParameter']
            },

            reverse() {
                return this.$store.getters['getReverse']
            },
        },
    }
</script>

<style lang="scss">
    .main-title {
        text-align: center;
    }
    
    .warning {
        padding-bottom: 30px;
        text-align: center;
    }

    .select-sorting {
        margin: 20px;
    }

    .pagination-container {
        position: relative;
        background-color: #fff;
        z-index: 10;
    }

    .users-table {
        margin-bottom: 40px;

        .md-table-head, .md-table-cell {
            width: 15%;
        }

        .md-sortable-icon {
            display: none;
        }

        .table-user-header {
            width: 40%;
        }

        .sort-icon {
            position: absolute;
            top: 5px;
            left: 0;
            padding-right: 5px;
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

            &.desc {
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -o-transform: rotate(180deg);
                transform: rotate(180deg);
            }
        }
    }


    @media (max-width: 660px) {
        .sm-hidden {
            display: none;
        }

        .users-table {
            .md-table-head, .md-table-cell {
                width: 30%;
            }

            .table-user-header {
                width: 70%;
            }
        }
    }
</style>