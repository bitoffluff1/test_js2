<template>
    <div class="special-offers">
        <div class="container special-offers-back flex">
            <article class="advantage">
                <img class="advantage-img" src="img/car.svg" alt="car">
                <div class="advantage-box">
                    <h4 class="advantage-heading">Free Delivery</h4>
                    <p class="advantage-text">Worldwide delivery on&nbsp;all. Authorit tively morph
                        next-generation
                        innov tion
                        with extensive models.</p>
                </div>
            </article>
            <article class="advantage">
                <img class="advantage-img" src="img/sale.svg" alt="sale">
                <div class="advantage-box">
                    <h4 class="advantage-heading">Sales &amp;&nbsp;discounts</h4>
                    <p class="advantage-text">Worldwide delivery on&nbsp;all. Authorit tively morph
                        next-generation
                        innov tion
                        with extensive models.</p>
                </div>
            </article>
            <article class="advantage">
                <img class="advantage-img" src="img/crown.svg" alt="crown">
                <div class="advantage-box">
                    <h4 class="advantage-heading">Quality assurance</h4>
                    <p class="advantage-text">Worldwide delivery on&nbsp;all. Authorit tively morph
                        next-generation
                        innov tion
                        with extensive models.</p>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppSpecialOffers"
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/main"
    .special-offers
        background-color: #222224
        &-back
            height: 341px
            align-items: center
    .advantage
        text-align: center
        &-img
            margin-bottom: 32px
        &-box
            color: #fbfbfb
        &-heading
            font-size: 20px
            font-weight: 700
            letter-spacing: 0.5px
            margin-bottom: 17px
        &-text
            font-weight: 300
            line-height: 22px
</style>