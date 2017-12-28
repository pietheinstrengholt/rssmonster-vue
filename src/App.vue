<template>
    <div id="app">
        <div class="row" style="margin-right:0px;">
            <div class="sidebar col-md-2" style="position:fixed">
                <app-sidebar></app-sidebar>
            </div>
            <div class="col-md-10 col-md-offset-2">
                <app-home></app-home>
            </div>
        </div>
    </div>
</template>

<style>
/* Landscape phones and portrait tablets */
@media (max-width: 767px) {
	div.sidebar {
        display:none;
    }
	div.article {
        display: inline-block;
        position: relative;
        border-bottom: 0px solid #FFF !important;
    }
    div.article:after {
        position: absolute;
        content: '';
        border-bottom: 1px solid #a0a3a8;
        width: 90%;
        transform: translateX(-50%);
        left: 50%;
    }
    div.col-md-10 {
        padding-right: 0px;
    }
}
</style>

<script>
    import Sidebar from './components/Sidebar.vue';
    import Home from './components/Home.vue';
    export default {
        components: {
            appSidebar: Sidebar,
            appHome: Home
        }
    }
</script>
