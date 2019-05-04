<template>
    <figure class="cart-product">
        <a :href="url" class="img-cart-product">
            <img :src="item.image" alt="product" class="image-mini-cart"></a>
        <figcaption class="text-cart-drop">
            <a :href="url" class="text-cart-drop-box">{{item.name}}</a>
            <div class="block-star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
            </div>
            <p class="price-cart">{{item.quantity}} x ${{item.price}}</p>
        </figcaption>
        <i class="fas fa-times-circle fa-times-circle__cart" @click="handleDeleteClick(item)"></i>
    </figure>
</template>

<script>
    export default {
        name: "MiniCartItem",
        props: ["item"],
        data() {
            return {
                url: "single-page.html?id=" + this.item.id
            }
        },
        methods: {
            handleDeleteClick(item) {
                this.$emit("ondelete", item);
            },
        },
    }
</script>

<style  lang="sass" scoped>
    @import "../../../../assets/main"
    .cart-product
        border-bottom: 1px solid #e8e8e8
        display: flex
        padding-top: 16px

    .img-cart-product
        padding-bottom: 16px

    .cart-product:first-of-type
        padding-top: 0

    .image-mini-cart
        width: 78px
        height: 81px

    .text-cart-drop
        margin-right: 55px
        margin-left: 15px
        font-size: 12px
        text-transform: uppercase

    .text-cart-drop-box
        color: #222222
        font-weight: 700
        text-decoration: none

    .block-star
        color: #e4af48
        margin-bottom: 12px
        margin-top: 10px

    .price-cart
        color: $pink

    .fa-times-circle__cart
        margin-top: 30px

</style>