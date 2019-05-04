<template>
    <form>
        <input class="forms-input forms-input_width"
               placeholder="Example@gmail.com" type="email" v-model="email" name="email"
               required
               data-validation-rule="email">
        <input class="forms-input forms-input_width"
               placeholder="Login" type="text" v-model="login" name="login" required
               data-validation-rule="name">
        <input class="forms-input forms-input_width"
               type="password" placeholder="Password" v-model="password" name="password"
               required>
        <div class="modal-button flex">
            <a href="#" class="button-black forms-button_size modal_size"
               @click="sendUser">SIGN UP</a>
            <div v-if="errors.length"
                 class="trending-now-link modal_text__margin modal_text__color">
                <b>Please correct the following error(s):</b>
                <ul class="drop-menu">
                    <li class="drop-link" v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
            <p v-if="sent.length"
               class="trending-now-link modal_text__margin modal_text__color">{{sent}}</p>
        </div>
    </form>
</template>

<script>
    export default {
        name: "FormSignUp",
        data(){
            return{
                email: "",
                login: "",
                password: "",
                sent: "",
                errors: [],
            }
        },
        methods:{
            sendUser() {
                const validation = {
                    name: /^[a-z]+$/iu,
                    email: /.+@.+\..+/i
                };
                this.errors = [];

                if (!validation["name"].test(this.login)) {
                    this.errors.push("Name required")
                }
                if (!validation["email"].test(this.email)) {
                    this.errors.push("Valid email required")
                }

                if (!this.errors.length) {
                    fetch(`${API_URL}/users`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: this.email,
                            login: this.login,
                            password: this.password
                        })
                    })
                        .then((response) => response.json())
                        .then((message) => {
                            if (message.login) {
                                this.sent = "Hi, " + message.login;
                            } else {
                                this.sent = message[0];
                            }
                        });
                }
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
        font-size: 13px
        font-weight: 300
        height: 45px
        width: 355px
        display: block
        line-height: 45px
        outline: none
        margin-bottom: 20px
        position: relative
        padding-left: 18px

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
        font-size: 14px
        font-weight: 400
        line-height: 26px
        text-decoration: none

        &:hover
            color: $pink

    .modal_text__margin
        padding: 0 20px

    .modal_text__color
        color: $pink

    .drop-menu
        list-style-type: none

    .drop-link
        color: #646464
        font-size: 14px
        font-weight: 400
        letter-spacing: 0.35px
        text-decoration: none
        line-height: 28px
        &:hover
            color: #f16d7f
</style>