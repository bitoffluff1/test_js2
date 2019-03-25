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
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
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
                    this.items = items.map(item => new Item(item.name, item.price, item.image));
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
    constructor(name, price, image, quantity, color, size) {
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
                        <a href="#" class="delete-cart-item"><i class="fas fa-times-circle"></i></a></div>
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
                    this.itemsCart = items.map(item => new Cart(item.name, item.price, item.image, item.quantity, item.color, item.size));
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

    deleteItem() {

    }

    addItem() {

    }

}


const items = new ItemsList();
items.fetchItems().then(
    () => {
        document.querySelector('.fetured-items-box').innerHTML = items.render();
    }
);

const cartItems = new ItemsCart();
cartItems.fetchCartItems().then(
    () => {
        document.querySelector('.cart').innerHTML = cartItems.render();
    }
);








