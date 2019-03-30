function sendRequst(url, method, data) {
    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

const API_URL = "http://localhost:3000";

class Item {
    constructor(id, name, price, image, color, size) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.color = color;
        this.size = size;
    }

    render() {
        return `<div class="item">
                    <div class="fetured-item1">
                        <a href="#" class="fetured-item">
                           <img src="${this.image}" alt="fetured-items">
                           <div class="item-text">
                               <p class="name-item">${this.name}</p>
                               <p class="pink-item">$${this.price}</p>
                           </div>
                        </a>
                    </div>
                    <div class="add">
                        <a href="#" class="add-to-card" data-id="${this.id}" data-name="${this.name}" data-price="${this.price}" data-image="${this.image}" data-color="${this.color}" data-size="${this.size}">
                        <img class="cart-white" src="img/cart-white.svg" alt="cart">Add to Cart</a>
                    </div>
                </div>`;
    }
}

class ItemsList {
    constructor() {
        this.items = [];
    }

    fetchItems() {
        return fetch(`${API_URL}/items`)
            .then((response) => response.json())
            .then((items) => {
                this.items = items.map(item => new Item(item.id, item.name, item.price, item.image, item.color, item.size));
                this.filteredItems = this.items;
            });
    }

    calculateSum() {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    }

    filterItems(query) {
        const regexp = new RegExp(query, "i");
        this.filteredItems = this.items.filter((item) => regexp.test(item.name))
    }

    render() {
        const itemsHtmls = this.filteredItems.map(item => item.render());
        return itemsHtmls.join("");
    }
}


class Cart {
    constructor(id, name, price, image, quantity, color, size) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
        this.color = color;
        this.size = size;
    }

    render() {
        return `<div class= "row row-product">
                    <div class="col col-1 row_first">
                        <figure class="col-1__product">
                            <a href="#"><img src="${this.image}" alt="item" class="cart-item-img"></a>
                            <figcaption class="col-1__text">
                            <a href="#" class="shopping-cart-product-text">${this.name}</a>
                            <p class="shopping-cart-product-text-bottom">
                                <span class="bold">Color: </span>
                                <span>${this.color}</span></p>
                            <p class="shopping-cart-product-text-bottom">
                                <span class="bold">Size: </span>
                                <span>${this.size}</span></p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="col col-2">$${this.price}</div>
                    <div class="col col-3"><input class="input" type="number" min="1" value="${this.quantity}"></div>
                    <div class="col col-4">FREE</div>
                    <div class="col col-5">$${this.price * this.quantity}</div>
                    <div class="col col-6 row-header__last row-header__last_center">
                        <a href="#" class="delete-cart-item" data-id="${this.id}" data-quantity="${this.quantity}">
                        <i class="fas fa-times-circle"></i></a></div>
                  </div>`;
    }
}

class ItemsCart {
    constructor() {
        this.itemsCart = [];
    }

    fetchCartItems() {
        return fetch(`${API_URL}/cart`)
            .then((response) => response.json())
            .then((items) => {
                this.itemsCart = items.map(item => new Cart(item.id, item.name, item.price, item.image, item.quantity, item.color, item.size));
            });
    }

    calculateSum() {
        return this.itemsCart.reduce((acc, item) => acc + item.price, 0);
    }

    render() {
        const itemsHtmls = this.itemsCart.map(item => item.render());
        return itemsHtmls.join("");
    }

    deleteItem(data) {
        if (+data.quantity === 1) {
            fetch(`${API_URL}/cart/${+data.id}`, {method: "DELETE"}).then((response) => response.json())
        } else {
            const newQuantity = +data.quantity - 1;
            sendRequst(`${API_URL}/cart/${+data.id}`, "PATCH", {quantity: newQuantity});
        }
    }

    addItem(data) {
        return fetch(`${API_URL}/cart`)
            .then((response) => response.json())
            .then((items) => {
                if (!items.length) {
                    data.quantity = 1;
                    sendRequst(`${API_URL}/cart`, "POST", data);
                } else {
                    items.forEach((item, i) => {
                        if (+item.id === +data.id) {
                            sendRequst(`${API_URL}/cart/${+data.id}`, "PATCH", {"quantity": +item.quantity + 1});
                        }

                        if (i === items.length - 1) {
                            data.quantity = 1;
                            sendRequst(`${API_URL}/cart`, "POST", data);
                        }
                    })
                }
            })
    }
}

const items = new ItemsList();
items.fetchItems().then(() => {
        document.querySelector(".fetured-items-box").innerHTML = items.render();
    }
);

const cartItems = new ItemsCart();
cartItems.fetchCartItems().then(() => {
        document.querySelector(".cart").innerHTML = cartItems.render();
    }
);

//добавление товара в корзину
document.querySelector(".fetured-items-box").addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName !== "A") return;
    const data = event.target.dataset;
    cartItems.addItem(data).then(() => {
        cartItems.fetchCartItems().then(() => {
                document.querySelector(".cart").innerHTML = cartItems.render();
            }
        );
    });
});

//удаление товара из корзины
document.querySelector(".cart").addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.parentNode.tagName !== "A") return;
    const data = event.target.parentNode.dataset;
    cartItems.deleteItem(data);
    cartItems.fetchCartItems().then(() => {
            document.querySelector(".cart").innerHTML = cartItems.render();
        }
    );
});

//поиск товара по имени
const $searchText = document.querySelector(".input-form");
const $searchButton = document.querySelector(".button-form");
const $namesList = document.querySelector(".names-list");

let namesItems = [];
fetch(`${API_URL}/items`)
    .then((response) => response.json())
    .then((items) => {
        items.map(item => namesItems.push(item.name))
    })
    .then(() => buildList());


function buildList() {
    document.querySelector(".input-list").innerHTML = "";

    let filteredNames = namesItems.slice();
    if($searchText.value){
        filteredNames = filteredNames.filter((name)=>{
            const reqExp = new RegExp("^" + $searchText.value, "ig");
            return reqExp.test(name)
        })
    }

    const list = filteredNames.map(name => `<li class="input-link">${name}</li>`);
    document.querySelector(".input-list").innerHTML = list.join("");
}

$searchText.addEventListener("focus", () => {
    $namesList.style.display = "block";
});

$searchText.addEventListener("input", () => {
    buildList();
});

$searchText.addEventListener("focusout", () => {
    setTimeout(()=>{$namesList.style.display = "none"}, 500);
});

$namesList.addEventListener("click", (event) => {
    if (event.target.tagName !== "LI") return;
    $searchText.value = event.target.textContent;
});

$searchButton.addEventListener("click", () => {
    items.filterItems($searchText.value);
    document.querySelector(".fetured-items-box").innerHTML = items.render();
});







