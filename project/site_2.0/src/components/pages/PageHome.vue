<template>
    <div>
        <h2>Home Page</h2>
        <ul>
            <li v-for="item in items" :key="item.id">
                <router-link :to="{name: 'user-single', params: {id: item.id}}">{{item.name}}</router-link>
            </li>
        </ul>
        <app-the-brand></app-the-brand>
        <app-categories></app-categories>
        <section class="featured-items">
            <h3 class="heading">Featured Items</h3>
            <p class="text-featured-items_bottom">Shop for items based on&nbsp;what we&nbsp;featured in&nbsp;this week</p>
            <app-products :query="filterValue" @onbuy="handleBuyClick"></app-products>
            <div class="button-items flex">
                <a href="#" class="button">Browse All Product
                    <i class="fas fa-long-arrow-alt-right"></i></a>
            </div>
        </section>
        <app-banner></app-banner>
    </div>
</template>

<script>
    import AppTheBrand from "../app/index/AppTheBrand.vue";
    import AppCategories from "../app/index/AppCategories.vue";
    import AppProducts from "../app/AppProducts.vue";
    import AppBanner from "../app/index/AppBanner.vue";

    export default {
        name: "PageHome",
        components: {
            AppTheBrand,
            AppCategories,
            AppProducts,
            AppBanner,

        },
        data() {
            return {
                items: [],
            }
        },
        mounted() {
            fetch("http://localhost:3000/items/all")
                .then((request) => request.json())
                .then((items) => {
                    this.items = items;
                })
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/main"
    .heading
        font-size: 30px
        font-weight: 700
        letter-spacing: 0.75px
        text-align: center
        margin-top: 92px
        margin-bottom: 5px

    .text-featured-items_bottom
        color: #9f9f9f
        text-align: center

    .button-items
        justify-content: center

    .button
        +size-button(38px, 17px, 15px)
        display: block
        text-decoration: none
        color: #ffffff
        letter-spacing: 0.28px
        background-color: $pink
        &:hover
            box-shadow: 0 5px 8px #646464


</style>