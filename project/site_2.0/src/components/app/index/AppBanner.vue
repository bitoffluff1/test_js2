<template>
    <div class="banner container flex">
        <div class="banner_left flex">
            <a href="#" class="banner-text">
                <p class="banner-text_top">30% <span class="pink">OFFER</span></p>
                <p class="banner-text_bottom">FOR WOMEN</p>
            </a>
        </div>
        <div class="banner_right flex">
            <article class="advantages flex">
                <img src="img/car.svg" alt="car">
                <div class="advantages-text">
                    <h4 class="advantages-text_top">Free Delivery</h4>
                    <p class="advantages-text_bottom">Worldwide delivery on&nbsp;all. Authorittively morph
                        next-generation innovtion with extensive models.</p>
                </div>
            </article>
            <article class="advantages flex">
                <img src="img/sale.svg" alt="sale">
                <div class="advantages-text">
                    <h4 class="advantages-text_top">Sales &amp;&nbsp;discounts</h4>
                    <p class="advantages-text_bottom">Worldwide delivery on all. Authorittively morph
                        next-generation innovtion with extensive models.</p>
                </div>
            </article>
            <article class="advantages flex">
                <img src="img/crown.svg" alt="crown">
                <div class="advantages-text">
                    <h4 class="advantages-text_top">Quality assurance</h4>
                    <p class="advantages-text_bottom">Worldwide delivery on&nbsp;all. Authorittively morph
                        next-generation innovtion with extensive models.</p>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppBanner"
    }
</script>

<style lang="sass" scoped>
    @import "../../../assets/main"
    .banner
        height: 529px
        margin-top: 118px!important
        background-color: #222224
        margin-bottom: 97px!important

        &_left
            background-image: url(../img/Banner.jpg)
            background-repeat: no-repeat
        &_right
            margin: 48px 0
            flex-direction: column
            justify-content: space-around
            width: 310px

    .banner-text
        text-decoration: none
        width: 767px
        padding-left: 37px
        padding-top: 132px
        text-transform: uppercase
        color: #ffffff
        font-weight: 700

        &_top
            font-size: 54px
            letter-spacing: 1.5px

        &_bottom
            font-size: 32px
            letter-spacing: 0.9px
            margin-top: -6px

    .advantages
        align-items: flex-start
        justify-content: space-between
        &-text
            width: 257px
            color: #fbfbfb
            margin-left: 33px
            &_top
                font-size: 20px
                font-weight: 700
                letter-spacing: 0.5px
                margin-bottom: 17px
            &_bottom
                font-weight: 300
                line-height: 22px



</style>