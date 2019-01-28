//решение задания к уроку 3
var $button = document.getElementById("button");
var $form = document.querySelectorAll("input");

$button.addEventListener("click", handleButtonClick);

function handleButtonClick() {
    var name = $form[0].value;
    var regName = /^[а-я\s]+$/i;
    if (name.length > 0) {
        if (regName.test(name) === false) {
            $form[0].classList.add("error");
            alert("Не правильно введена форма");
        } else {
            $form[0].classList.remove("error");
        }
    }


    var phone = $form[1].value;
    var regPhone = /^\+\d\(\d{3}\)\d{3}-\d{4}$/;
    if (phone.length > 0) {
        if (regPhone.test(phone) === false) {
            $form[1].classList.add("error");
            alert("Не правильно введена форма");
        } else {
            $form[1].classList.remove("error");
        }
    }

    var email = $form[2].value;
    var regEmail = /^.+@.+\..+$/;
    if (email.length > 0) {
        if (regEmail.test(email) === false) {
            $form[2].classList.add("error");
            alert("Не правильно введена форма");
        } else {
            $form[2].classList.remove("error");
        }
    }
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
                url: "http://127.0.0.1:8080/L4/ex3/cities.json",
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

})(jQuery);






