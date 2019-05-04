<template>
    <div class="modal-content flex">
        <a href="#"><i @click.prevent="handleChangePasswordClick"
                       class="fas fa-times-circle fas_modal"></i></a>
        <main class="modal_main">
            <a href="#" class="title">
                <h2 class="forms-title modal_title">CHANGE PASSWORD</h2></a>
            <input class="forms-input forms-input_width"
                   placeholder="Сurrent Password" type="password" v-model="currentPassword"
                   required>
            <input class="forms-input forms-input_width"
                   type="password" placeholder="New Password" required
                   v-model="newPassword">
            <div class="modal-button flex">
                <a href="#" class="button-black forms-button_size modal_size"
                   @click.prevent="changePassword">SAVE PASSWORD</a>
                <p v-if="changePass.length"
                   class="trending-now-link modal_text__margin modal_text__color">
                    {{changePass}}</p>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        name: "RegisteredModal",
        data() {
            return {
                currentPassword: "",
                newPassword: "",
                changePass: "",
            }
        },
        methods: {
            handleChangePasswordClick() {
                this.$emit("close");
            },
            changePassword() {
                fetch(`$"http://localhost:3000/pass`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        currentPassword: this.currentPassword,
                        newPassword: this.newPassword,
                        userId: +localStorage.userId
                    })
                })
                    .then((response) => response.json())
                    .then((message) => {
                        this.changePass = message[0];
                    })
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../../../assets/main"
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

    .forms-title
        color: #222222
        font-size: 16px
        font-weight: 700
        text-transform: uppercase
        margin-bottom: 22px

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

        &:last-of-type
            margin-bottom: 23px

        &_width
            width: 337px


    .modal_title:hover
        color: $pink

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

</style>