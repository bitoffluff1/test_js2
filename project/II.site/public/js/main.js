const API_URL = "http://localhost:3000";

Vue.component("product-item", {
    props: ["item"],
    data() {
        return {
            url: "single-page.html?id=" + this.item.id
        }
    },
    template: `
            <div class="item">
                <div class="fetured-item1">
                    <a :href="url" class="fetured-item">
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
            category: "featured",
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
        const params = window.location.pathname.replace("/", "");
        if (params === "index.html") {
            this.category = "featured";
        }
        fetch(`${API_URL}/items/${this.category}`)
            .then((response) => response.json())
            .then((items) => {
                this.items = items;
                this.filteredItems = items;
            });
    },
    template: `
        <div class="fetured-items-box">
            <product-item @onbuy="handleBuyClick" v-for="entry in filteredItems" :item="entry" :key="entry.id"></product-item>
        </div>`
});

Vue.component("all-products", {
    props: ["query"],
    methods: {
        handleBuyClick(item) {
            this.$emit("onbuy", item)
        },
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        handleQuantityItemOnPageClick(size) {
            this.quantityItemOnPage = +size;
        },
        sortItems(sortBy) {
            if (sortBy === "lowPrice") {
                if (this.arrSortByPrice.length) {
                    this.arrSortByPrice.sort((itemA, itemB) => {
                        return itemA.price - itemB.price
                    });
                } else {
                    this.items.sort((itemA, itemB) => {
                        return itemA.price - itemB.price
                    })
                }
            }

            if (sortBy === "name") {
                if (this.arrSortByPrice.length) {
                    this.arrSortByPrice.sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        if (nameA < nameB)
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0
                    });
                } else {
                    this.items.sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        if (nameA < nameB)
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0
                    });
                }
            }
        },
        sortByPrice(newPrice) {
            this.arrSortByPrice = [];

            if (this.query && this.arrSortBySize.length) {
                if (this.filteredItems.length < this.arrSortBySize.length) {
                    this.arrSortByPrice = this.filteredItems.filter((item) => item.price < newPrice);
                } else {
                    this.arrSortByPrice = this.arrSortBySize.filter((item) => item.price < newPrice);
                }
            } else if (this.query) {
                this.arrSortByPrice = this.filteredItems.filter((item) => item.price < newPrice);
            } else if (this.arrSortBySize.length) {
                this.arrSortByPrice = this.arrSortBySize.filter((item) => item.price < newPrice);
            } else {
                this.arrSortByPrice = this.items.filter((item) => item.price < newPrice);
            }
        },
        sortBySize(newSize) {
            this.arrSortBySize = [];

            if (this.query && this.arrSortByPrice.length) {
                if (this.filteredItems.length < this.arrSortByPrice.length) {
                    newSize.forEach((size) => {
                        this.arrSortBySize = this.arrSortBySize.concat(this.filteredItems.filter((item) => item.size === size));
                    });
                } else {
                    newSize.forEach((size) => {
                        this.arrSortBySize = this.arrSortBySize.concat(this.arrSortByPrice.filter((item) => item.size === size));
                    });
                }
            } else if (this.query) {
                newSize.forEach((size) => {
                    this.arrSortBySize = this.arrSortBySize.concat(this.filteredItems.filter((item) => item.size === size));
                });
            } else if (this.arrSortByPrice.length) {
                newSize.forEach((size) => {
                    this.arrSortBySize = this.arrSortBySize.concat(this.arrSortByPrice.filter((item) => item.size === size));
                });
            } else {
                newSize.forEach((size) => {
                    this.arrSortBySize = this.arrSortBySize.concat(this.arrSortBySize.filter((item) => item.size === size));
                });
            }
        },
    },
    data() {
        return {
            items: [],
            category: "",
            quantityItemOnPage: 9,
            pageNumber: 0,
            checkedSize: [],
            price: 0,
            maxPrice: 0,
            arrSortByPrice: [],
            arrSortBySize: [],
        };
    },
    watch: {
        price(newPrice) {
            this.sortByPrice(newPrice);
        },
        checkedSize(newSize) {
            this.sortBySize(newSize);
        }
    },
    computed: {
        filteredItems() {
            if (this.query) {
                const regexp = new RegExp(this.query, "i");

                if (this.arrSortBySize.length && this.arrSortByPrice.length) {
                    if (this.arrSortBySize.length >= this.arrSortByPrice.length) {
                        return this.arrSortByPrice.filter((item) => regexp.test(item.name));
                    }
                    return this.arrSortBySize.filter((item) => regexp.test(item.name));
                } else if (this.arrSortBySize.length) {
                    return this.arrSortBySize.filter((item) => regexp.test(item.name));
                } else if (this.arrSortByPrice.length) {
                    return this.arrSortByPrice.filter((item) => regexp.test(item.name));
                }
                let arr = [];
                arr = this.items.filter((item) => regexp.test(item.name));
                return arr;
            }
        },
        pageCount() {
            let l = this.items.length,
                s = this.quantityItemOnPage;
            return Math.floor(l / s);
        }
        ,
        paginatedData() {
            const start = this.pageNumber * this.quantityItemOnPage,
                end = start + this.quantityItemOnPage;

            if (this.query) {
                let arr = [this.filteredItems.length, this.arrSortBySize.length, this.arrSortByPrice.length];
                arr = arr.filter((length) => length > 0);
                let a = Math.min(...arr);

                let array = [this.filteredItems, this.arrSortBySize, this.arrSortByPrice];
                arr = array.filter((arr) => arr.length === a);
                return arr[0].slice(start, end);
            }

            if (this.arrSortBySize.length && this.arrSortByPrice.length) {
                if (this.arrSortBySize.length >= this.arrSortByPrice.length) {
                    return this.arrSortByPrice.slice(start, end);
                }
                return this.arrSortBySize.slice(start, end);
            } else if (this.arrSortBySize.length) {
                return this.arrSortBySize.slice(start, end);
            } else if (this.arrSortByPrice.length) {
                return this.arrSortByPrice.slice(start, end);
            } else if (this.query) {
                return this.filteredItems.slice(start, end);
            } else {
                return this.items.slice(start, end);
            }
        }
    },
    mounted() {//когда компонент монтируется в дом
        const params = window.location.pathname.replace("/", "");
        if (params === "product.html") {
            this.category = "all";
        }

        const paramsGender = window.location.search.replace("?", "").split("=");
        if (paramsGender[1]) {
            this.category = paramsGender[1];
        }

        fetch(`${API_URL}/items/${this.category}`)
            .then((response) => response.json())
            .then((items) => {
                this.items = items;

                let prise = [];
                this.items.forEach((item) => prise.push(+item.price));
                this.maxPrice = Math.max(...prise);
            });


    },
    template: `
        <div class="mini-container">
           <div class="forms-right">
               <div class="trending-now">
                   <p class="text">Trending now</p>
                   <div class="trending-now-text">
                       <a href="#" class="trending-now-link">Bohemian <span class="trending-span">|</span></a>
                       <a href="#" class="trending-now-link">Floral <span class="trending-span">|</span></a>
                       <a href="#" class="trending-now-link">Lace</a>
                       <a href="#" class="trending-now-link">Floral <span class="trending-span">|</span></a>
                       <a href="#" class="trending-now-link">Lace <span class="trending-span">|</span></a>
                       <a href="#" class="trending-now-link">Bohemian</a>
                   </div>
               </div>
               <div class="checkbox-size">
                   <p class="text">Size</p>
                   <div class="checkbox-box">
                       <input id="XS" type="checkbox" v-model="checkedSize" value="XS">
                       <label class="text-checkbox" for="XS">XS</label>
                       <input id="S" type="checkbox" v-model="checkedSize" value="S">
                       <label class="text-checkbox" for="S">S</label>
                       <input id="M" type="checkbox" v-model="checkedSize" value="M">
                       <label class="text-checkbox" for="M">M</label>
                       <input id="L" type="checkbox" v-model="checkedSize" value="L">
                       <label class="text-checkbox" for="L">L</label>
                       <input id="XL" type="checkbox" v-model="checkedSize" value="XL">
                       <label class="text-checkbox" for="XL">XL</label>
                   </div>
               </div>
               <div class="range-price">
                   <label class="text">pRICE</label>
                   <input type="range" v-model.number="price" step="10" min="0" :max="maxPrice">
                   <p class="text-drop-list-filter">\$0 -\${{price}}</p>
               </div>
           </div>
           
           <div class="buttons">
               <div class="sort-by">
                   <p class="buttons-text">Sort By</p>
                   <p class="buttons-text">
                   <a href="#" class="text-drop-list-filter" @click.prevent="sortItems('name')">Name</a></p>
                   <p class="buttons-text">
                   <a href="#" class="text-drop-list-filter" @click.prevent="sortItems('lowPrice')">Low price</a></p>
               </div>
               <div class="show">
                   <p class="buttons-text">Show</p>
                   <p class="buttons-text">
                       <a href="#" class="text-drop-list-filter" @click.prevent="handleQuantityItemOnPageClick(9)">9</a>
                   </p>
                   <p class="buttons-text">
                       <a href="#" class="text-drop-list-filter" @click.prevent="handleQuantityItemOnPageClick(12)">12</a>
                   </p>
               </div>
           </div>
        
            <div class="fetured-items-box">
                <product-item class = "itemAll" @onbuy="handleBuyClick" v-for="entry in paginatedData" :item="entry" :key="entry.id"></product-item>
            </div>
            <div class="more-product">
                <div class="pagination">
                    <a href="#" class="button-all button-all_pagination" :disabled="pageNumber === 0" @click.prevent="prevPage">Previous</a>
                    <a href="#" class="button-all button-all_pagination" :disabled="pageNumber >= pageCount - 1" @click.prevent="nextPage">Next</a>
                </div>
                <div class="button-more-product"><a href="product.html" class="button-all">View All</a></div>
            </div>
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
             <input class="input-form" type="text" placeholder="Search for Item..." v-model="searchQuery"><button class="button-form" @click.prevent="handleSearchClick"><i
                     class="fas fa-search"></i></button>
         </div>`
});

Vue.component("cart-item", {
    props: ["item"],
    data() {
        return {
            url: "single-page.html?id=" + this.item.id
        }
    },
    template: `
            <div class="row row-product">
                <div class="col col-1 row_first">
                    <figure class="col-1__product">
                        <a :href="url"><img :src="item.image" alt="item" class="cart-item-img"></a>
                        <figcaption class="col-1__text">
                            <a :href="url" class="shopping-cart-product-text">{{item.name}}</a>
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
    data() {
        return {
            url: "single-page.html?id=" + this.item.id
        }
    },
    template: `
        <figure class="cart-product">
            <a :href="url" class="img-cart-product"><img :src="item.image" alt="product" class="image-mini-cart"></a>
            <figcaption class="text-cart-drop">
                <a :href="url" class="text-cart-drop-box">{{item.name}}</a>
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
            <h3 class="text-material-designer">Name: <span class="bold-text">{{item.name}}</span></h3>
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


Vue.component("feedback-item", {
    props: ["item"],
    template: `
        <div class="feedback">
            <h3 class="bold-text">{{item.name}}</h3>
            <div class="feedback-text">
                <p class="text-material-designer text-material-designer_margin">{{item.data}}</p>
                <p class="text-details text-details__feedback">{{item.message}}</p>
            </div>
         </div>`
    ,
});


Vue.component("feedback", {
    props: ["id"],
    data() {
        return {
            feedback: [],
            feedbackForApproval: [],

            name: "",
            mail: "",
            message: "",
            submit: ""
        }
    },
    computed: {
        userId() {
            if (this.id) {
                return this.id
            }
        }
    },
    mounted() {
        fetch(`${API_URL}/feedback`)
            .then((response) => response.json())
            .then((items) => {
                this.feedback = items;
            });

        fetch(`${API_URL}/approval`)
            .then((response) => response.json())
            .then((items) => {
                this.feedbackForApproval = items;
            });
    },
    methods: {
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
                    this.feedback.push(this.feedbackForApproval.find((feedbackItem) => feedbackItem.id === item.id));
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
        }
    },
    template: `
        <div class="feedback-block">
            <div class="feedback-new">
                <div>
                    <h2 class="shopping-cart-forms-text">Send Us Your Feedback</h2>
                    <input class="shopping-cart-forms-input shopping-cart-forms-input_width"
                           placeholder="Name" type="text" v-model="name" required data-validation-rule="name">
                    <input class="shopping-cart-forms-input shopping-cart-forms-input_width"
                           placeholder="Example@gmail.com" type="email" required v-model="mail">
                    <textarea class="shopping-cart-forms-input textarea_size" placeholder="You message"
                              v-model="message"></textarea>
                    <div class="modal-button">
                        <a href="#" class="button-black shopping-cart-forms-button_size modal_size"
                           @click.prevent="sendFeedback">Submit</a>
                        <p v-if="submit.length" class="sent"><i class="far fa-check-circle"></i></p>
                    </div>
                </div>
            </div>

            <div class="container">
                <h2 class="name-product name-product_margin">Feedback</h2>
                <feedback-item v-for="entry in feedback" :item="entry" :key="entry.id" ></feedback-item>
            </div>

            <div v-if="userId > 0" class="feedback-approval">
                <div class="container">
                    <h2 class="shopping-cart-forms-text shopping-cart-forms-text_padding">Feedback for approval</h2>
                    <div class="feedback-list">
                        <feedback-item-app @ondelete="deleteApproval" @approval="revocationApproval" v-for="entry in feedbackForApproval" :item="entry" :key="entry.id" ></feedback-item-app>
                    </div>
                </div>
            </div>
        </div>`
});

Vue.component("item", {
    data() {
        return {
            item: {},
            randomItems: [],
            quantityItem: 1,
            color: "",
            size: "",
            id: null
        };
    },
    mounted() {//когда компонент монтируется в дом
        const params = window.location.search.replace("?", "").split("=");
        this.id = +params[1];

        fetch(`${API_URL}/single-page.html/${this.id}`)
            .then((response) => response.json())
            .then((items) => {
                this.item = items.product;
                this.randomItems = items.randomItems;
            });
    },
    methods: {
        handleBuyClick(item) {
            this.$emit("onbuy", item, this.quantityItem, this.color, this.size);
        }
    },
    template: `
        <div><section class="single-product-box">
            <div class="single-product">
                <img class="img-product" :src="item.image" alt="product">
            </div>

            <div class="box-details-single-product">
                <div class="container details-single-product">
                    <div class="container-single-product">
                        <p class="text-collection">{{item.category}}</p>
                        <h3 class="name-product">{{item.name}}</h3>
                        <p class="text-details">Compellingly actualize fully researched processes before proactive
                            outsourcing.
                            Progressively syndicate collaborative architectures before cutting-edge services. Completely
                            visualize parallel core competencies rather than exceptional portals.
                        </p>
                        <div class="material-designer">
                            <p class="text-material-designer">MATERIAL: <span class="bold-text">COTTON</span></p>
                            <p class="text-material-designer">DESIGNER: <span class="bold-text">BINBURHAN</span></p>
                        </div>
                        <p class="price">$<span>{{item.price}}</span></p>
                        <hr class="hr">
                        <div class="choose">
                            <div class="choose-box">
                                <h4 class="choose-title">CHOOSE COLOR</h4>
                                <select v-model="color" class="text-choose" name="color" id="color">
                                    <option>Red</option>
                                    <option>Green</option>
                                </select>
                            </div>
                            <div class="choose-box">
                                <h4 class="choose-title">CHOOSE SIZE</h4>
                                <select v-model="size" class="text-choose" name="size" id="size">
                                    <option>XXS</option>
                                    <option>XS</option>
                                </select>
                            </div>
                            <div class="choose-box">
                                <h4 class="choose-title">QUANTITY</h4>
                                <input v-model.number="quantityItem" class="input-field" type="number" min="1" value="1">
                            </div>
                        </div>
                        <div class="box-button-add">
                            <a href="#" class="button-add" @click.prevent="handleBuyClick(item)"><img class="img-cart-pink" src="img/cart-pink.svg"
                                                                alt="cart">Add to&nbsp;Cart</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="like-also-box">
            <h2 class="text-like-also">you may like also</h2>
            <div class="like-also container">
                <product-item @onbuy="handleBuyClick" v-for="entry in randomItems" :item="entry" :key="entry.id"></product-item>
            </div>
        </section></div>`
});


const app = new Vue({
    el: "#app",
    data: {
        filterValue: "",
        cart: [],

        userId: 0,
        check: "",

        modal: "",
        sign: "signIn",
        email: "",
        login: "",
        password: "",
        checkLogin: "",
        checkPassword: "",
        sent: "",

        modalAcc: "",
        currentPassword: "",
        newPassword: "",
        changePass: "",
        errors: [],
    },
    watch: {
        userId(newUserId) {
            localStorage.userId = newUserId;
            localStorage.check = this.check;

            this.cart = [];
            fetch(`${API_URL}/cart/${localStorage.userId}`)
                .then((response) => response.json())
                .then((items) => {
                    this.cart = items;
                });
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
    mounted() {
        if (localStorage.check) {
            this.check = localStorage.check;
        }
        if (localStorage.userId) {
            this.userId = +localStorage.userId;
        }

        fetch(`${API_URL}/cart/${localStorage.userId}`)
            .then((response) => response.json())
            .then((items) => {
                this.cart = items;
            });

    },
    methods: {
        handleSearchClick(query) {
            this.filterValue = query;
        },
        handleBuyClick(item, quantityItem = 1, color = "Black", size = "S") {
            if(this.userId === 0){
                this.modal = "modal";
                return;
            }

            const cartItem = this.cart.find((entry) => entry.id === item.id);
            if (cartItem) {
                fetch(`${API_URL}/cart/${item.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({quantity: cartItem.quantity + quantityItem})
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
                    body: JSON.stringify({
                        ...item,
                        quantity: quantityItem,
                        color: color,
                        size: size,
                        userId: +localStorage.userId
                    })
                })
                    .then((response) => response.json())
                    .then((item) => {
                        this.cart.push(item);
                    })
            }
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
        handleSignClick(button) {
            if (button === 'signIn') {
                this.sign = 'signIn';
            }
            if (button === 'signUp') {
                this.sign = 'signUp';
            }
        },
        sendUser() {
            const validation = {
                name: /^[a-z]+$/iu,
                email: /.+@.+\..+/i
            };
            this.errors = [];

            if (!validation["name"].test(this.login)) {
                this.errors.push("Name required")
            }
            if (!validation["email"].test(this.email)) {
                this.errors.push("Valid email required")
            }

            if (!this.errors.length) {
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
                        this.userId = +message.id;
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
                    userId: +localStorage.userId
                })
            })
                .then((response) => response.json())
                .then((message) => {
                    this.changePass = message[0];
                })
        }
    }
});
