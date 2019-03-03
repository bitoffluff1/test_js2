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

function MenuItemProducts(className, title, tagName, link) {
    Container.call(this, className, tagName);

    this.title = title;
    this.link = link;
}

MenuItemProducts.prototype = Object.create(Container.prototype);
MenuItemProducts.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    if (this.link) {
        container.href = this.link;
        container.textContent = this.title;
    } else if (typeof this.title === "number") {
        container.textContent = "$" + this.title + ".00";
    } else {
        container.textContent = this.title;
    }

    return container;
};

function MenuItemImg(className, link, alt, dataset) {
    Container.call(this, className, "img");

    this.link = link;
    this.alt = alt;
    this.dataset = dataset;
}

MenuItemImg.prototype = Object.create(Container.prototype);
MenuItemImg.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    container.alt = this.alt;
    container.src = this.link;
    if (this.dataset) {
        container.id = this.dataset.id;
    }

    return container;
};

function Submenu(className, items, tagName, title, link, dataset) {
    Menu.call(this, className, items, tagName);

    this.title = title;
    this.link = link;
    this.dataset = dataset;
}

Submenu.prototype = Object.create(Menu.prototype);
Submenu.prototype.render = function () {
    var container = Menu.prototype.render.call(this);

    if (this.title) {
        var $span = document.createElement("span");
        $span.textContent = this.title;
        container.appendChild($span);
    }
    if (this.dataset) {
        container.dataset.image = this.dataset.image;
        container.dataset.name = this.dataset.name;
        container.dataset.price = this.dataset.price;
        container.dataset.category = this.dataset.category;
        container.dataset.id = this.dataset.id;
    }
    container.href = this.link;

    return container;
};

function sendRequst(url, callback) {
    var xhr = new XMLHttpRequest();

    var shopParams = getShopParams();

    if (shopParams.category) {
        url += "?category=" + shopParams.category;
    } else {
        url += shopParams;
    }

    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            callback(JSON.parse(xhr.responseText));
        }
    }
}

sendRequst("http://localhost:3000/items", function (items) {
    items.forEach(function (item) {
        var p1 = new MenuItemProducts("name-item", item.name, "p");
        var p2 = new MenuItemProducts("pink-item", +item.price, "p");
        var div1 = new Submenu("item-text", [p1, p2], "div");

        var img1 = new MenuItemImg("", item.image, "fetured-items", item);

        var a1 = new Submenu("fetured-item", [img1, div1], "a", "", "single-page.html");
        var div2 = new Submenu("fetured-item1", [a1], "div");


        var img2 = new MenuItemImg("cart-white", "img/cart-white.svg", "cart");
        var a2 = new Submenu("add-to-card", [img2], "a", "Add to Cart", "");
        var div3 = new Submenu("add", [a2], "div", "", "", item);

        var div = new Submenu("item itemAll", [div2, div3], "div");

        var $container = document.getElementsByClassName("fetured-items-box");
        $container[0].appendChild(div.render());
    });
});


function buildPaginator() {
    $.ajax({
        url: "http://localhost:3000/items",
        dataType: "json",
        success: function (items) {
            //отпределяем какая страница товара сейчас открыта и задаем ей класс pink
            var params = window.location.search.replace("?", "").split("&");
            var objectParams = {};
            for (var i = 0; i < params.length; i++) {
                var value = params[i].split("=");
                objectParams[value[0]] = value[1];
            }
            var pageNum = objectParams._page;

            //создаем список страниц
            var page = Math.ceil(items.length / 9);
            for (var j = 0; j < page; j++) {
                var k = j + 1;
                var a = (+pageNum === k) ?
                    new MenuItemProducts("page pink", k, "a", "productAll.html?_page=" + k + "&_limit=9") :
                    new MenuItemProducts("page", k, "a", "productAll.html?_page=" + k + "&_limit=9");

                var li = new Submenu("page_none", [a], "li");

                $(".several-pages").append(li.render());
            }
        }
    });
}

function buildMiniCart() {
    var $container = document.getElementsByClassName("cart-drop-box")[0];
    $container.textContent = "";

    sendRequst("http://localhost:3000/cart", function (items) {
        var sum = 0;

        items.forEach(function (item) {
            var star1 = new MenuItemProducts("fas fa-star", "", "i");
            var star2 = new MenuItemProducts("fas fa-star", "", "i");
            var star3 = new MenuItemProducts("fas fa-star", "", "i");
            var star4 = new MenuItemProducts("fas fa-star-half-alt", "", "i");
            var div = new Submenu("block-star", [star1, star2, star3, star4], "div");

            var span = new MenuItemProducts("", item.quantity + " x ", "span");
            var p = new Submenu("price-cart", [span], "p", +item.price);

            var a1 = new MenuItemProducts("text-cart-drop-box", item.name, "a", "#");

            var figcaption = new Submenu("text-cart-drop", [a1, div, p], "figcaption");

            var img = new MenuItemImg("image-mini-cart", item.image, "item img", item);
            var a2 = new Submenu("img-cart-product", [img], "a", "", "#");

            var del = new MenuItemProducts("fas fa-times-circle fa-times-circle__cart", "", "i");

            var figure = new Submenu("cart-product", [a2, figcaption, del], "figure");

            var subTotal = +item.price * +item.quantity;
            sum += subTotal;

            $container.appendChild(figure.render());
        });

        var p1 = new MenuItemProducts("price-total", "TOTAL", "p");
        var p2 = new MenuItemProducts("price-total", sum, "p");
        var div = new Submenu("total", [p1, p2], "div");

        var a1 = new MenuItemProducts("button-cart-text", "Checkout", "a", "checkout.html");
        var div1 = new Submenu("button-cart", [a1], "div");

        var a2 = new MenuItemProducts("button-cart-text", "Go to cart", "a", "shopping-cart.html");
        var div2 = new Submenu("button-cart", [a2], "div");

        $container.appendChild(div.render());
        $container.appendChild(div1.render());
        $container.appendChild(div2.render());

    });
}


(function ($) {
    buildPaginator();
    buildMiniCart();

    var $catalog = $(".fetured-items-box");


    $catalog.on("click", ".add", function () {
        event.preventDefault();
        var good = $(this).data();

        //анимация добавления
        $("#" + good.id)
            .clone()
            .css({
                'position': 'absolute',
                'z-index': '11100',
                top: $(this).offset().top - 300,
                left: $(this).offset().left - 100
            })
            .appendTo("body")
            .animate({
                opacity: 0.05,
                left: $(".cart-box").offset()['left'],
                top: $(".cart-box").offset()['top'],
                width: 20
            }, 1000, function () {
                $(this).remove();
            });


        //добавление товара в корзину
        sendRequst("http://localhost:3000/cart", function (items) {
            if (items.length === 0) {
                good.quantity = 1;
                $.ajax({
                    url: "http://localhost:3000/cart",
                    type: "POST",
                    dataType: "json",
                    data: good,
                    success: function () {
                    }
                })
            } else {
                items.forEach(function (item, i) {
                    if (+item.id === good.id) {
                        $.ajax({
                            url: "http://localhost:3000/cart/" + item.id,
                            type: "PATCH",
                            dataType: "json",
                            data: {quantity: +item.quantity + 1},
                            success: function () {
                            }
                        });
                    }
                    if (i === items.length - 1) {
                        good.quantity = 1;
                        $.ajax({
                            url: "http://localhost:3000/cart",
                            type: "POST",
                            dataType: "json",
                            data: good,
                            success: function () {
                            }
                        })
                    }
                });
            }
        });
        buildMiniCart();

    });

})(jQuery);






