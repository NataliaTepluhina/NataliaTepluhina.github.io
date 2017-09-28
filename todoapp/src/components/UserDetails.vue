<template>
    <md-layout md-flex v-if="currentUser">
        <!--Home link-->
        <md-layout md-column md-flex="5" md-align="start">
            <router-link tag="span" to="/">
                <md-icon class="home-icon md-size-2x md-primary">home</md-icon>
            </router-link>
        </md-layout>
        <!--User avatar and name-->
        <md-layout class="user-base" md-column md-flex="25" md-flex-small="100">
            <img class="user-avatar" src="assets/images/gh-avatar.png" :src="currentUser.details.avatar_url" alt="People">
            <h2 class="md-display-1 ">{{ currentUser.details.name }}</h2>
            <h3 class="md-title">{{ currentUser.login }}</h3>
            <md-button :href="currentUser.details.html_url" class="md-primary">
                GitHub Profile
            </md-button>
        </md-layout>

        <md-layout class="user-tabs" md-column md-flex="65" md-flex-small="100">
            <md-tabs md-transparent>
                <md-tab id="info" md-label="User Details">
                    <p class="md-subheading"><em>{{currentUser.details.bio}}</em></p>
                    <p class="md-subheading" v-if="currentUser.details.company">
                        <strong>Company:</strong> {{currentUser.details.company}}
                    </p>
                    <p class="md-subheading">
                        <strong>Followers:</strong> {{currentUser.details.followers}}
                    </p>
                    <p class="md-subheading">
                        <strong>Public repositories:</strong> {{currentUser.details.public_repos}}
                    </p>
                    <p class="md-subheading">
                        <strong>Gists:</strong> {{currentUser.details.public_gists}}
                    </p>
                    <p class="md-subheading" v-if="currentUser.details.location">
                        <strong>From:</strong> <md-icon class="md-primary">place</md-icon>{{currentUser.details.location}}
                    </p>
                </md-tab>

                <md-tab id="angular" md-label="Contributions to Angular">
                    <!--Repositories table-->
                    <p class="md-title contributions-title">Total contributions: {{ currentUser.total }}</p>
                    <md-layout md-align="center">
                        <pagination ref="pagination" for="sortedContributions" :records="currentUser.contributions.length" :per-page="rowsOnPage"></pagination>
                    </md-layout>
                    <md-table class="contributions-table" md-sort="2">
                        <md-table-header>
                            <md-table-row>
                                <md-table-head @click.native="sort('repository')" md-sort-by="1">Repository Name</md-table-head>
                                <md-table-head @click.native="sort('count')" md-sort-by="2">Number of contributions</md-table-head>
                            </md-table-row>
                        </md-table-header>

                        <md-table-body>
                            <md-table-row v-for="(repo, index) in currentContributions" :key="index">
                                <md-table-cell>
                                    <router-link tag="span" class="table-link" :to="'/repo/' + repo.repository">
                                        <md-icon>computer</md-icon>
                                        {{repo.repository}}
                                    </router-link>
                                </md-table-cell>
                                <md-table-cell>{{repo.count}}</md-table-cell>
                            </md-table-row>
                        </md-table-body>
                    </md-table>
                </md-tab>
            </md-tabs>
        </md-layout>
    </md-layout>
</template>

<script>
    import {Pagination, PaginationEvent} from 'vue-pagination-2';
    export default {
        //Get login from router URL
        props: ['login'],

        components: {
            Pagination,
        },

        data() {
            return {
                page: 1,
                rowsOnPage: 10,
                sortParameter: 'count', //for this table sortParameter is local and not saved to store
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
            //Get current user from store contributors array using login as identifier
            currentUser() {
                return this.$store.getters['githubApi/getUsers'].find(user => user.login === this.login);
            },

            //Sort contributions table with lodash
            sortedContributions() {
                let reverse = this.reverse ? 'asc' : 'desc';
                return _.orderBy(this.currentUser.contributions, this.sortParameter, reverse);
            },

            //Get contributions for displaying on current page
            currentContributions() {
                return this.sortedContributions.filter((element, index) => {
                    return (index  >= (this.page - 1) * this.rowsOnPage) && (index  < this.page * this.rowsOnPage);
                });
            }
        },

        created() {
            PaginationEvent.$on('vue-pagination::sortedContributions', page => {
                this.page = page;
            });
        }
    }
</script>

<style scoped lang="scss">
    .user-base {
        align-items: center;
        text-align: center;

        .user-avatar {
            margin-bottom: 20px;
            width: 180px;
            height: 180px;
            border-radius: 180px;
            -webkit-box-shadow: 0 0 10px 0 rgba(50, 50, 50, 0.75);
            -moz-box-shadow:    0 0 10px 0 rgba(50, 50, 50, 0.75);
            box-shadow:         0 0 10px 0 rgba(50, 50, 50, 0.75);
        }
    }

    .user-tabs {
        padding-right: 15px;
    }

    .contributions-title {
        text-align: center;
    }

    .contributions-table {
        .md-table-head {
            width: 50%;
        }
    }

    @media (max-width: 660px) {
        .user-tabs {
            padding-right: 0;
        }

        #angular {
            padding: 15px 0;
        }
    }
</style>