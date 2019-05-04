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
    @import "../../../../assets/main"
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