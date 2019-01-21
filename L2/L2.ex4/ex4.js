var xhr = new XMLHttpRequest();

xhr.open("GET", "http://127.0.0.1:8080/L2/L2.ex4/ex4.json");
xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE){
        var info = JSON.parse(xhr.responseText);

        var $button = document.getElementById("button");

        if(info[0].result === "success"){
            $button.classList.add("success");
        }else if(info[0].result === "error"){
            $button.classList.add("error");
        } else {
            console.log(info);
        }
    }
}