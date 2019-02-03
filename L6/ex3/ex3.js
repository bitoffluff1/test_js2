(function ($) {
    var $block = $(".header");
    var $name = $(".nameBlock");

    $.ajax({
        url: "http://127.0.0.1:8080/L6/ex3/img.json",
        dataType: "json",
        success: function (data) {


            $(".navigationRight").on("click", function () {
                $block.css("background-image", data.left.img);
                $name.text(data.left.name);

                changePoint($(this))
            });

            $(".navigation").on("click", function () {
                $block.css("background-image", data.center.img);
                $name.text(data.center.name);

                changePoint($(this))
            });

            $(".navigationLeft").on("click", function () {
                $block.css("background-image", data.right.img);
                $name.text(data.right.name);

                changePoint($(this))
            });


        }

    });


    function changePoint(point) {
        $(".navi img").attr("src", "img/navi.png");
        point.attr("src", "img/active.png")
    }

})(jQuery);