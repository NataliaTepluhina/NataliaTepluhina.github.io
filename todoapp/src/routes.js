import Home from './components/Home.vue'
import User from './components/UserDetails.vue'
import Repo from './components/RepositoryDetails.vue'

export const routes = [
    { path: '*', redirect: '/' },
    { path: '/', component: Home},
    { path: '/user/:login', component: User, props: true },
    { path: '/repo/:name', component: Repo, props: true }
];