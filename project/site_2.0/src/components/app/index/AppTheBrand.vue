<template>
    <div class="the-brand">
        <div class="container the-brand-back flex">
            <div class="the-brand-text">
                <p class="text-top-the-brand">THE BRAND</p>
                <p class="text-bottom-the-brand">OF&nbsp;LUXURIOUS <span class="pink">FASHION</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppTheBrand"
    }
</script>

<style lang="sass" scoped>
    @import "../../../assets/main"
    .the-brand
        background-color: #e8e8e8

    .the-brand-back
        height: 613px
        background-image: url("img/header.jpg")
        background-position: 5.4px -53px
        align-items: flex-start

    .the-brand-text p
        color: #222222
        font-weight: 700
        text-transform: uppercase

    .text-top-the-brand
        font-size: 60px
        line-height: 45px
        margin-bottom: 16px
        letter-spacing: 1.4px

    .text-bottom-the-brand
        font-size: 40px
        line-height: 35px
        letter-spacing: 1.1px

    .the-brand-text
        margin-top: 223px
        border-left: 12px solid $pink
        padding-left: 14px
</style>