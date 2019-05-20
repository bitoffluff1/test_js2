<template>
    <li><a class="drop-link" href="#">{{link}}</a></li>
</template>

<script>
    export default {
        name: "MenuLink",
        props: ["link"]
    }
</script>

<style lang="sass" scoped>
    @import "../../../assets/main"
    .drop-link
        color: #646464
        letter-spacing: 0.35px
        text-decoration: none
        line-height: 28px
        &:hover
            color: $pink
</style>