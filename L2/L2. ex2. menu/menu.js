function Container(id, className, tagName) {
    //public
    this.id = id;
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

//метод, который записывается в прототип Container, для всех объектов класса будет одинаковый и записан в __proto__ объекта
Container.prototype.render = function () {
    var element = this.getElement();

    if (!element) {
        element = document.createElement(this._tagName);
        element.id = this.id;
        element.className = this.className;

        this.setElement(element);
    }

    return element;
};


function Menu(id, className, items) {
    //наследование конструктора, отрабатывает вся функция Container
    Container.call(this, id, className, "ul");

    //protected
    this._items = items;
}

//наследование прототипа
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

function MenuItem(className, link, title) {
    Container.call(this, "", className, "li");

    this.link = link;
    this.title = title;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    var a = document.createElement("a");
    a.textContent = this.title;
    a.href = this.link;

    container.appendChild(a);

    return container;
};

function Submenu(id, className, items, link, title) {
    MenuItem.call(this, "item", link, title);
    Menu.call(this, id, className, items);
}

Submenu.prototype = Object.create(Menu.prototype);
Submenu.prototype.render = function () {
    if (this.link && this.title) {
        var menuItem = new MenuItem("item", this.link, this.title).render();
        var menu = Menu.prototype.render.call(this);
        menuItem.appendChild(menu);

        return menuItem;
    } else {
        return Menu.prototype.render.call(this);
    }
};


//создаем пункты меню


var menuItem2 = new MenuItem("menu-item", "#", "Sale");
var menuItem3 = new MenuItem("menu-item", "#", "New in");

var menuItem4 = new MenuItem("menu-item", "#", "Dresses");
var menuItem5 = new MenuItem("menu-item", "#", "Coats & Jackets");
var menuItem6 = new MenuItem("menu-item", "#", "Jeans");
var menuItem7 = new MenuItem("menu-item", "#", "Hoodies & Sweatshirts");
var menu1 = new Submenu("submenu", "submenu inside", [menuItem4, menuItem5, menuItem6, menuItem7], "#", "Clothing");

var menuItem8 = new MenuItem("menu-item", "#", "Shoes");
var menuItem9 = new MenuItem("menu-item", "#", "Accessories");
var menu2 = new Submenu("submenu", "submenu", [menuItem2, menuItem3, menu1, menuItem8, menuItem9], "#", "Women");

var menuItem10 = new MenuItem("menu-item", "#", "Sale");
var menuItem11 = new MenuItem("menu-item", "#", "New in");

var menuItem12 = new MenuItem("menu-item", "#", "Coats & Jackets");
var menuItem13 = new MenuItem("menu-item", "#", "Jeans");
var menuItem14 = new MenuItem("menu-item", "#", "Hoodies & Sweatshirts");
var menu3 = new Submenu("submenu", "submenu inside", [menuItem12, menuItem13, menuItem14], "#", "Clothing");

var menuItem15 = new MenuItem("menu-item", "#", "Shoes");
var menuItem16 = new MenuItem("menu-item", "#", "Accessories");
var menu4 = new Submenu("submenu", "submenu", [menuItem10, menuItem11, menu3, menuItem15, menuItem16], "#", "Men");

var menuItem1 = new MenuItem("menu-item", "#", "My account");

var menu = new Submenu("menu", "menu", [
    menu2,
    menu4,
    menuItem1,
]);

var $container = document.getElementsByClassName("container");
$container[0].appendChild(menu.render());




