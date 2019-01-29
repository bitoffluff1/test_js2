function Container(className, tagName) {
    //public
    this.className = className;

    //protected
    this._tagName = tagName;

    //private
    var element;

    this.getElement = function () {
        return element;
    };

    this.setElement = function (newValue) {
        element = newValue;
    };

}

Container.prototype.render = function () {
    var element = this.getElement();

    if (!element) {
        element = document.createElement(this._tagName);
        element.className = this.className;

        this.setElement(element);
    }

    return element;
};

function Menu(className, items, tagName) {
    Container.call(this, className, tagName);

    //protected
    this._items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    this._items.forEach(function (item) { //проходим по массиву items
        if (item instanceof Container) { //проверяем item объект класса MenuItem или Container
            container.appendChild(item.render());
        }
    });

    return container;
};

function MenuItem(className, title, tagName) {
    Container.call(this, className, tagName);

    this.title = title;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    container.textContent = this.title;

    return container;
};

function MenuItemImg(className, link, alt) {
    Container.call(this, className, "img");

    this.link = link;
    this.alt = alt;

}

MenuItemImg.prototype = Object.create(Container.prototype);
MenuItemImg.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    container.alt = this.alt;
    container.src = this.link;

    return container;
};

function Submenu(className, items, tagName, title, link) {
    Menu.call(this, className, items, tagName);

    this.title = title;
    this.link = link;
}

Submenu.prototype = Object.create(Menu.prototype);
Submenu.prototype.render = function () {
    var container = Menu.prototype.render.call(this);

    if (this.title) {
        var $span = document.createElement("span");
        $span.textContent = this.title;
        container.appendChild($span);
    }

    container.href = this.link;

    return container;
};


var p1 = new MenuItem("name-item", "Mango People T-shirt", "p");
var p2 = new MenuItem("pink-item", "$52.00", "p");
var div1 = new Submenu("item-text", [p1, p2], "div");

var img1 = new MenuItemImg("", "img/product-1.jpg", "fetured-items");

var a1 = new Submenu("fetured-item", [img1, div1], "a", "", "#");
var div2 = new Submenu("fetured-item1", [a1], "div");


var img2 = new MenuItemImg("cart-white", "img/cart-white.svg", "cart");
var a2 = new Submenu("add-to-card", [img2], "a", "Add to Cart", "#");
var div3 = new Submenu("add", [a2], "div", "");


var div = new Submenu("item", [div2, div3], "div");


var $container = document.getElementsByClassName("fetured-items-box");
$container[0].appendChild(div.render());
