<template>
    <div>
        <app-header-logo></app-header-logo>
        <app-header-nav></app-header-nav>
    </div>
</template>

<script>
    import AppHeaderLogo from "./header/AppHeaderLogo.vue";
    import AppHeaderNav from "./header/AppHeaderNav.vue";

    export default {
        name: "AppHeader",
        components: {
            AppHeaderLogo,
            AppHeaderNav
        }
    }
</script>

<style lang="sass" scoped>

</style>