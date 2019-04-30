<template>
    <div>
        <app-header-logo></app-header-logo>
    </div>
</template>

<script>
    import AppHeaderLogo from "./header/AppHeaderLogo.vue";

    export default {
        name: "AppHeader",
        components: {
            AppHeaderLogo,
        }
    }
</script>

<style lang="sass" scoped>

</style>