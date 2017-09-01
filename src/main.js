import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.use(VueResource);

Vue.http.options.root = 'http://localhost/rssmonster/public/index.php/api/';

new Vue({
  el: '#app',
  render: h => h(App)
})
