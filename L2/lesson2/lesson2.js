var $button = document.getElementById("send");

$button.addEventListener("click", function () {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://127.0.0.1:8080/L2/lesson2/text.json");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var users = JSON.parse(xhr.responseText);//stringify- отправляем на сервер данные

            var $ul = document.createElement("ul");
            users.forEach(function (user) {
                var $li = document.createElement("li");
                $li.textContent = user.firstName + " " + user.lastName;

                $ul.appendChild($li);
            });

            document.body.appendChild($ul);
        }
    };
});

