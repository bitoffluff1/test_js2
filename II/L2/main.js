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
        this.goods = [
            {
                "image": "img/fetured-items1.jpg",
                "name": "Mango People T-shirt",
                "price": 52,
                "category": "featured",
                "id": 1
            },
            {
                "image": "img/fetured-items2.jpg",
                "name": "Mango People T-shirt",
                "price": 152,
                "category": "featured",
                "id": 2
            },
            {
                "image": "img/fetured-items3.jpg",
                "name": "Mango People T-shirt",
                "price": 42,
                "category": "featured",
                "id": 3
            },
            {
                "image": "img/fetured-items4.jpg",
                "name": "Mango People T-shirt",
                "price": 52,
                "category": "featured",
                "id": 4
            },
            {
                "image": "img/fetured-items5.jpg",
                "name": "Mango People T-shirt",
                "price": 50,
                "category": "featured",
                "id": 5
            },
            {
                "image": "img/fetured-items6.jpg",
                "name": "Mango People T-shirt",
                "price": 52,
                "category": "featured",
                "id": 6
            },
            {
                "image": "img/fetured-items7.jpg",
                "name": "Mango People T-shirt",
                "price": 102,
                "category": "featured",
                "id": 7
            },
            {
                "image": "img/fetured-items8.jpg",
                "name": "Mango People T-shirt",
                "price": 52,
                "category": "featured",
                "id": 8
            }
        ];

        this.items = this.goods.map(goods => new Item(goods.name, goods.price, goods.image));
    }

    calculateSum() {
        this._sum = 0;
        this.items.forEach(item => this._sum += item.price);
        return this._sum;

    }

    render() {
        const itemsHtmls = this.items.map(item => item.render());
        return itemsHtmls.join("");
    }
}

class Cart {
    constructor() {

    }

    render() {

    }
}

class ItemCart {
    constructor() {

    }

    calculateSum() {

    }

    deleteItem() {

    }

    addItem(){

    }

    render() {

    }
}


const items = new ItemsList();
items.fetchItems();
items.calculateSum();
document.querySelector('.fetured-items-box').innerHTML = items.render();





