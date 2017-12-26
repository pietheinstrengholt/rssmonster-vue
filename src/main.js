import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.use(VueResource);

Vue.http.options.root = 'http://localhost/rssmonster/public/index.php/api/';

import VueStash from 'vue-stash'
Vue.use(VueStash)

new Vue({
	el: '#app',
	data: {
		store: {
			data: {
				category: 0,
				feed: 0
			}
		}
	},
	render: h => h(App)
});
