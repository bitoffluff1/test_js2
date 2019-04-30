<template>
    <div class="modal">
        <div class="modal-content flex">
            <a href="#"><i @click.prevent="handleShowModalClick"
                           class="fas fa-times-circle fas_modal"></i></a>
            <main class="modal_main">
                <div class="flex">
                    <a href="#" @click="handleSignClick('signIn')" class="title"><h2
                            class="forms-text modal_title">SIGN IN</h2></a>
                    <a href="#" @click="handleSignClick('signUp')" class="title"><h2
                            class="forms-text modal_title">SIGN UP</h2></a>
                </div>
                <form-sign-in v-if="sign === 'signIn'"></form-sign-in>
                <form-sign-up v-if="sign === 'signUp'"></form-sign-up>

                <form v-if="sign === 'signUp'">
                    <input class="shopping-cart-forms-input shopping-cart-forms-input_width"
                           placeholder="Example@gmail.com" type="email" v-model="email" name="email"
                           required
                           data-validation-rule="email">
                    <input class="shopping-cart-forms-input shopping-cart-forms-input_width"
                           placeholder="Login" type="text" v-model="login" name="login" required
                           data-validation-rule="name">
                    <input class="shopping-cart-forms-input shopping-cart-forms-input_width"
                           type="password" placeholder="Password" v-model="password" name="password"
                           required>
                    <div class="modal-button">
                        <a href="#" class="button-black shopping-cart-forms-button_size modal_size"
                           @click="sendUser">SIGN UP</a>
                        <div v-if="errors.length"
                             class="trending-now-link modal_text__margin modal_text__color">
                            <b>Please correct the following error(s):</b>
                            <ul class="drop-menu ">
                                <li class="drop-link" v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>
                        <p v-if="sent.length"
                           class="trending-now-link modal_text__margin modal_text__color">{{sent}}</p>
                    </div>
                </form>
            </main>
        </div>
    </div>
</template>

<script>
    import FormSignIn from "./FormSignIn.vue";
    import FormSignUp from "./FormSignUp.vue";

    export default {
        name: "ModalForRegistration",
        components: {
            FormSignIn,
            FormSignUp,
        },
        data() {
            return {
                sign: "",
            }
        },
        methods: {
            handleShowModalClick() {
                this.$emit("close");
            },
            handleSignClick(button) {
                //this.sign = button === "signIn" ? "signIn" : "";
                if (button === "signIn") {
                    this.sign = "signIn";
                }
                if (button === "signUp") {
                    this.sign = "signUp";
                }
            },
        },
    }
</script>

<style lang="sass" scoped>
    @import "../../../assets/main"
    .modal
        position: fixed
        z-index: 1
        left: 0
        right: 0
        top: 0
        bottom: 0
        width: 100%
        height: 100%
        overflow: auto
        background-color: rgba(0, 0, 0, 0.7)

    .modal-content
        flex-direction: column
        align-items: center
        justify-content: center
        width: 600px
        max-width: 100%
        height: 400px
        max-height: 100%
        position: fixed
        z-index: 100
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
        background-color: #f5f3f3
        padding: 40px

    .fas_modal
        position: absolute
        right: 40px
        top: 40px

    .title
        text-decoration: none
        margin: 0 10px

    .forms-text
        color: #222222
        font-size: 16px
        font-weight: 700
        text-transform: uppercase
        margin-bottom: 22px

    .modal_title:hover
        color: $pink
</style>