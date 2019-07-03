<template>
    <div class="comments">
        <div class="container comments-back flex">
            <figure class="comments-left">
                <img src="img/comment1.png" alt="comment">
                <figcaption class="comment">
                    <p class="comment-text"> &laquo;Vestibulum quis porttitor dui! Quisque viverra nunc mi,a
                        pulvinar
                        purus
                        condimentum&nbsp;a. Aliquam condimentum mattis neque sed pretium&raquo; </p>
                    <p class="comment-pink pink">Bin Burhan</p>
                    <p class="comment-grey">Dhaka, Bd</p>
                </figcaption>
            </figure>
            <div class="comments-right">
                <p class="comments-text">Subscribe</p>
                <p>FOR OUR NEWLETTER AND PROMOTION</p>
                <input class="comments-input" type="email" placeholder="Enter Your Email">
                <button class="comments-button" type="submit">Subscribe</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppComments"
    }
</script>

<style lang="sass" scoped>
    @import "../../assets/main"
    .comments
        background-image: url(../img/comment.jpg)
        background-repeat: no-repeat
        background-position: center
        &-back
            height: 438px
            align-items: center
            justify-content: space-between

        &-left
            display: flex
            align-items: flex-start
            width: 497px
            margin-bottom: 50px

        &-right
            text-align: center
            margin: 0 auto 50px
        &-text
            font-size: 24px
            letter-spacing: 0.6px
            text-transform: uppercase
            margin-bottom: 10px
        &-input
            width: 334px
            height: 46px
            border-radius: 23px
            background-color: #e1e1e1
            opacity: 0.67
            padding-right: 100px
            padding-left: 15px
            margin-top: 35px
            position: relative
            -webkit-box-sizing: border-box
            -moz-box-sizing: border-box
            box-sizing: border-box
            font-size: 14px
        &-button
            border-radius: 0 23px 23px 0
            background-color: $pink
            color: #ffffff
            position: absolute
            padding-left: 21px
            padding-right: 21px
            height: 46px
            margin-top: -46px
            margin-left: 250px
            display: block
            font-size: 14px

    .comment
        margin-left: 28px
        font-size: 16px
        letter-spacing: 0.4px
        &-text
            font-style: italic
            line-height: 25px
        &-pink
            font-weight: 700
            margin-top: 19px
        &-grey
            font-size: 12px
            font-weight: 300

</style>