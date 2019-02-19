(function ($) {
    var $cart = $(".shopping-cart-table");
    var $catalog = $(".fetured-items-box");


    function buildCart() {
        $cart.empty();

        $.ajax({
            url: "http://localhost:3000/cart",
            dataType: "json",
            success: function (items) {
                var sum = 0;
                $.each(items, function (i, item) {

                });
            }
        })
    }


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

    $catalog.on("click", ".add", function () {
        var item = $(this).data();
        if ($("#cart-" + item.id).length) {
            var goodInCart = $("#cart-" + item.id).data();
            $.ajax({
                url: "http://localhost:3000/cart/" + item.id,
                type: "PATCH",
                dataType: "json",
                data: {quantity: +goodInCart.quantity + 1},
                success: function () {
                    buildCart();
                }
            })
        } else {
            item.quantity = 1;
            $.ajax({
                url: "http://localhost:3000/cart",
                type: "POST",
                dataType: "json",
                data: item,
                success: function () {
                    buildCart();
                }
            })
        }

    })

})(jQuery);