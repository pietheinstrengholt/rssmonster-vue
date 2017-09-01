<template>
    <div id="app">
        <div class="row">
            <div class="sidebar col-md-2" style="position:fixed">
                <app-sidebar></app-sidebar>
            </div>
            <div class="col-md-10 col-md-offset-2">
                <app-home></app-home>
            </div>
        </div>

    </div>
</template>

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

<style>
#app {
    overflow-x:hidden;
}
</style>
