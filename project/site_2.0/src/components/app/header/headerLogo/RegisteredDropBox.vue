<template>
    <div class="buttons_account flex">
        <a href="#" class="button">{{check}}</a>
        <div class="account_drop-box">
            <li><a class="drop-link" href="#" @click.prevent="handleSignOutClick">Sign Out</a></li>
            <li><a class="drop-link" href="#" @click.prevent="handleChangePasswordClick">Change&nbsp;password</a></li>
            <registered-modal @close="handleChangePasswordClick" class="modal" v-if="modalAcc.length"></registered-modal>
        </div>
    </div>
</template>

<script>
    import RegisteredModal from "./RegisteredModal.vue";

    export default {
        name: "RegisteredDropBox",
        components: {
            RegisteredModal,
        },
        data(){
          return{
              modalAcc: "",
          }
        },
        methods:{
            handleChangePasswordClick() {
                this.modalAcc = this.modalAcc.length ? "" : "active";
            },
        },
    }
</script>

<style lang="sass" scoped>
    @import "../../../../assets/main"
    .buttons_account
        position: relative

    .account_drop-box
        border-radius: 5px
        background-color: #ffffff
        border: 1px solid #ececec
        position: absolute
        padding: 20px
        display: none
        top: 38px
        left: -40px
        z-index: 10
        list-style-type: none


    .buttons_account:hover .account_drop-box
        display: block

    .button
        +size-button(38px, 17px, 15px)
        display: block
        text-decoration: none
        color: #ffffff
        letter-spacing: 0.28px
        background-color: $pink
        margin-left: 25px
        &:hover
            box-shadow: 0 5px 8px #646464

    .drop-link
        color: #646464
        letter-spacing: 0.35px
        text-decoration: none
        line-height: 28px
        &:hover
            color: $pink

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
</style>