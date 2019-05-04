<template>
    <div>
        <mini-cart-item @ondelete="handleDeleteClick" v-for="entry in cart" :item="entry" :key="entry.id" ></mini-cart-item>
    </div>
</template>

<script>
    import MiniCartItem from "./MiniCartItem.vue";

    export default {
        name: "MiniCartProducts",
        components:{
          MiniCartItem,
        },
        props: ["cart"],
        methods: {
            handleDeleteClick(item) {
                this.$emit("ondelete", item)
            },
        },
    }
</script>

<style scoped>

</style>