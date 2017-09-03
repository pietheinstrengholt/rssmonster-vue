<template>
	<div class="feeds-inner">
		<div class="view-toolbar">
			<a id="unread" class="view-button" title="View unread" data-behavior="view_unread change_view_mode" data-view-mode="view_unread" data-remote="true" style="color: rgb(51, 51, 51);">Unread</a>
			<a id="star" class="view-button" title="View starred" data-behavior="view_starred change_view_mode" data-view-mode="view_starred" data-remote="true">Starred</a>
			<a id="read" class="view-button selected" title="View all" data-behavior="view_all change_view_mode" data-view-mode="view_all" data-remote="true">Read</a>
		</div>
		<div class="drag">
			<draggable v-model="categories" class="dragArea" :options="{group:{ name:'category', pull:'clone', put:false }}">
				<div class="sidebar-category-main" v-on:click="loadCategory" v-bind:id="category.id" v-for="(category, index) in categories" :key="index">
					<div class="sidebar-category-sub">
						<div class="glyphicon">
							<span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
						</div>
						<div class="title">{{category.name}}</div>
						<div class="badge-unread">
							<span class="badge">{{category.unread_count}}</span>
						</div>
					</div>
					<div v-if="category.feeds" class="sidebar-category-feeds">
						<div class="sidebar-category-feed" v-on:click="loadFeed" v-bind:id="feed.id" v-for="(feed, index) in category.feeds" :key="index">
							<div class="glyphicon">
								<span class="glyphicon glyphicon-certificate" aria-hidden="true"></span>
							</div>
							<div class="title">{{feed.feed_name}}</div>
							<div class="badge-unread">
								<span class="badge">{{feed.unread_count}}</span>
							</div>
						</div>
					</div>
				</div>
			</draggable>
		</div>
		<div style="margin-top:400px; position: absolute;">
			<pre>{{orderList}}</pre>
		</div>

	</div>
</template>

<style>
.view-toolbar {
	width: 100%;
	background-color: #eff1f3;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	height: 41px;
	border-bottom: 1px solid transparent;
	border-color: #dcdee0;
	position: absolute;
}

.view-button {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	-ms-flex: 1;
	flex: 1;
	text-align: center;
	line-height: 41px;
	height: 100%;
	text-decoration: none;
	display: block;
	font-size: 10px;
	text-transform: uppercase;
	font-weight: bold;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	border-left: 1px solid transparent;
	border-color: #dcdee0;
	color: #b4b6b8;
}

.feeds-droppable {
	background-color: #eff1f3;
	position: absolute;
	top: 41px;
	bottom: 0;
	left: 0;
	right: 0;
	overflow-y: auto;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
}

.normal {
	background-color: grey;
}

.drag {
	background-color: #eff1f3;
	margin-top:41px;
	position: absolute;
	width:100%;
}

.dragArea {
	min-height: 20px;
}

div.sidebar-category-sub, div.sidebar-category-feed {
	padding: 4px;
}

span.badge {
	float: right;
	color: #7a7c7e;
	font-weight: 100;
	background-color: transparent !important;
}

sidebar-category-main {
	width: 100%;
}

div.badge-unread {
	float:right;
}

div.title {
	text-overflow: ellipsis;
	overflow:hidden;
	white-space:nowrap;
	display: inline-block;
}

div.glyphicon {
	float:left;
	margin-right:3px;
}

</style>

<script>
import draggable from 'vuedraggable';

export default {
	data() {
		return {
			categories: []
		}
	},
	components: {
		draggable
	},
	created: function () {
		this.fetchCategories();
	},
	methods: {
		fetchCategories: function() {
			this.$http.get('http://localhost/rssmonster/public/api/category')
			.then(response => {
				return response.json();
			})
			.then(data => {
				this.categories = data;
			});
		},
		loadCategory: function (event) {
			console.log(event);
			console.log(this);
		}
	},
	computed: {
		orderList() {
			var orderList = new Array();
			this.categories.forEach(function(category) {
				orderList.push(category.id);
			});
			return orderList;
		}
	}
}
</script>
