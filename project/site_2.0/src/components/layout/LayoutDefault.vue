<template>
    <div class="all">
        <div class="content">
            <app-header></app-header>
            <main>
                <slot></slot>
            </main>
        </div>

        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from "../app/AppHeader.vue";
    import AppFooter from "../app/AppFooter.vue";

    export default {
        name: "LayoutDefault",
        components: {
            AppHeader,
            AppFooter,
        }
    }
</script>

<style lang="sass" scoped>
    .all
        min-height: 100%
        display: flex
        flex-direction: column
        min-width: 1150px
        margin: 0 auto

    .content
        flex-grow: 1
</style>