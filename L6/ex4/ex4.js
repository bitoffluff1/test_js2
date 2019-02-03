$(function () {
    $(".item").draggable({
        revert: "valid",
    });

    $("#droppable").droppable({
        drop: function () {
            $(".itemCart").attr("src", "img/product-1.jpg");
        }
    });
});