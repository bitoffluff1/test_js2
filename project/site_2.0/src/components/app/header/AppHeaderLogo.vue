<template>
    <header class="header">
        <div class="container header-flex flex">
            <div class="flex">
                <a class="logo flex" href="index.html">
                    <img class="img-logo" src="img/logo.png" alt="logo">BRAN
                    <span class="pink-D">D</span>
                </a>
                <form class="header-form flex" action="">
                    <details class="browse-details">
                        <summary class="browse">Browse</summary>
                        <div class="browse-drop-box">
                            <browse-menu></browse-menu>
                        </div>
                    </details>
                    <search @search="handleSearchClick"></search>
                </form>
            </div>
            <div class="header-right flex">
                <div class="cart-box">
                    <a href="#"><img src="img/cart.svg" class="img-cart" alt="cart"></a>
                    <div class="cart-items">{{totalAmount}}</div>
                    <cart-drop-box></cart-drop-box>
                </div>

                <a href="#" class="button" @click.prevent="handleShowModalClick" else>My&nbsp;Account</a>
                <registered-drop-box v-if="userId > 0"></registered-drop-box>
                <modal-for-registration @close="handleShowModalClick" v-if="modal.length"></modal-for-registration>
            </div>
        </div>
    </header>
</template>

<script>
    import BrowseMenu from "./headerLogo/BrowseMenu.vue";
    import Search from "./headerLogo/Search.vue";
    import CartDropBox from "./headerLogo/CartDropBox.vue";
    import RegisteredDropBox from "./headerLogo/RegisteredDropBox.vue";
    import ModalForRegistration from "./headerLogo/ModalForRegistration.vue";

    export default {
        name: "AppHeaderLogo",
        components: {
            BrowseMenu,
            Search,
            CartDropBox,
            RegisteredDropBox,
            ModalForRegistration
        },
        data() {
            return {
                modal: "",
            }
        },
        methods: {
            handleShowModalClick() {
                this.modal = this.modal.length ? "" : "active";
            },
        },
    }
</script>

<style lang="sass" scoped>
    @import "../../../assets/main"
    .header
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.17)
        border: 1px solid #ececec

    .header-flex
        justify-content: space-between
        height: 100px
        align-items: center

    .header-form
        align-items: center

    .header-right
        align-items: center

    .logo
        font-size: 27px
        font-weight: 300
        text-transform: uppercase
        text-decoration: none
        align-items: center
        margin-right: 37px

    .img-logo
        margin-right: 13px

    .pink-D
        color: $pink
        font-weight: 500
        letter-spacing: 1px

    summary
        outline: none
        display: block

    summary::-webkit-details-marker
        display: none

    details[open] > .category:after
        content: '\25B2'
        color: $pink

    details[open] > .category
        color: $pink

    .browse:after
        content: '\25B6'
        padding-left: 1em
        font-size: 12px

    .category:after
        content: '\25BC'
        padding-left: 137px
        font-size: 12px

    .browse-details[open] > .browse:after
        content: '\25BC'

    .browse
        border-radius: 3px 0 0 3px
        border: 1px solid #e6e6e6
        background-color: #cdcdcc
        background-image: linear-gradient(to bottom, #f9f9f9 0%, #f5f5f5 100%)
        font-weight: 300
        letter-spacing: 0.35px
        padding-left: 20px
        height: 38px
        width: 87px
        line-height: 38px
        position: relative

    .browse-drop-box
        position: absolute
        border-radius: 5px
        padding: 20px
        top: 70px
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.17)
        z-index: 1
        background-color: #ffffff

        &:before
            content: ""
            display: block
            width: 10px
            height: 10px
            position: absolute
            top: -6px
            left: 75px
            transform: rotate(45deg)
            border-top: 1px solid #ececec
            border-left: 1px solid #ececec

    .cart-box
        position: relative

    .cart-box:hover .cart-drop-box
        display: block

    .img-cart
        position: relative
        margin-top: 10px

    .cart-items
        background-color: $pink
        color: white
        padding: 2px 9px
        border-radius: 10px
        display: flex
        justify-content: center
        position: absolute
        top: 0
        right: -13px

    .button
        +size-button(38px, 17px, 15px)
        display: block
        text-decoration: none
        color: #ffffff
        letter-spacing: 0.28px
        background-color: $pink
        margin-left: 25px

        &:hover
            box-shadow: 0 5px 8px #646464
</style>