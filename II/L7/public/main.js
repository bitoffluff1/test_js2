const API_URL = "http://localhost:3000";

Vue.component("product-item", {
    props: ["item"],
    template: `
            <div class="item">
                <div class="fetured-item1">
                    <a href="single-page.html" class="fetured-item">
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
        </div>`
});

Vue.component("search", {
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
    template: `
         <div>
             <input class="input-form" type="text" placeholder="Search for Item..." v-model="searchQuery"><button class="button-form" type="submit" @click.prevent="handleSearchClick"><i
                     class="fas fa-search"></i></button>
         </div>`
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
                <div class="col col-3"><input class="input" type="number" min="1"  v-model="item.quantity" @click="handleChangeInputClick(item, item.quantity)"></div>
                <div class="col col-4">FREE</div>
                <div class="col col-5">\${{item.price * item.quantity}}</div>
                <div class="col col-6 row-header__last row-header__last_center">
                    <a href="#" class="delete-cart-item" @click.prevent="handleDeleteClick(item)">
                        <i class="fas fa-times-circle"></i></a></div>
            </div>`,
    methods: {
        handleDeleteClick(item) {
            this.$emit("ondelete", item);
        },
        handleChangeInputClick(item, quantity) {
            this.$emit("changeinput", item, quantity);
        }
    }
});

Vue.component("cart-products", {
    props: ["cart"],
    methods: {
        handleDeleteClick(item) {
            this.$emit("ondelete", item)
        },
        handleChangeInputClick(item, quantity) {
            this.$emit("changeinput", item, quantity);
        }
    },
    template: `
        <div class="cart">
            <cart-item @ondelete="handleDeleteClick" @changeinput="handleChangeInputClick" v-for="entry in cart" :item="entry" :key="entry.id" ></cart-item>
        </div>
    `,
});

Vue.component("mini-cart-item", {
    props: ["item"],
    template: `
        <figure class="cart-product">
            <a href="#" class="img-cart-product"><img :src="item.image" alt="product" class="image-mini-cart"></a>
            <figcaption class="text-cart-drop">
                <a href="#" class="text-cart-drop-box">{{item.name}}</a>
                <div class="block-star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <p class="price-cart">{{item.quantity}} x \${{item.price}}</p>
            </figcaption>
            <i class="fas fa-times-circle fa-times-circle__cart" @click="handleDeleteClick(item)"></i>
        </figure>`,

    methods: {
        handleDeleteClick(item) {
            this.$emit("ondelete", item);
        },
    }
});

Vue.component("mini-cart-products", {
    props: ["cart"],
    methods: {
        handleDeleteClick(item) {
            this.$emit("ondelete", item)
        },
    },
    template: `
        <div>
            <mini-cart-item @ondelete="handleDeleteClick" v-for="entry in cart" :item="entry" :key="entry.id" ></mini-cart-item>
        </div>
    `,
});

Vue.component("menu-link", {
    props: ["link"],
    template: `
            <li><a class="drop-link" href="#">{{link}}</a></li>`,
});

Vue.component("browse-menu", {
    data() {
        return {
            lists: [],
        };
    },
    mounted() {//когда компонент монтируется в дом
        fetch(`${API_URL}/browse`)
            .then((response) => response.json())
            .then((items) => {
                this.lists = items;
            });
    },
    template: `
        <div>
            <div class="browse-drop-flex" v-for="list in lists">
                <h3 class="drop-heading">{{list.blockName}}</h3>
                <menu-link class="browse-drop-menu" v-for="link in list.title" :link="link" :key="link.id"></menu-link>
            </div>
        </div>`,
});

Vue.component("nav-menu", {
    data() {
        return {
            lists: [],
        };
    },
    mounted() {//когда компонент монтируется в дом
        fetch(`${API_URL}/nav`)
            .then((response) => response.json())
            .then((items) => {
                this.lists = items;
            });
    },
    template: `
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
        </div>`,
});

Vue.component("feedback-item-app", {
    props: ["item"],
    template: `
        <div class="feedback-item">
            <h4 class="text-material-designer">Name: <span class="bold-text">{{item.name}}</span></h4>
            <p class="text-details text-details_margin">{{item.message}}</p>
            <div class="modal-button">
                <a href="#" class="button-pink shopping-cart-forms-button_size modal_size"
                   @click.prevent="revocationApproval(item)">APPROVAL</a>
                <a href="#" class="button-black shopping-cart-forms-button_size modal_size"
                   @click.prevent="deleteApproval(item)">Delete</a>
            </div>
         </div>`
    ,
    methods: {
        deleteApproval(item) {
            this.$emit("ondelete", item);
        },
        revocationApproval(item) {
            this.$emit("approval", item);
        }
    }
});

Vue.component("feedback-list-app", {
    props: ["feedback"],
    methods: {
        deleteApproval(item) {
            this.$emit("ondelete", item)
        },
        revocationApproval(item) {
            this.$emit("approval", item);
        }
    },
    template: `
        <div class="feedback-list">
            <feedback-item-app @ondelete="deleteApproval" @approval="revocationApproval" v-for="entry in feedback" :item="entry" :key="entry.id" ></feedback-item-app>
        </div>
    `
});
Vue.component("feedback-item", {
    props: ["item"],
    template: `
        <div class="feedback-item">
            <h4 class="text-material-designer">Name: <span class="bold-text">{{item.name}}</span></h4>
            <p class="text-details text-details_margin">{{item.message}}</p>
         </div>`
    ,
});

Vue.component("feedback-list", {
    props: ["feedback"],
    template: `
        <div class="feedback-list">
            <feedback-item v-for="entry in feedback" :item="entry" :key="entry.id" ></feedback-item>
        </div>
    `
});


const app = new Vue({
    el: "#app",
    data: {
        filterValue: "",
        isVisibleCart: "",
        cart: [],

        modal: "",
        signIn: "active",
        signUp: "",
        email: "",
        login: "",
        password: "",
        checkLogin: "",
        checkPassword: "",
        sent: "",
        check: "",
        userId: 0,
        modalAcc: "",
        currentPassword: "",
        newPassword: "",
        changePass: "",

        name: "",
        mail: "",
        message: "",
        submit: "",

        feedbackForApproval: [],
        feedback: [],
    },
    watch: {
        userId: function () {
            this.getCart()
        }
    },
    computed: {
        total() {
            return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        totalAmount() {
            return this.cart.reduce((acc, item) => acc + +item.quantity, 0);
        }
    },
    mounted() {//когда компонент монтируется в дом
        this.feedbackForApproval = [];
        fetch(`${API_URL}/approval`)
            .then((response) => response.json())
            .then((items) => {
                this.feedbackForApproval = items;
            });

        this.feedback = [];
        fetch(`${API_URL}/feedback`)
            .then((response) => response.json())
            .then((items) => {
                this.feedback= items;
            });
    },
    methods: {
        getCart() {
            this.cart = [];
            fetch(`${API_URL}/cart/${this.userId}`)
                .then((response) => response.json())
                .then((items) => {
                    this.cart = items;
                });
        },
        handleSearchClick(query) {
            this.filterValue = query;
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
                    body: JSON.stringify({...item, quantity: 1, userId: this.userId})
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
        },
        handleChangeInputClick(item, quantity) {
            fetch(`${API_URL}/cart/${item.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({quantity: +quantity})
            })
                .then((response) => response.json());
        },
        clearCart() {
            this.cart.forEach((item) => {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: "DELETE"
                }).then(() => {
                    this.cart = [];
                })
            })
        },
        handleShowModalClick() {
            this.modal = this.modal.length ? "" : "active";
        },
        handleSignClick() {
            this.signUp = this.signUp.length ? "" : "active";
            this.signIn = this.signIn.length ? "" : "active";
        },
        sendUser() {
            const validation = {
                name: /^[a-z]+$/iu,
                email: /.+@.+\..+/i
            };
            Object.keys(validation).forEach((rule) => {
                const fields = document.querySelectorAll("[data-validation-rule='" + rule + "']");
                fields.forEach((field) => {
                    if (validation[rule].test(field.value)) {
                        field.classList.remove("invalid");
                    } else {
                        field.classList.add("invalid");
                    }
                });
            });

            const $singUp = document.getElementById("singUp");
            if ($singUp.querySelectorAll(".invalid").length === 0) {
                fetch(`${API_URL}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: this.email,
                        login: this.login,
                        password: this.password
                    })
                })
                    .then((response) => response.json())
                    .then((message) => {
                        if (message.login) {
                            this.sent = "Hi, " + message.login;
                        } else {
                            this.sent = message[0];
                        }
                    });
            }
        },
        checkUser() {
            fetch(`${API_URL}/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    checkLogin: this.checkLogin,
                    checkPassword: this.checkPassword
                })
            })
                .then((response) => response.json())
                .then((message) => {
                    if (message.login) {
                        this.check = "Hi, " + message.login;
                        this.userId = message.id;
                    } else {
                        this.check = message[0];
                    }
                })
        },
        handleSignOutClick() {
            this.userId = 0;
            this.check = "";
        },
        handleChangePasswordClick() {
            this.modalAcc = this.modalAcc.length ? "" : "active";
        },
        changePassword() {
            fetch(`${API_URL}/pass`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword,
                    userId: this.userId
                })
            })
                .then((response) => response.json())
                .then((message) => {
                    this.changePass = message[0];
                })
        },
        sendFeedback() {
            fetch(`${API_URL}/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: this.mail,
                    name: this.name,
                    message: this.message,
                    type: "new"
                })
            })
                .then((response) => response.json())
                .then((feedback) => {
                    this.submit = "submit";
                    this.feedbackForApproval.push(feedback);
                });

        },
        revocationApproval(item) {
            fetch(`${API_URL}/feedback/${item.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({type: "approved"})
            })
                .then((response) => response.json())
                .then((item) => {
                    this.feedbackForApproval = this.feedbackForApproval.filter((feedbackItem) => feedbackItem.id !== item.id);
                })
        },
        deleteApproval(item) {
            fetch(`${API_URL}/feedback/${item.id}`, {
                method: "DELETE"
            })
                .then(() => {
                    this.feedbackForApproval = this.feedbackForApproval.filter((feedbackItem) => feedbackItem.id !== item.id);
                })
        },
    }
});
