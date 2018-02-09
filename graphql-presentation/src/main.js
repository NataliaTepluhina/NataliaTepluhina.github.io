import Vue from 'vue'
import App from './components/App.vue'
import VueRouter from 'vue-router'
import {routes} from "./routes";

Vue.use(VueRouter);

//Set application routes
const router = new VueRouter({
  routes,
  base: '/'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
