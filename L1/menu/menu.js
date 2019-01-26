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

Container.prototype.remove = function () {
    var element = this.getElement();

    if (element) {
        element.parentElement.removeChild(element);
        this.setElement(null);
    }
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
var menuItem1 = new MenuItem("menu-item", "#", "Home");

var menuItem2 = new MenuItem("menu-item", "/news/month/january", "January");
var menuItem3 = new MenuItem("menu-item", "/news/month/february", "February");
var menu1 = new Submenu("menu", "menu active", [menuItem2, menuItem3], "/news/month", "Month");

var menuItem4 = new MenuItem("menu-item", "/news/year/2019", "2019");
var menuItem5 = new MenuItem("menu-item", "/news/year2018", "2018");
var menu2 = new Submenu("menu", "menu active", [menuItem4, menuItem5], "/news/year", "Year");

var menu3 = new Submenu("menu", "menu active", [menu1, menu2], "/news", "News");

var menuItem6 = new MenuItem("menu-item", "/blog/aboutMe", "About me");
var menuItem7 = new MenuItem("menu-item", "/blog/aboutMyWork", "About my work");
var menu4 = new Submenu("menu", "menu active", [menuItem6, menuItem7], "/blog", "Blog");


var menu = new Submenu("menu", "menu", [
    menuItem1,
    menu3,
    menu4
]);

document.body.appendChild(menu.render());


document.getElementById("remove").addEventListener("click", () => {
    menuItem1.remove()
});



