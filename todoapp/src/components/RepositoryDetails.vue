<template>
    <md-layout md-flex v-if="currentRepo">
        <!--Home link-->
        <md-layout md-column md-flex="5" md-align="start">
            <router-link tag="span" to="/">
                <md-icon class="home-icon md-size-2x md-primary">home</md-icon>
            </router-link>
        </md-layout>
        <!--Repository name and description-->
        <md-layout class="repo-info" md-column md-flex="25" md-flex-small="100">
            <img class="repo-image" src="../assets/images/gh-avatar.png" alt="Repo Image">
            <h2 class="md-display-1 ">{{ currentRepo.name }}</h2>
            <h3 class="md-title">{{ currentRepo.description }}</h3>
            <md-button :href="currentRepo.html_url" class="md-primary">
                GitHub Link
            </md-button>
        </md-layout>
        <md-layout class="contributors-tab" md-column md-flex="65" md-flex-small="100">
            <md-toolbar class="repo-toolbar">
                <p class="md-title repo-toolbar-title">
                    contributors list
                </p>
            </md-toolbar>
            <p class="md-title contributors-title">Total contributors: {{ currentRepo.contributors.length }}</p>
            <md-layout md-align="center">
                <pagination ref="pagination" for="sortedContributors" :records="sortedContributors.length" :per-page="rowsOnPage"></pagination>
            </md-layout>
            <!--Users table-->
            <md-table class="contributors-table" md-sort="2">
                <md-table-header>
                    <md-table-row>
                        <md-table-head @click.native="sort('login')" md-sort-by="1">User Login</md-table-head>
                        <md-table-head @click.native="sort('contributions')" md-sort-by="2">Number of contributions</md-table-head>
                    </md-table-row>
                </md-table-header>

                <md-table-body>
                    <md-table-row v-for="(user, index) in currentContributors" :key="index">
                        <md-table-cell>
                            <router-link tag="span" class="table-link" :to="'/user/' + user.login">
                                <md-icon>face</md-icon>
                                {{user.login}}
                            </router-link>
                        </md-table-cell>
                        <md-table-cell>{{user.contributions}}</md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>
        </md-layout>
    </md-layout>
</template>

<script>
    import {Pagination, PaginationEvent} from 'vue-pagination-2';
    export default {
        //Get repository name from router URL
        props: ['name'],

        components: {
            Pagination,
        },

        data() {
            return {
                page: 1,
                rowsOnPage: 10,
                sortParameter: 'contributions', //for this table sortParameter is local and not saved to store
                reverse: false
            }
        },

        methods: {
            //Set sort parameters and reverse after click on table headers
            sort(parameter) {
                this.reverse = this.sortParameter === parameter ? !this.reverse : false;
                this.sortParameter = parameter;
            }
        },

        computed: {
            //Get current repository from store contributors array using login as identifier
            currentRepo() {
                return this.$store.getters['githubApi/getRepos'].find(repo => repo.name === this.name);
            },

            //Sort contributions table with lodash. User login sorting in case-insensitive
            sortedContributors() {
                let reverse = this.reverse ? 'asc' : 'desc';
                return _.orderBy(this.currentRepo.contributors, [user => {
                    if(typeof user[this.sortParameter] === 'string') {
                       return user[this.sortParameter].toLowerCase()
                    }
                    else {
                        return user[this.sortParameter];
                    }

                }], reverse);
            },

            //Get contributors for displaying on current page
            currentContributors() {
                return this.sortedContributors.filter((element, index) => {
                    return (index  >= (this.page - 1) * this.rowsOnPage) && (index  < this.page * this.rowsOnPage);
                });
            }
        },

        created() {
            PaginationEvent.$on('vue-pagination::sortedContributors', page => {
                this.page = page;
            });
        }
    }
</script>

<style scoped lang="scss">
    .repo-info {
        align-items: center;
        text-align: center;
        padding: 0 15px;

        .repo-image {
            margin-bottom: 20px;
            width: 120px;
            height: 120px;
            -webkit-border-radius: 120px;
            -moz-border-radius: 120px;
            border-radius: 120px;
            -webkit-box-shadow: 0 0 10px 0 rgba(50, 50, 50, 0.75);
            -moz-box-shadow:    0 0 10px 0 rgba(50, 50, 50, 0.75);
            box-shadow:         0 0 10px 0 rgba(50, 50, 50, 0.75);
        }
    }

    .repo-toolbar {
        min-height: 48px;
        .repo-toolbar-title {
            font-size: 14px;
            font-weight: 500;
            text-transform: uppercase;
        }
    }

    .contributors-tab {
        padding-right: 15px;
        padding-bottom: 15px;
        
        .contributors-title {
            text-align: center;
        }

        .contributors-table {
            .md-table-head {
                width: 50%;
            }
        }
    }



    @media (max-width: 660px) {
        .contributors-tab {
            padding-right: 0;
        }
    }
</style>