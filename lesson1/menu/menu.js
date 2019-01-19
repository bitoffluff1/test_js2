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
    this.remove();
};

function Menu(id, className, items) {
    //наследование конструктора, отрабаотывает вся функция Container
    Container.call(this, id, className, "ul");

    //protected
    this._items = items;
}

//наследование прототипа
Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    this._items.forEach(function (item) { //проходим по массиву items
        if (item instanceof MenuItem) { //проверяем item объект класса MenuItem или Container
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

//создаем пункты меню
var menuItem1 = new MenuItem("menu-item", "#", "Home");
var menuItem2 = new MenuItem("menu-item", "#", "News");
var menuItem3 = new MenuItem("menu-item", "#", "Blog");

var menu = new Menu("menu", "menu active", [menuItem1, menuItem2, menuItem3]);
document.body.appendChild(menu.render());

document.addEventListener("click", removeClick);

function removeClick(event) {
    var element = event.target.parentNode;

    Container.prototype.remove.call(element);
}



