<template>
    <form>
        <input class="forms-input forms-input_width"
               placeholder="Login" type="text" v-model="checkLogin" required>
        <input class="forms-input forms-input_width"
               type="password" placeholder="Password" required v-model="checkPassword">
        <div class="modal-button flex">
            <a href="#" class="button-black forms-button_size modal_size"
               @click.prevent="checkUser">SIGN IN</a>
            <p v-if="check.length"
               class="trending-now-link modal_text__margin pink">{{check}}</p>
        </div>
    </form>
</template>

<script>
    export default {
        name: "FormSignIn",
        data() {
            return {
                check: "",
                checkLogin: "",
                checkPassword: "",
            }
        },
        methods:{
            checkUser() {
                fetch("http://localhost:3000/auth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        checkLogin: this.checkLogin,
                        checkPassword: this.checkPassword
                    })
                })
                    .then((response) => response.json())
                    .then((message) => {
                        if (message.login) {
                            this.check = "Hi, " + message.login;
                            //this.userId = +message.id;
                        } else {
                            this.check = message[0];
                        }
                    })
            },
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../../../assets/main"
    .forms-input
        border: 1px solid #eaeaea
        background-color: #ffffff
        color: #4a4a4a
        +size-button(45px, 18px, 13px)
        font-weight: 300
        width: 355px
        display: block
        outline: none
        margin-bottom: 20px
        position: relative

        &_width
            width: 337px

        &:last-of-type
            margin-bottom: 23px


    .modal-button
        align-items: center

    .button-black
        text-decoration: none
        color: #4a4a4a
        border: 1px solid #eaeaea
        background-color: #ffffff
        font-weight: 700
        text-transform: uppercase

        &:hover
            box-shadow: 0 5px 8px #646464

    .forms-button_size
        +size-button(35px, 15px, 11px)
        padding-top: 12px
        padding-bottom: 12px

    .modal_size
        height: 18px
        line-height: 18px
        text-transform: uppercase
        margin: 0 5px

    .trending-now-link
        color: #6f6e6e
        font-weight: 400
        line-height: 26px
        text-decoration: none

        &:hover
            color: $pink

    .modal_text__margin
        padding: 0 20px
</style>
