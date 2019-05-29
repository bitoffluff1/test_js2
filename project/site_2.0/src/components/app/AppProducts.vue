<template>
    <div class="featured-items-box container flex">
        <product-item @onbuy="handleBuyClick" v-for="entry in filteredItems" :item="entry" :key="entry.id"></product-item>
    </div>
</template>

<script>
    export default {
        name: "AppProducts"
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/main"
    .featured-items-box
        flex-wrap: wrap
        margin-top: 60px
        justify-content: space-between
</style>