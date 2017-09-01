<template>
<div class="container">
	<div id="main">
		<div @click="$event.target.classList.toggle('active')" id="block" class="normal" v-for="(article, key) in articles">
			<div v-bind:id="article.id" class="article">
				<div class="maximal">
					<div v-bind:id="article.id" @click="$event.target.classList.toggle('star')" class="item-star unstar"></div>
					<h4 class="heading">
                        <a v-bind:id="article.id" target="_blank" :href="article.url" v-text="article.subject"></a>
                    </h4>
					<div class="feedname">
						<span class="favicon">
                      <img class="favicon" src="#">
                     </span>
						<span class="feed_name" v-text="article.feed_name"></span>
						<span class="break"> | </span>
						<span class="published_date" v-text="article.published"></span>
					</div>
				</div>

				<div v-bind:id="article.id" class="article-content" v-html="article.content"></div>
			</div>
		</div>
		<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
			<span slot="no-more">
              Oops.. Something wen't wrong.. Unable to load feeds. :(
            </span>
		</infinite-loading>
	</div>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
	data() {
		return {
			distance: 0,
			isActive: false,
			articles: [],
			container: [],
			pool: []
		}
	},
	components: {
		InfiniteLoading,
	},
	beforeCreate: function() {
		this.$http.get('http://localhost/rssmonster/public/api/article/listing?status=unread')
			.then(response => {
				return response.json();
			})
			.then(data => {
				this.container = data;
			});
	},
	methods: {
		onInfinite: function() {
			setTimeout(() => {
				if ((this.container.slice(this.distance, this.distance + 20)).length == 0) {
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
				} else {
					this.$http.get('http://localhost/rssmonster/public/api/article/details', {
						params: {
							//this is the argument used
							article_id: this.container.slice(this.distance, this.distance + 20).join(","),
						},
					}).then((res) => {
						if (res.data.length) {
							this.distance = this.distance + res.data.length;
							this.articles = this.articles.concat(res.data);
							this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
						} else {
							this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
						}
					});
				}
			}, 200);
		},
		highlight: function() {
			this.isActive = !this.isActive;
		}
	},
}
</script>
