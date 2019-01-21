var xhr = new XMLHttpRequest();

xhr.open("GET", "http://127.0.0.1:8080/L2/L2.ex3.gallery/gallery.json");
xhr.send();

var $thumbnails = document.getElementById("thumbnails");
var $original = document.getElementById("original");

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var images = JSON.parse(xhr.responseText);

        images.forEach(function (image) {
            var $image = document.createElement("img");
            $image.src = image.thumb;

            var $link = document.createElement("a");
            $link.href = image.original;
            $link.appendChild($image);

            var $item = document.createElement("li");
            $item.appendChild($link);

            $thumbnails.appendChild($item);
        });
    }

};

$thumbnails.addEventListener("click", handleThumbnailsClick);

function handleThumbnailsClick(event) {
    event.preventDefault();

    var $src = event.target.parentNode.href;
    var $image = document.createElement("img");
    $image.src = $src;

    $original.innerHTML = "";
    $original.appendChild($image);
}