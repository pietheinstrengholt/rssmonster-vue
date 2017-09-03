<template>
<div id="main">
	<div v-bind:id="article.id" class="block" v-for="(article, key) in articles">
		<div class="article">
			<div class="maximal">
				<div v-bind:class="{'bookmarked': article.star_ind == 1}" v-on:click="bookmark(article.id, $event)" @click="$event.target.classList.toggle('bookmarked')" class="bookmark"></div>
				<h4 class="heading">
					<a target="_blank" :href="article.url" v-text="article.subject"></a>
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

			<div class="article-content" v-html="article.content">
			</div>
		</div>
	</div>
	<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
		<span slot="no-more">
			No More Posts - All items marked as read!
		</span>
	</infinite-loading>
</div>
</template>

<style>
div.block {
	margin-bottom: 0px;
	padding-top: 5px;
}

div.block .article {
	padding-left: 5px;
	padding-right: 5px;
	border-color: #B4B7BD;
	border-width: 1px;
}

div.block .article {
	border-bottom: 1px solid #B4B7BD;
}

div.block .article h4 {
	cursor: pointer;
	margin-top: 5px;
}

div.block .article h4 a {
	font-weight: 600;
}

div.block div.article-content {
	margin-bottom: 10px;
}

div.block .article h4 a {
	color: #333333;
}

div.block div.feedname {
	color: #696969;
}

div.block div.article-content {
	color: #333344;
}

div.block .article h5 a {
	color: #333333;
	font-weight: 400;
}

div.block div.article hr {
	margin-top: 3px;
	margin-left: 5px;
	width: 98%;
}

div.block div.feedname {
	margin-top: -11px ! important;
	font-size: 12px;
	padding-top: 4px;
	padding-left: 0px;
	font-weight: bold;
}

div.block div.article-block hr {
	margin-top: 3px;
	margin-left: 5px;
	width: 180px;
}

div.block div.article hr {
	border-top: 1px solid #D3D3D3;
}

div.block .active {
	background-color: #ffffe5;
}

div.block div.article-content {
	margin-top: 1px;
	margin-left: 0px;
}

div.block div.bookmark,
div.block div.bookmarked {
	height: 29px;
	background-repeat: no-repeat;
	float: left;
	width: 32px;
	margin-top: -10px;
	background-position: 6px 4px;
	margin-left: -6px;
	cursor: pointer;
	background-position: center top 5px;
	background-size: 18px 18px;
	background-position: 8px 10px;
}

div.block div.bookmark {
	background-image: url('http://localhost/rssmonster/public/img/heart_unselected.png');
}

div.block div.bookmarked {
	background-image: url('http://localhost/rssmonster/public/img/heart_selected.png');
}

div.block div.article-content img {
	max-width: 100%;
	height: auto;
}
</style>

<script>
import InfiniteLoading from 'vue-infinite-loading';
require('waypoints/lib/noframework.waypoints.js');

export default {
	data() {
		return {
			distance: 0,
			isActive: false,
			articles: [],
			container: [],
			pool: [],
			waypointPool: []
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
							//add waypoint to every article
							setTimeout(() => {
								for (var key in this.articles) {
									var article = this.articles[key];
									//make sure only one waypoint per article is set, check the waypointPool for this
									if (!this.waypointPool.includes(article.id)) {
										this.waypointCreate(article.id);
										this.waypointPool.push(article.id);
									}
								}
							}, 50);
						} else {
							this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
						}
					});
				}
			}, 200);
		},
		waypointCreate: function(article) {
			var waypoint = new Waypoint({
				element: document.getElementById(article),
				offset: -150,
				handler: function(direction) {
					if (direction == "down") {
						console.log('mark as read: ' + this.element.id);
						//destroy after the article has been marked as read
						this.destroy();
					}
				}
			});
		},
		bookmark: function (article, event) {
			//determine if classname already contains bookmarked, if so, the change is unmark
			//TODO: increase decrease bookmark count
			if( event.currentTarget.className.indexOf('bookmarked') >= 0){
				var bookmarkChange = 'unmark';
			} else {
				var bookmarkChange = 'mark';
			}

			//make ajax request to change bookmark status
			this.$http.post('http://localhost/rssmonster/public/api/article/mark-with-star/' + article, {update: bookmarkChange}).then(response => {
				// get status
				console.log(response.status);

				// get status text
				console.log(response.statusText);

			}, response => {
				console.log('oops something went wrong');
			});
		}
	}
}
</script>
