const goods = [
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

const renderItem = ({name, price, image}) =>
    `<div class="item">
            <div class="fetured-item1">
                <a href="#" class="fetured-item">
                   <img src="${image}" alt="fetured-items">
                       <div class="item-text">
                           <p class="name-item">${name}</p>
                           <p class="pink-item">$${price}</p>
                       </div>
                </a>
            </div>
        </div>`;

const renderList = items => {
    const itemsHtmls = items.map(renderItem);
    itemsHtmls.forEach(function (item) {
        document.querySelector('.fetured-items-box').innerHTML += item;
    });
};
renderList(goods);

