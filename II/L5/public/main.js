const API_URL = "http://localhost:3000";

Vue.component("product-item", {
    props: ["item"],
    template: `
            <div class="item">
                <div class="fetured-item1">
                    <a href="#" class="fetured-item">
                        <img :src="item.image" alt="fetured-items">
                        <div class="item-text">
                            <p class="name-item">{{item.name}}</p>
                            <p class="pink-item">\${{item.price}}</p>
                        </div>
                    </a>
                </div>
                <div class="add">
                    <a href="#" class="add-to-card" @click.prevent="handleBuyClick(item)">
                        <img class="cart-white" src="img/cart-white.svg" alt="cart">Add to Cart</a>
                </div>
            </div>`,
    methods: {
        handleBuyClick(item) {
            this.$emit("onbuy", item);
        }
    }
});

Vue.component("products", {
    props: ["query"],
    methods: {
        handleBuyClick(item) {
            this.$emit("onbuy", item)
        }
    },
    data() {
        return {
            items: [],
        };
    },
    computed: { //вычисляемое свойство
        filteredItems() {
            if (this.query) {
                const regexp = new RegExp(this.query, "i");
                return this.items.filter((item) => regexp.test(item.name));
            } else {
                return this.items;
            }
        }
    },
    mounted() {//когда компонент монтируется в дом
        fetch(`${API_URL}/items`)
            .then((response) => response.json())
            .then((items) => {
                this.items = items;
                this.filteredItems = items;
            });
    },
    template: `
        <div class="fetured-items-box container">
            <product-item @onbuy="handleBuyClick" v-for="entry in filteredItems" :item="entry" :key="entry.id"></product-item>
        </div>
    `,
});

Vue.component("cart-item", {
    props: ["item"],
    template: `
            <div class="row row-product">
                <div class="col col-1 row_first">
                    <figure class="col-1__product">
                        <a href="#"><img :src="item.image" alt="item" class="cart-item-img"></a>
                        <figcaption class="col-1__text">
                            <a href="#" class="shopping-cart-product-text">{{item.name}}</a>
                            <p class="shopping-cart-product-text-bottom">
                                <span class="bold">Color: </span>
                                <span>{{item.color}}</span></p>
                            <p class="shopping-cart-product-text-bottom">
                                <span class="bold">Size: </span>
                                <span>{{item.size}}</span></p>
                        </figcaption>
                    </figure>
                </div>
                <div class="col col-2">\${{item.price}}</div>
                <div class="col col-3"><input class="input" type="number" min="1" :value="item.quantity"></div>
                <div class="col col-4">FREE</div>
                <div class="col col-5">\${{item.price * item.quantity}}</div>
                <div class="col col-6 row-header__last row-header__last_center">
                    <a href="#" class="delete-cart-item" @click.prevent="handleDeleteClick(item)">
                        <i class="fas fa-times-circle"></i></a></div>
            </div>`,
    methods: {
        handleDeleteClick(item) {
            this.$emit("ondelete", item);
        }
    }
});

Vue.component("cart-products", {
    props: ["cart"],
    methods: {
        handleDeleteClick(item) {
            this.$emit("ondelete", item)
        }
    },
    template: `
        <div class="cart">
            <cart-item @ondelete="handleDeleteClick" v-for="entry in cart" :item="entry" :key="entry.id"></cart-item>
        </div>
    `,
});


const app = new Vue({
    el: "#app",
    data: {
        searchQuery: "",
        filterValue: "",
        isVisibleCart: "",
        cart: [],
    },
    computed: {
        total() {
            return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }
    },
    mounted() {//когда компонент монтируется в дом
        fetch(`${API_URL}/cart`)
            .then((response) => response.json())
            .then((items) => {
                this.cart = items;
            });
    },
    methods: {
        handleSearchClick() {
            this.filterValue = this.searchQuery;
        },
        handleBuyClick(item) {
            const cartItem = this.cart.find((entry) => entry.id === item.id);
            if (cartItem) {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({quantity: cartItem.quantity + 1})
                })
                    .then((response) => response.json())
                    .then((item) => {
                        const itemIdx = this.cart.findIndex((entry) => entry.id === item.id);
                        Vue.set(this.cart, itemIdx, item);
                    })
            } else {
                fetch(`${API_URL}/cart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...item, quantity: 1})
                })
                    .then((response) => response.json())
                    .then((item) => {
                        this.cart.push(item);
                    })
            }
        },
        handleShowCartClick() {
            this.isVisibleCart = this.isVisibleCart.length ? "" : "active";
        },
        handleDeleteClick(item) {
            if (item.quantity > 1) {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({quantity: item.quantity - 1})
                })
                    .then((response) => response.json())
                    .then((item) => {
                        const itemIdx = this.cart.findIndex((entry) => entry.id === item.id);
                        Vue.set(this.cart, itemIdx, item);
                    })
            } else {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
                    })
            }
        }
    }
});
