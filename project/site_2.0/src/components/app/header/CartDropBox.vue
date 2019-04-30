<template>
    <div class="cart-drop-box">
        <mini-cart-products :cart="cart" @ondelete="handleDeleteClick"></mini-cart-products>
        <div class="total">
            <p class="price-total">TOTAL</p>
            <p class="price-total">${{total}}</p>
        </div>
        <div class="button-cart">
            <a href="checkout.html" class="button-cart-text">Checkout</a></div>
        <div class="button-cart">
            <a href="shopping-cart.html" class="button-cart-text">Go&nbsp;to cart</a></div>
    </div>
</template>

<script>
    import MiniCartProducts from "./MiniCartProducts.vue";

    export default {
        name: "CartDropBox",

        components:{
            MiniCartProducts,
        }
    }
</script>

<style lang="sass" scoped>
    .cart-drop-box
        border-radius: 5px
        background-color: #ffffff
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.17)
        padding: 17px
        position: absolute
        display: none
        top: 40px
        left: -17px
        z-index: 10


    .cart-drop-box:before
        content: ""
        display: block
        width: 9px
        height: 9px
        position: absolute
        top: -6px
        left: 31px
        transform: rotate(45deg)
        background-color: #ffffff
        border-top: 1px solid #ececec
        border-left: 1px solid #ececec

    .total
        display: flex
        justify-content: space-between

    .price-total
        color: #222222
        font-size: 16px
        font-weight: 700
        text-transform: uppercase
        margin-top: 19px
        margin-bottom: 32px

    .button-cart-text
        color: #4a4a4a
        font-size: 14px
        font-weight: 700
        text-transform: uppercase
        width: 225px
        padding-left: 19px
        padding-right: 19px
        display: block
        height: 50px
        line-height: 50px
        text-decoration: none
        border: 1px solid #eaeaea
        background-color: #ffffff
        text-align: center
        margin-bottom: 11px


    .button-cart-text:hover
        border-radius: 5px
        border: 1px solid #f16d7f
        background-color: #ffffff
        color: #f16d7f
        font-size: 14px
        font-weight: 700
        text-transform: uppercase
</style>