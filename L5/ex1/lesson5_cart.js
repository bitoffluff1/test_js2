var $cart = $("#cart");
var $catalog = $("#goods");

function buildCatalog() {
    $.ajax({
        url: "http://localhost:3000/goods",
        dataType: "json",
        success: function (goods) {
            $.each(goods, function (i, item) {
                var $li = $("<li/>").text(item.name);
                var $buyButton = $("<button/>", {
                    text: "Buy",
                    class: "buy"
                }).data(item);

                $li.append($buyButton);
                $catalog.append($li);
            });
        }
    })
}

function buildCart() {
    $("#cart").empty();

    $.ajax({
        url: "http://localhost:3000/cart",
        dataType: "json",
        success: function (goods) {
            var sum = 0;
            var $ul = $("<ul/>");
            $.each(goods, function (i, item) {
                var $li = $("<li/>", {
                    text: item.name + "(" + item.quantity + ")"
                });
                var $buyButton = $("<button/>", {
                    text: "Remove",
                    class: "remove",
                    id: "cart-" + item.id
                }).data(item);

                sum += +item.price * +item.quantity;

                $li.append($buyButton);
                $ul.append($li);
            });

            $cart.append($ul);
            $cart.append($("<span/>", {text: "Total: " + sum}));
        }
    })
}


(function ($) {
    buildCatalog();
    buildCart();

    $cart.on("click", ".remove", function () {
        var good = $(this).data();
        var goodInCart = $("#cart-" + good.id).data();

        if (goodInCart.quantity > 1) {
            $.ajax({
                url: "http://localhost:3000/cart/" + good.id,
                type: "PATCH",
                dataType: "json",
                data: {quantity: +goodInCart.quantity - 1},
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

    $catalog.on("click", ".buy", function () {
        var good = $(this).data();
        if ($("#cart-" + good.id).length) {
            var goodInCart = $("#cart-" + good.id).data();
            $.ajax({
                url: "http://localhost:3000/cart/" + good.id,
                type: "PATCH",
                dataType: "json",
                data: {quantity: +goodInCart.quantity + 1},
                success: function () {
                    buildCart();
                }
            })
        } else {
            good.quantity = 1;
            $.ajax({
                url: "http://localhost:3000/cart",
                type: "POST",
                dataType: "json",
                data: good,
                success: function () {
                    buildCart();
                }
            })
        }

    })

})(jQuery);