<template>
    <form>
        <input class="shopping-cart-forms-input shopping-cart-forms-input_width"
               placeholder="Login" type="text" v-model="checkLogin" required>
        <input class="shopping-cart-forms-input shopping-cart-forms-input_width"
               type="password" placeholder="Password" required v-model="checkPassword">
        <div class="modal-button">
            <a href="#" class="button-black shopping-cart-forms-button_size modal_size"
               @click.prevent="checkUser">SIGN IN</a>
            <p v-if="check.length"
               class="trending-now-link modal_text__margin modal_text__color">{{check}}</p>
        </div>
    </form>
</template>

<script>
    export default {
        name: "FormSignIn"
    }
</script>

<style scoped>

</style>