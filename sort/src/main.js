import Vue from 'vue'
import VueResource from 'vue-resource'
import VuePagination from 'vue-pagination-2';
import lodash from 'lodash'
import VueLodash from 'vue-lodash/dist/vue-lodash.min'
import App from './App.vue'

Vue.use(VueResource);
Vue.use(VuePagination);
Vue.use(VueLodash, lodash);

Vue.http.options.root = 'https://orders-database.firebaseio.com/';

new Vue({
  el: '#app',
  render: h => h(App)
});
