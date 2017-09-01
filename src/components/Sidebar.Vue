<template>
    <div class="column-left">
    	<div class="subscribe-toolbar">
    		<form class="new-form-wrap" data-behavior="search_form" action="index.php/api/feed/newrssfeed" accept-charset="UTF-8" data-remote="true" method="post" role="url"><input name="utf8" type="hidden" value="✓">
    			<input type="text" name="url" id="query" placeholder="Subscribe" autocomplete="off">
    		</form>
    	</div>
    	<div class="feeds-inner">
    		<div class="view-toolbar">
    			<a id="unread" class="view-button" title="View unread" data-behavior="view_unread change_view_mode" data-view-mode="view_unread" data-remote="true" style="color: rgb(51, 51, 51);">Unread</a>
    			<a id="star" class="view-button" title="View starred" data-behavior="view_starred change_view_mode" data-view-mode="view_starred" data-remote="true">Starred</a>
    			<a id="read" class="view-button selected" title="View all" data-behavior="view_all change_view_mode" data-view-mode="view_all" data-remote="true">Read</a>
    		</div>
    		<div class="feeds-droppable">
    			<div class="panel ui-sortable">
    				<ul id="all" class="connected ui-sortable">

    				</ul>
    			</div>
    		</div>
    	</div>
    </div>
</template>

<style>
.column-left {
    position: fixed;
    top: 10px;
    left: 10px;
    bottom: 10px;
    width: 180px;
    overflow-y: auto;
    background-color: #eee;
}
</style>
