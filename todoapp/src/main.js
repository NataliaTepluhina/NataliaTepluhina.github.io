import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import App from './App.vue'
import { routes } from './routes'
import { store } from './store/store'

Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(VueLodash, lodash);


//Register new theme for Material design
Vue.material.registerTheme('about', {
    primary: 'indigo',
    accent: {
        color:'teal',
        hue: 200
    }
});

Vue.material.setCurrentTheme('about');

//Set application routes
const router = new VueRouter({
    routes,
    base: '/'
});

//Create application instance
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
