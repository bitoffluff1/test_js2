<template>
    <div class="flex">
        <input class="input-form" type="text" placeholder="Search for Item..." v-model="searchQuery">
        <button class="button-form" @click.prevent="handleSearchClick">
            <i class="fas fa-search"></i>
        </button>
    </div>
</template>

<script>
    export default {
        name: "Search",
        data() {
            return {
                searchQuery: ""
            }
        },
        methods: {
            handleSearchClick() {
                this.$emit("search", this.searchQuery)
            }
        },
    }
</script>

<style lang="sass" scoped>
    @import "../../../../assets/main"
    .input-form
        +size-button(38px, 15px, 14px)
        width: 317px
        border-radius: 0 3px 3px 0
        border: 1px solid #e6e6e6
        font-weight: 300
        letter-spacing: 0.35px
        opacity: 0.67
        outline: none

    .button-form
        color: #a4a4a4
        letter-spacing: 0.35px
        padding: 0 11px
        border-radius: 0 3px 3px 0
        border: 1px solid #e6e6e6
        outline: none
        cursor: pointer
        background-color: #ffffff


</style>