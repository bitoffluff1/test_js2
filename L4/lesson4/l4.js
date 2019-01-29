(function ($) {
    $("#button").on("click",function () {
        $.ajax({
            url: "http://localhost:3000/users",
            type: "GET",
            dataType: "json",
            success: function (data) {
                $.each(data, function (i, elem) {
                    $(".names").append($("<li>" + elem.name + "</li>"));
                });
            }
        })
    })

})(jQuery);