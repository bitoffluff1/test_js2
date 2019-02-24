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

function MenuItemProducts(className, title, tagName, link, dataset, id) {
    Container.call(this, className, tagName);

    this.title = title;
    this.link = link;
    this.dataset = dataset;
    this.id = id;

}

MenuItemProducts.prototype = Object.create(Container.prototype);
MenuItemProducts.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    if (typeof this.title === "number") {
        container.textContent = "$" + this.title + ".00";
    } else {
        container.textContent = this.title;
    }

    if (this.link) {
        container.href = this.link;
    }
    if (this.dataset) {
        container.dataset.image = this.dataset.image;
        container.dataset.name = this.dataset.name;
        container.dataset.price = this.dataset.price;
        container.dataset.category = this.dataset.category;
        container.dataset.id = this.dataset.id;
        container.dataset.quantity = this.dataset.quantity;
    }
    if (this.id) {
        container.id = this.id;
    }

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

function sendRequst(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            callback(JSON.parse(xhr.responseText));
        }
    }
}

function buildCart() {
    var $container = document.getElementsByClassName("cart")[0];
    $container.textContent = "";

    sendRequst("http://localhost:3000/cart", function (items) {
        var sum = 0;

        items.forEach(function (item) {
            var span1 = new MenuItemProducts("bold", "Color: ", "span");
            var p1 = new Submenu("shopping-cart-product-text-bottom", [span1], "p", "Red");
            var span2 = new MenuItemProducts("bold", "Size: ", "span");
            var p2 = new Submenu("shopping-cart-product-text-bottom", [span2], "p", "XLL");
            var a = new MenuItemProducts("shopping-cart-product-text", "Mango People T-shirt", "a", "single-page.html");
            var figcaption = new Submenu("col-1__text", [a, p1, p2], "figcaption");

            var img2 = new MenuItemImg("cart-item-img", item.image, "item img");
            var a2 = new Submenu("", [img2], "a");
            var figure = new Submenu("col-1__product", [a2, figcaption], "figure");
            var div1 = new Submenu("col col-1 row_first", [figure], "div");

            var div2 = new MenuItemProducts("col col-2", +item.price, "div");

            var input = new MenuItemProducts("input", "", "input");
            var div3 = new Submenu("col col-3", [input], "div");

            var div4 = new MenuItemProducts("col col-4", "FREE", "div");

            var subTotal = +item.price * +item.quantity;
            var div5 = new MenuItemProducts("col col-4", subTotal, "div");

            var i = new MenuItemProducts("fas fa-times-circle", "", "i", "", item, "cart-" + item.id);
            var div6 = new Submenu("col col-6 row-header__last row-header__last_center", [i], "div");

            var div = new Submenu("row row-product", [div1, div2, div3, div4, div5, div6], "div");

            $container.appendChild(div.render());

            sum += subTotal;
        });

        var $box = document.getElementsByClassName("proceed-to-checkout-text-bottom")[0];
        var $sum = $box.getElementsByClassName("pink")[0];
        $sum.textContent = "$" + sum;
    });
}


(function ($) {
    var $cart = $(".cart");

    buildCart();

    $cart.on("click", ".fa-times-circle", function () {

        var good = $(this).data();
        if (good.quantity > 1) {
            $.ajax({
                url: "http://localhost:3000/cart/" + good.id,
                type: "PATCH",
                dataType: "json",
                data: {quantity: +good.quantity - 1},
                success: function () {
                    buildCart();
                }
            })
        } else {
            $.ajax({
                url: "http://localhost:3000/cart/" + good.id,
                type: "DELETE",
                success: function () {
                    buildCart();
                }
            })
        }

    });

})(jQuery);