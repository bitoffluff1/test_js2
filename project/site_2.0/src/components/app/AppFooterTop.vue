<template>
    <footer class="footer-top container flex">
        <div class="footer-left">
            <a class="logo-footer" href="index.html">
                <img class="img-logo" src="img/logo.png" alt="logo">BRAN
                <span class="pink-D pink">D</span></a>
            <p class="footer-text">Objectively transition extensive data rather than cross functional
                solutions.
                Monotonectally syndicate multidisciplinary materials before go&nbsp;forward benefits. Intrinsicly
                syndicate
                an
                expanded array of&nbsp;processes and cross-unit partnerships.<br><br><br>
                Efficiently plagiarize 24/365 action items and focused infomediaries.Distinctively seize superior
                initiatives for wireless technologies. Dynamically optimize.</p>
        </div>
        <div class="footer-right">
            <div class="footer-menu">
                <h4 class="menu-title pink">COMPANY</h4>
                <ul class="menu-list">
                    <li><a class="menu-link" href="index.html">Home</a></li>
                    <li><a class="menu-link" href="#">Shop</a></li>
                    <li><a class="menu-link" href="#">About</a></li>
                    <li><a class="menu-link" href="#">How It&nbsp;Works</a></li>
                    <li><a class="menu-link" href="#">Contact</a></li>
                </ul>
            </div>
            <div class="footer-menu">
                <h4 class="menu-title pink">INFORMATION</h4>
                <ul class="menu-list">
                    <li><a class="menu-link" href="#">Tearms &amp;&nbsp;Condition</a></li>
                    <li><a class="menu-link" href="#">Privacy Policy</a></li>
                    <li><a class="menu-link" href="#">How to&nbsp;Buy</a></li>
                    <li><a class="menu-link" href="#">How to&nbsp;Sell</a></li>
                    <li><a class="menu-link" href="#">Promotion</a></li>
                </ul>
            </div>
            <div class="footer-menu">
                <h4 class="menu-title pink">SHOP CATEGORY</h4>
                <ul class="menu-list">
                    <li><a class="menu-link" href="product.html?category=men">Men</a></li>
                    <li><a class="menu-link" href="product.html?category=women">Women</a></li>
                    <li><a class="menu-link" href="product.html?category=men">Child</a></li>
                    <li><a class="menu-link" href="product.html">Apparel</a></li>
                    <li><a class="menu-link" href="product.html">Browse All</a></li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "AppFooterTop"
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/main"
    .footer
        &-top
            margin-top: 123px
            justify-content: space-between

        &-left
            width: 428px
            font-weight: 300

        &-right
            display: flex
            justify-content: space-around
            width: 700px

        &-text
            color: #898989
            font-size: 14px
            letter-spacing: 0.35px
            line-height: 20px

    .logo-footer
        color: #222222
        font-size: 27px
        text-transform: uppercase
        text-decoration: none
        display: flex
        align-items: center
        margin-bottom: 29px

    .pink-D
        font-weight: 500
        letter-spacing: 1px

    .img-logo
        margin-right: 13px

    .menu
        &-list
            list-style-type: none

        &-title
            font-size: 18px
            font-weight: 700
            text-transform: uppercase
            letter-spacing: 0.45px
            margin-bottom: 32px

        &-link
            color: #898989
            font-size: 16px
            font-weight: 400
            letter-spacing: 0.4px
            text-decoration: none
            line-height: 38px

</style>