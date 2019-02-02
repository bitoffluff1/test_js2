//решение задания к уроку 3
var $button = document.getElementById("button");
var $form = document.querySelectorAll("input");

$button.addEventListener("click", handleButtonClick);


function handleButtonClick() {
    $("#dialog").empty();

    var name = $form[0].value;
    var regName = /^[а-я\s]+$/i;
    if (name.length > 0) {
        if (regName.test(name) === false) {
            $(".name").effect("bounce", 500);

            var $p1 = $("<p/>").text("Неправильно указано имя");
            $("#dialog").append($p1);
        }
    }

    var phone = $form[1].value;
    var regPhone = /^\+\d\(\d{3}\)\d{3}-\d{4}$/;
    if (phone.length > 0) {
        if (regPhone.test(phone) === false) {
            $(".phone").effect("bounce", 500);

            var $p2 = $("<p/>").text("Неправильно указан номер телефона");
            $("#dialog").append($p2);
        }
    }

    var email = $form[2].value;
    var regEmail = /^.+@.+\..+$/;
    if (email.length > 0) {
        if (regEmail.test(email) === false) {
            $(".mail").effect("bounce", 500);

            var $p3 = $("<p/>").text("Неправильно указан адрес почты");
            $("#dialog").append($p3);
        }
    }

    $("#dialog").dialog();
}

//решение задания к уроку 4
(function ($) {
    $("#city").on("keyup", function () {
        if ($("#city").val().length > 0) {
            var letter = $("#city").val();
            var regexp = new RegExp("^" + letter, "i");
            $.ajax({
                url: "http://127.0.0.1:8080/L4/ex3/cities.json",
                type: "POST",
                dataType: "json",
                success: function (data) {
                    $("#cities").empty();
                    $.each(data, function (i, elem) {
                        if (regexp.test(elem.name) === true) {
                            $("#cities").append($("<li>" + elem.name + "</li>"));
                        }
                    });
                }
            });


        } else {
            getAll();
        }
    });
    $("#city").on("click", getAll);

    function getAll() {
        if ($("#city").val().length === 0) {
            $.ajax({
                url: "http://127.0.0.1:8080/L6/ex1/cities.json",
                type: "POST",
                dataType: "json",
                success: function (data) {
                    $("#cities").empty();
                    $.each(data, function (i, elem) {
                        $("#cities").append($("<li>" + elem.name + "</li>"));
                    });
                }
            })
        }
    }


    $("#cities").on("click", function (event) {
        var cityUser = event.target.textContent;
        $("#city").val(cityUser);
    });

    $(function () {
        $("#datepicker").datepicker({
            showOn: "button",
            buttonImage: "http://image.flaticon.com/icons/png/128/178/178584.png",
            buttonImageOnly: true,
            buttonText: "Select date",
            firstDay: 1,
            dateFormat: "dd.mm.yy",
            dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
        });
    });

})(jQuery);






