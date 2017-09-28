<template>
    <md-layout class="main" md-align="center">
        <div class="header"></div>
        <md-layout md-flex md-column class="container">
            <!--Progress bar-->
            <md-progress class="progress" md-indeterminate v-if="isLoading"></md-progress>
            <md-whiteframe md-elevation="4" class="view">
                <transition name="slide" mode="out-in">
                    <!--Disclaimer will be shown if backup is older that 1 hour-->
                    <md-whiteframe md-elevation="2" v-show="disclaimerTimeout">
                        <md-layout class="disclaimer">
                            <md-layout md-flex="80" md-flex-small="100" >
                                <p class="md-subheading disclaimer-text">You are using cached user details data (followers, public repositories and gists). Last sync was made at {{timestamp}}.
                                    To load actual user details from GitHub please click the button. This process will last around 2 minutes</p>
                            </md-layout>
                            <!--Button to load actual data-->
                            <md-layout md-flex="20" md-flex-small="100" md-align="center">
                                <md-button class="md-raised md-primary disclaimer-button" @click="getActualData">load actual data</md-button>
                            </md-layout>
                        </md-layout>
                    </md-whiteframe>
                </transition>
                <!--Router view to switch between views-->
                <transition name="slide" mode="out-in">
                    <router-view></router-view>
                </transition>
            </md-whiteframe>
        </md-layout>
        <!--Message to be shown after actual data loading-->
        <md-snackbar md-position="bottom center" ref="snackbar" :md-duration="5000">
            <span>User details are up-to-date</span>
            <md-button class="md-accent" @click="$refs.snackbar.close()">Close</md-button>
        </md-snackbar>
    </md-layout>
</template>

<script>
    export default {
        data() {
            return {
                disclaimerVisible: false
            }
        },

        computed: {
            //Get loading status from store
            isLoading () {
                return this.$store.getters['githubApi/getLoadingStatus'];
            },

            //Check if backup is older than 1 hour
            disclaimerTimeout() {
                const timeout = Math.abs(Date.now() - this.$store.getters['githubApi/getBackupTime']) / 36e5;
                return (timeout >= 1) && this.disclaimerVisible;
            },

            //Format last backup time
            timestamp() {
                const date = this.$store.getters['githubApi/getBackupTime'];
                return date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds() +' '
                    + (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getFullYear() + ' UTC';
            },

            contributors() {
                return this.$store.getters['githubApi/getUsers']
            }
        },

        methods: {
            //Start loadinc actual user details from Github and hide the disclaimer
            getActualData() {
                this.$store.dispatch('githubApi/loadActualData');
                this.disclaimerVisible = false;
            },
        },

        watch: {
            //Watching when loading status will return back to false after downloading user details and show message after
            isLoading(val) {
                if(!val) {
                    this.$refs.snackbar.open();
                }
            },

            //Because I didn't find a proper way to track finish point of looped recursive AJAX calls I created this hack
            //It sets the disclamer visibility flag to true only after 10 seconds since we have first contributor
            contributors(val) {
                if (val.length > 0) {
                    setTimeout(() => {
                        this.disclaimerVisible = true;
                    }, 10000);
                }
            }
        },

        created() {
            //Start loading repositories data on application create
            const payload = {page: 1};
            this.$store.dispatch('githubApi/loadRepositories', payload);
        }
    }
</script>

<style lang="scss">
    body {
        &.global {
            min-height: 100%;
            background-color: #eeeeee;
        }
    }

    ul, li {
        padding: 0;
        list-style: none;
    }

    h2, h3 {
        margin: 0;
    }

    .header {
        height: 300px;
        width: 100%;
        background: url('assets/images/7375.jpg');
        background-size: cover;
        text-align: center;
    }

    .container {
        max-width: 1100px;
        margin-top: -200px;
        margin-bottom: 30px;
        background-color: #fff;
        .disclaimer {
            margin-bottom: 20px;
            padding: 20px;

            .disclaimer-text {
                margin: 0;
            }
            .disclaimer-button {
                max-height: 36px;
            }
        }

        .progress {
            height: 4px;
            margin-top: 1px;
        }
        .notification {
            padding: 20px;
        }
        .view {
            margin-top: 30px;
        }
    }

    .home-icon {
        padding-left: 16px;
        cursor: pointer;
    }

    .md-table {
        width: 100%;
        .md-table-head, .md-table-cell {
            font-size: 14px;
        }

        .table-link {
            color: #3f51b5;;
            font-weight: 600;
            &:hover {
                cursor: pointer;
                color: #008b8b;
            }
        }
    }

    .VuePagination__count {
        color: #666;
        text-align: center;
    }

    .pagination {
        display: flex;
        align-items: center;
        height: 28px;

        .page-item {
            width: 28px;
            margin: 2px;
            border: 1px solid transparent;
            -webkit-border-radius: 28px;
            -moz-border-radius: 28px;
            border-radius: 28px;
            font-size: 15px;
            font-weight: 600;
            background-color: #b0c4de;
            line-height: 26px;
            text-align: center;
            cursor: pointer;

            &:hover {
                background-color: #6495ed;
                -webkit-box-shadow: 0 0 5px 0 rgba(50, 50, 50, 0.75);
                -moz-box-shadow:    0 0 5px 0 rgba(50, 50, 50, 0.75);
                box-shadow:         0 0 5px 0 rgba(50, 50, 50, 0.75);
            }

            &.disabled {
                background-color: #d3d3d3;
                color: #666;
                cursor: default;
                &:hover {
                    -webkit-box-shadow: none;
                    -moz-box-shadow:    none;
                    box-shadow:         none;
                }

                a {
                    cursor: default;
                }
            }

            &.active {
                background-color: #3f51b5;
                color: #fff;
                cursor: default;
                -webkit-box-shadow: 0 0 5px 0 rgba(50, 50, 50, 0.75);
                -moz-box-shadow:    0 0 5px 0 rgba(50, 50, 50, 0.75);
                box-shadow:         0 0 5px 0 rgba(50, 50, 50, 0.75);
            }

            .page-link, .page-link:hover, .page-link:focus, .page-link:active {
                display: block;
                text-decoration: none;
                color: inherit
            }
        }
    }

    .slide-leave-active {
        animation: slide-out .3s ease-out forwards;
    }


    .slide-enter-active {
        animation: slide-in .3s ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(30px);
            opacity: 0;
        }
    }

    @media (max-width: 660px) {
        .md-table {
            .md-table-head, .md-table-cell {
                font-size: 14px;
            }
        }

        .pagination {
            .page-item {
                width: 18px;
                -webkit-border-radius: 18px;
                -moz-border-radius: 18px;
                border-radius: 18px;
                font-size: 12px;
                font-weight: 600;
                line-height: 18px;
            }
        }
    }

</style>
