<template>
    <div>
        <h2>User Single Page</h2>
        <p>{{item.product.name}}</p>
    </div>
</template>

<script>
    export default {
        name: "PageUserSingle",
        props: ["id"],
        data() {
            return {
                item: {}
            }
        },
        mounted() {
            fetch(`http://localhost:3000/single-page.html/${this.id}`)
                .then((response) => response.json())
                .then((item) => {
                    this.item = item;
                })
        }
    }
</script>

<style lang="scss" scoped>

</style>