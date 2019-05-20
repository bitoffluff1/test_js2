<template>
    <nav class="navigation">
        <div class="container">
            <ul class="menu flex">
                <li class="menu-list">
                    <a class="menu-link" href="index.html">Home</a>
                </li>
                <li class="menu-list">
                    <a class="menu-link" href="product.html?category=men">Man</a>
                    <nav-menu></nav-menu>
                </li>
                <li class="menu-list">
                    <a class="menu-link" href="product.html?category=women">Women</a>
                    <nav-menu></nav-menu>
                </li>
                <li class="menu-list">
                    <a class="menu-link" href="product.html?category=men">Kids</a>
                    <nav-menu></nav-menu>
                </li>
                <li class="menu-list">
                    <a class="menu-link" href="product.html?category=women">Accessories</a>
                    <nav-menu class="drop-box-last"></nav-menu>
                </li>
                <li class="menu-list">
                    <a class="menu-link" href="product.html?category=featured">Featured</a>
                    <nav-menu class="drop-box-last"></nav-menu>
                </li>
                <li class="menu-list">
                    <a class="menu-link" href="product.html?category=featured">Hot Deals</a>
                    <nav-menu class="drop-box-last"></nav-menu>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import NavMenu from "./headerNav/NavMenu.vue";

    export default {
        name: "AppHeaderNav",
        components: {
            NavMenu
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../../assets/main"
    .menu
        list-style-type: none
        justify-content: center


    .menu-list
        position: relative
        &:hover .drop-box
            display: flex

    .menu-link
        font-weight: 700
        text-transform: uppercase
        text-decoration: none
        padding: 13px 23px 20px
        display: block
        color: #222222
        &:hover
            color: $pink

    .drop-box-last
        left: -300px
        &:before
            left: 331px

</style>