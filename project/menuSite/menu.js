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

function Menu(className, items) {
    Container.call(this, className, "ul");

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

var xhr = new XMLHttpRequest();

xhr.open("GET", "http://127.0.0.1:8080/menuSite/menu.json");
xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var info = JSON.parse(xhr.responseText);

        var itemWomen = [];
        var itemMen = [];

        var itemWomen1 = [];
        var itemWomen2 = [];
        var itemWomen3 = [];
        var itemWomen4 = [];

        info.forEach(function (info) {
            if (info.ulClass === "browse-drop-menu") {
                if (info.block === "Women") {
                    itemWomen.push(new MenuItem("#", info.title));
                } else if (info.block === "Men") {
                    itemMen.push(new MenuItem("#", info.title));
                }
            }else if(info.ulClass === "drop-menu"){
                if (info.block === "Women1") {
                    itemWomen1.push(new MenuItem("#", info.title));
                } else if (info.block === "Women2") {
                    itemWomen2.push(new MenuItem("#", info.title));
                }else if (info.block === "Women3") {
                    itemWomen3.push(new MenuItem("#", info.title));
                }else if (info.block === "Women4") {
                    itemWomen4.push(new MenuItem("#", info.title));
                }
            }
        });

        var menuWomen = new Menu("browse-drop-menu", itemWomen);
        var menuMen = new Menu("browse-drop-menu", itemMen);

        var $divBrowse = document.getElementsByClassName("browse-drop-flex");
        $divBrowse[0].appendChild(menuWomen.render());
        $divBrowse[1].appendChild(menuMen.render());

        var menuWomen1 = new Menu("drop-menu", itemWomen1);
        var menuWomen2 = new Menu("drop-menu", itemWomen2);
        var menuWomen3 = new Menu("drop-menu", itemWomen3);
        var menuWomen4 = new Menu("drop-menu", itemWomen4);


        var $div = document.getElementsByClassName("drop-flex");
        var $br = document.querySelector("br");
        var $img = document.getElementsByClassName("img-drop-flex");
        $div[0].appendChild(menuWomen1.render());
        $div[1].insertBefore(menuWomen2.render(),$br);
        $div[1].appendChild(menuWomen3.render());
        $div[2].insertBefore(menuWomen4.render(), $img[0]);
    }
};









