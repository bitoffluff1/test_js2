(function ($) {
    $(".format__list .format:first").addClass("action");
    $(".format__list .fas:first").css("display", "block");
    $(".format__list h4:first").css("opacity", "1");

    $(".format__list .format").click(function (event) {
        event.preventDefault();

        $(".format").removeClass("action");
        $(this).toggleClass("action");

        $(".format__list .fas").css("display", "none");
        $(this).siblings(".fas").css("display", "block");

        $(".format__list h4").css("opacity", "0.5");
        $(this).siblings("h4").css("opacity", "1");

        const width = $(this).data("width");
        $("#canvas").css("width", width);
    });

})(jQuery);

const $examples = document.querySelector(".examples");
const $original = document.querySelector("#original");
const $modal = document.querySelector(".modal");

let images = [];
for (let j = 1; j < 8; j++) {
    const img = {
        thumb: "img/examples" + j + ".jpg",
        original: "img/examples" + j + ".jpg",
    };
    images.push(img);
}

const renderItem = ({thumb, original}) =>
    `<li><a href="${original}"><img src="${thumb}" alt="img"></a><img class="loupe" src="img/loupe.png" alt="loupe"></li>`;

const renderList = items => {
    const itemsHtml = items.map(renderItem);
    $examples.innerHTML = itemsHtml.join("");
};
renderList(images);


$examples.addEventListener("click", (event) => {
    event.preventDefault();

    $modal._main.display = "block";

    const src = event.target.firstChild.href;
    $original.innerHTML = "";
    $original.innerHTML = `<img src="${src}" alt="img">`;
});

window.addEventListener("click", (event) => {
    if (event.target.parentNode === $original) {
        $modal._main.display = "none";
    }
});


