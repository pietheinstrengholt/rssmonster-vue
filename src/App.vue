<template>
    <div id="app">
        <div class="container">
            <app-sidebar></app-sidebar>
            <app-home></app-home>
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
