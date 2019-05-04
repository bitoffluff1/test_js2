<template>
    <div>
        <div class="browse-drop-flex" v-for="list in lists">
            <h3 class="drop-heading">{{list.blockName}}</h3>
            <menu-link class="browse-drop-menu" v-for="link in list.title" :link="link" :key="link.id"></menu-link>
        </div>
    </div>
</template>

<script>
    import MenuLink from "./MenuLink.vue";

    export default {
        name: "BrowseMenu",
        components: {
            MenuLink
        },
        data() {
            return {
                lists: [],
            };
        },
        mounted() {
            fetch("http://localhost:3000/browse")
                .then((response) => response.json())
                .then((items) => {
                    this.lists = items;
                });
        }
    }
</script>

<style lang="sass" scoped>
    .browse-drop-flex
        margin-bottom: 30px

    .browse-drop-flex:last-of-type
        margin-bottom: 0

    .drop-heading
        color: #232323
        font-size: 14px
        font-weight: 500
        text-transform: uppercase
        letter-spacing: 0.35px
        border-bottom: 1px solid #e8e8e8
        width: 235px
        padding-bottom: 8px
        margin-bottom: 8px

    .browse-drop-menu
        list-style-type: none


</style>