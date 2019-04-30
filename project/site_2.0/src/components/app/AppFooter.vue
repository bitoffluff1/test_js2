<template>
    <footer class="footer-bottom flex">
        <div class="container footer-text flex">
            <p> &copy; 2019 Brand All Rights Reserved.</p>
            <div class="flex">
                <a href="#" class="icon"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="icon"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" class="icon"><i class="fab fa-pinterest-p"></i></a>
                <a href="#" class="icon"><i class="fab fa-google-plus-g"></i></a>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "AppFooter"
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/main"

    .footer-bottom
        background-color: #e6e6e6
        height: 79px
        margin-top: 89px

    .footer-text
        color: #7a7a7a
        font-size: 16px
        letter-spacing: 0.4px
        justify-content: space-between
        align-items: center

    .icon
        color: #b2b2b2
        background-color: #ffffff
        width: 32px
        height: 32px
        line-height: 32px
        text-align: center
        display: block
        margin-right: 8px
        &:last-child
            margin-right: 0
        &:hover
            background-color: $pink
            color: #f7f7f8
</style>