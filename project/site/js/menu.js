function Container(className, tagName) {
    this.className = className;

    this._tagName = tagName;

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

    this._items = items;
}

//наследование прототипа
Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    this._items.forEach(function (item) {
        if (item instanceof Container) {
            container.appendChild(item.render());
        }
    });

    return container;
};

function MenuItem(link, title) {
    Container.call(this, "", "li");

    this.link = link;
    this.title = title;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    var $a = document.createElement("a");
    $a.classList.add("drop-link");
    $a.textContent = this.title;
    $a.href = this.link;

    container.appendChild($a);

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

function MenuItemH(className, link, title, tagName) {
    Container.call(this, className, tagName);

    this.link = link;
    this.title = title;
}

MenuItemH.prototype = Object.create(Container.prototype);
MenuItemH.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    container.textContent = this.title;
    return container;
};

function MenuItemImg(className, link, title, tagName) {
    Container.call(this, className, tagName);

    this.link = link;
    this.title = title;
}

MenuItemImg.prototype = Object.create(Container.prototype);
MenuItemImg.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    var $a = document.createElement("a");
    $a.classList.add("text-img-drop-flex");
    $a.textContent = this.title;
    $a.href = this.link;

    container.appendChild($a);

    return container;
};

var xhr = new XMLHttpRequest();

xhr.open("GET", "http://127.0.0.1:8080/project/site/json/menu.json");
xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var info = JSON.parse(xhr.responseText);

        var itemWomen = [];
        var itemMen = [];

        info.forEach(function (info) {
            if (info.ulClass === "browse-drop-menu") {
                if (info.block === "Women") {
                    itemWomen.push(new MenuItem("#", info.title));
                } else if (info.block === "Men") {
                    itemMen.push(new MenuItem("#", info.title));
                }
            }
        });


        var menuWomen = new Menu("browse-drop-menu", itemWomen, "ul");
        var menuMen = new Menu("browse-drop-menu", itemMen, "ul");

        var $divBrowse = document.getElementsByClassName("browse-drop-flex");
        $divBrowse[0].appendChild(menuWomen.render());
        $divBrowse[1].appendChild(menuMen.render());

        var $div = document.getElementsByClassName("drop-box");
        for (var i = 0; i < $div.length; i++) {
            var itemWomen1 = [];
            var itemWomen2 = [];
            var itemWomen3 = [];
            var itemWomen4 = [];

            info.forEach(function (info) {
                if (info.ulClass === "drop-menu") {
                    if (info.block === "Women1") {
                        itemWomen1.push(new MenuItem("#", info.title));
                    } else if (info.block === "Women2") {
                        itemWomen2.push(new MenuItem("#", info.title));
                    } else if (info.block === "Women3") {
                        itemWomen3.push(new MenuItem("#", info.title));
                    } else if (info.block === "Women4") {
                        itemWomen4.push(new MenuItem("#", info.title));
                    }
                }
            });

            var menuWomen1 = new Menu("drop-menu", itemWomen1, "ul");
            var menuWomen2 = new Menu("drop-menu_padding", itemWomen2, "ul");
            var menuWomen3 = new Menu("drop-menu", itemWomen3, "ul");
            var menuWomen4 = new Menu("drop-menu", itemWomen4, "ul");

            var h1 = new MenuItemH("drop-heading", "#", "Women", "h3");
            var h2 = new MenuItemH("drop-heading", "#", "Women", "h3");
            var h3 = new MenuItemH("drop-heading", "#", "Women", "h3");
            var h4 = new MenuItemH("drop-heading", "#", "Women", "h3");

            var img = new MenuItemImg("img-drop-flex", "#", "Super sale!", "div");

            var dropFlex1 = new Submenu("drop-flex", [h1, menuWomen1], "div");
            var dropFlex2 = new Submenu("drop-flex", [h2, menuWomen2, h3, menuWomen3], "div");
            var dropFlex3 = new Submenu("drop-flex", [h4, menuWomen4, img], "div");

            $div[i].appendChild(dropFlex1.render());
            $div[i].appendChild(dropFlex2.render());
            $div[i].appendChild(dropFlex3.render());
        }
    }
};









