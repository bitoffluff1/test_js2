<template>
    <div class="categories-index">
        <div class="container categories flex">
            <div class="big-image big-image_men">
                <div class="categories-button flex">
                    <a href="#" class="text-category">
                        <p class="text-category_top">HOT DEAL</p>
                        <p class="text-category_bottom">FOR MEN</p>
                    </a>
                </div>
            </div>
            <div class="accessories_backgroundColor">
                <div class="little-image little-image_accessories">
                    <div class="categories-button flex">
                        <a href="#" class="text-category">
                            <p class="text-category_top">LUXURIOUS &amp;&nbsp;trendy</p>
                            <p class="text-category_bottom">Accessories</p>
                        </a>
                    </div>
                </div>
            </div>
            <div class="little-image little-image_women">
                <div class="categories-button flex">
                    <a href="#" class="text-category">
                        <p class="text-category_top">30% offer</p>
                        <p class="text-category_bottom">women</p>
                    </a>
                </div>
            </div>
            <div class="big-image big-image_kids">
                <div class="categories-button flex">
                    <a href="#" class="text-category">
                        <p class="text-category_top">new arrivals</p>
                        <p class="text-category_bottom">FOR kids</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppCategories"
    }
</script>

<style lang="sass" scoped>
    @import "../../../assets/main"
    .categories
        margin-top: 98px
        height: 823px
        flex-wrap: wrap
        flex-direction: column
        justify-content: space-between
    .big-image
        width: 560px
        height: 516px
        padding-top: 26px
        &_men
            background-image: url(../img/for-men.jpg)
        &_kids
            background-image: url(../img/kids.jpg)

    .categories-button
        transition: transform 0.2s
        &:hover
            transform: scale(1.1, 1.1) translateX(20px)

    .text-category
        text-decoration: none
        padding-left: 19px
        padding-right: 19px
        height: 82px
        background-color: #ffffff
        display: block
        text-transform: uppercase
        font-weight: 800
        color: #222222
        &_bottom
            color: $pink
            font-size: 30px
            letter-spacing: 0.75px
            line-height: 20px
            margin-top: -10px
        &_top
            font-size: 18px
            letter-spacing: 0.45px
            line-height: 60px
            margin-top: -7px

    .accessories_backgroundColor
        background-color: #dadad2
        width: 560px
        margin-right: 20px

    .little-image
        width: 560px
        height: 235px
        padding-top: 26px
        &_women
            background-image: url(../img/woman.jpg)
        &_accessories
            background-image: url(../img/accesories.jpg)
            background-position: 149px 1px
            background-repeat: no-repeat

</style>