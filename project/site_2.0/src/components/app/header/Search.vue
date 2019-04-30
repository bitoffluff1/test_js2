<template>
    <div>
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
    .input-form
        width: 317px
        height: 38px
        border-radius: 0 3px 3px 0
        border: 1px solid #e6e6e6
        background-color: #ffffff
        font-size: 14px
        font-weight: 300
        letter-spacing: 0.35px
        padding-right: 15px
        padding-left: 15px
        opacity: 0.67
        outline: none

    .button-form
        color: #a4a4a4
        font-size: 14px
        font-weight: 400
        letter-spacing: 0.35px
        padding: 0 11px
        line-height: 38px
        border-radius: 0 3px 3px 0
        border: 1px solid #e6e6e6
        outline: none
        cursor: pointer
        background-color: white


</style>