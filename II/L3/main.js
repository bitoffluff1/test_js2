function sendRequst(url) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                resolve(JSON.parse(xhr.responseText));
            }
        }
    });

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
        return new Promise((resolve) => {
            resolve(sendRequst(`${API_URL}/items`).then(
                (items) => {
                    this.items = items.map(item => new Item(item.id, item.name, item.price, item.image, item.color, item.size));
                }
            ));
        });
    }

    calculateSum() {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    }

    render() {
        const itemsHtmls = this.items.map(item => item.render());
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
        return new Promise((resolve) => {
            resolve(sendRequst(`${API_URL}/cart`).then(
                (items) => {
                    this.itemsCart = items.map(item => new Cart(item.id, item.name, item.price, item.image, item.quantity, item.color, item.size));
                }
            ));
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
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", `${API_URL}/cart/${+data.id}`, true);
            xhr.send();
        } else {
            sendRequst(`${API_URL}/cart`).then(
                (items) => {
                    items.forEach((item) => {
                        if (+item.id === +data.id) {
                            const xhr = new XMLHttpRequest();
                            xhr.open("PATCH", `${API_URL}/cart/${+data.id}`, true);
                            xhr.setRequestHeader("Content-Type", "application/json");

                            xhr.onreadystatechange = () => {
                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                    JSON.parse(xhr.responseText);
                                }
                            };

                            const newItem = JSON.stringify({"quantity": +item.quantity - 1});
                            xhr.send(newItem);
                        }
                    });
                }
            );
        }
    }

    addItem(data) {
        sendRequst(`${API_URL}/cart`).then(
            (items) => {
                if (!items.length) {
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", `${API_URL}/cart`, true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            JSON.parse(xhr.responseText);
                        }
                    };

                    data.quantity = 1;
                    const newItem = JSON.stringify(data);
                    xhr.send(newItem);
                } else {
                    items.forEach((item, i) => {
                        if (+item.id === +data.id) {
                            const xhr = new XMLHttpRequest();
                            xhr.open("PATCH", `${API_URL}/cart/${+data.id}`, true);
                            xhr.setRequestHeader("Content-Type", "application/json");

                            xhr.onreadystatechange = () => {
                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                    JSON.parse(xhr.responseText);
                                }
                            };

                            const newItem = JSON.stringify({"quantity": +item.quantity + 1});
                            xhr.send(newItem);
                        }

                        if (i === items.length - 1) {
                            const xhr = new XMLHttpRequest();
                            xhr.open("POST", `${API_URL}/cart`, true);
                            xhr.setRequestHeader("Content-Type", "application/json");

                            xhr.onreadystatechange = () => {
                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                    JSON.parse(xhr.responseText);
                                }
                            };

                            data.quantity = 1;
                            const newItem = JSON.stringify(data);
                            xhr.send(newItem);
                        }
                    })
                }
            }
        )
    }
}


const items = new ItemsList();
items.fetchItems().then(
    () => {
        document.querySelector(".fetured-items-box").innerHTML = items.render();
    }
);

const cartItems = new ItemsCart();
cartItems.fetchCartItems().then(
    () => {
        document.querySelector(".cart").innerHTML = cartItems.render();
    }
);

const $buttonAdd = document.querySelector(".fetured-items-box");
$buttonAdd.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.tagName !== "A") return;
    const data = event.target.dataset;
    cartItems.addItem(data);
});

const $buttonDelete = document.querySelector(".cart");
$buttonDelete.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.parentNode.tagName !== "A") return;
    const data = event.target.parentNode.dataset;
    cartItems.deleteItem(data);
});












