const app = new Vue({
    el: "#app",
    data: {
        items: [],
        filteredItems: [],
        searchQuery: "",
        itemsCart: [],
        isVisibleCart: "",
    },
    mounted() {
        fetch("http://localhost:3000/items")
            .then((response) => response.json())
            .then((items) => {
                this.items = items;
                this.filteredItems = items;
            });
        fetch("http://localhost:3000/cart")
            .then((response) => response.json())
            .then((items) => {
                this.itemsCart = items;
            })
    },
    methods: {
        handleSearchClick() {
            const regexp = new RegExp(this.searchQuery, "i");
            this.filteredItems = this.items.filter((item) => regexp.test(item.name))
        },
        handleCartClick() {
            this.isVisibleCart.length ? this.isVisibleCart = "" : this.isVisibleCart = "active";
        }
    }
});
