(function ($) {
    $(".slider h3:first").addClass("active");
    $(".slider p:not(:first)").hide();

    $(".slider h3").click(function () {
        $(this).toggleClass("active");
        $(this).siblings("h3").removeClass("active");
        $(".slider p").eq($(this).index()).show().siblings("p:visible").hide();
    });

})(jQuery);