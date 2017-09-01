<template>
	<div class="feeds-inner">
		<div class="view-toolbar">
			<a id="unread" class="view-button" title="View unread" data-behavior="view_unread change_view_mode" data-view-mode="view_unread" data-remote="true" style="color: rgb(51, 51, 51);">Unread</a>
			<a id="star" class="view-button" title="View starred" data-behavior="view_starred change_view_mode" data-view-mode="view_starred" data-remote="true">Starred</a>
			<a id="read" class="view-button selected" title="View all" data-behavior="view_all change_view_mode" data-view-mode="view_all" data-remote="true">Read</a>
		</div>
		<div class="drag">
			<draggable v-model="categories" class="dragArea" :options="{group:{ name:'category',	pull:'clone', put:false }}">
				<div v-on:click="loadCategory" v-bind:id="category.id" v-for="(category, index) in categories" :key="index">{{category.name}}</div>
			</draggable>
			<pre>{{orderList}}</pre>
		</div>
	</div>
</template>

<style>
.view-toolbar {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	height: 41px;
	border-bottom: 1px solid transparent;
	border-color: #dcdee0;
	position: absolute;
	left: 8px;
	right: 8px;
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
	margin-top:41px;
	position: absolute;
	width:100%;
}

.dragArea {
	min-height: 20px;
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
