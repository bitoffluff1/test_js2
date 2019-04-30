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
    .drop-link
        color: #646464
        font-size: 14px
        letter-spacing: 0.35px
        text-decoration: none
        line-height: 28px

    .drop-link:hover
        color: #f16d7f
</style>