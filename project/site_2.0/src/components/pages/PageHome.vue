<template>
    <div>
        <h2>Home Page</h2>
        <ul>
            <li v-for="item in items" :key="item.id">
                <router-link :to="{name: 'user-single', params: {id: item.id}}">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "PageHome",
        data() {
            return {
                items: [],
            }
        },
        mounted() {
            fetch("http://localhost:3000/items/all")
                .then((request) => request.json())
                .then((items) => {
                    this.items = items;
                })
        }
    }
</script>

<style lang="scss" scoped>

</style>