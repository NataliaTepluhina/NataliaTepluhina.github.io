import Vue from 'vue'
import VueResource from 'vue-resource'
import VuePagination from 'vue-pagination-2';
import App from './App.vue'

Vue.use(VueResource);
Vue.use(VuePagination);

Vue.http.options.root = 'http://keenthemes.com/metronic/preview/inc/api/datatables/demos/';

new Vue({
  el: '#app',
  render: h => h(App)
});
