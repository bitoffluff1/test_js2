<template>
    <div class="drop-box">
        <div class="drop-flex">
            <h3 class="drop-heading">{{lists[0].blockName}}</h3>
            <menu-link class="drop-menu" v-for="link in lists[0].title" :link="link" :key="link.id"></menu-link>
        </div>
        <div class="drop-flex">
            <h3 class="drop-heading">{{lists[1].blockName}}</h3>
            <menu-link class="drop-menu" v-for="link in lists[1].title" :link="link" :key="link.id"></menu-link>
            <br>
            <h3 class="drop-heading">{{lists[2].blockName}}</h3>
            <menu-link class="drop-menu" v-for="link in lists[2].title" :link="link" :key="link.id"></menu-link>
        </div>
        <div class="drop-flex">
            <h3 class="drop-heading">{{lists[3].blockName}}</h3>
            <menu-link class="drop-menu" v-for="link in lists[3].title" :link="link" :key="link.id"></menu-link>
            <div class="img-drop-flex"><a href="#" class="text-img-drop-flex">Super sale!</a></div>
        </div>
    </div>
</template>

<script>
    import MenuLink from "../MenuLink.vue";

    export default {
        name: "NavMenu",
        components: {
            MenuLink
        },
        data() {
            return {
                lists: [],
            };
        },
        mounted() {
            fetch("http://localhost:3000/nav")
                .then((response) => response.json())
                .then((items) => {
                    this.lists = items;
                });
        },
    }
</script>

<style scoped>
    .drop-box {
        border-radius: 5px;
        background-color: #ffffff;
        border: 1px solid #ececec;
        position: absolute;
        padding: 20px;
        display: none;
        top: 50px;
        left: -10px;
        z-index: 10;
    }

    .drop-box:before {
        content: "";
        display: block;
        width: 12px;
        height: 12px;
        position: absolute;
        top: -8px;
        left: 31px;
        transform: rotate(45deg);
        background-color: #ffffff;
        border-top: 1px solid #ececec;
        border-left: 1px solid #ececec;
    }

    .drop-flex {
        margin-right: 46px;
    }

    .drop-flex:last-of-type {
        margin-right: 0;
    }


    .drop-heading {
        color: #232323;
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.35px;
        border-bottom: 1px solid #e8e8e8;
        width: 235px;
        padding-bottom: 8px;
        margin-bottom: 8px;
    }

    .drop-menu {
        list-style-type: none;
    }

    .img-drop-flex {
        margin-top: 22px;
        background-image: url("img/drop-menu.jpg");
        width: 255px;
        height: 118px;
    }
</style>