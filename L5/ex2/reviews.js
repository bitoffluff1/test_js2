var $reviews = $("#reviews");
var $approvedReviews = $("#approvedReviews");

function buildReviews() {
    $reviews.empty();
    $.ajax({
        url: "http://localhost:3000/reviews",
        dataType: "json",
        success: function (review) {
            $.each(review, function (i, item) {
                var $div = $("<div/>", {class: "review-box"}).data(item);
                var $name = $("<h3/>").text(item.userName);
                var $text = $("<p/>", {
                    text: item.text,
                    class: "text"
                });
                var $approvedButton = $("<button/>", {
                    text: "Approved",
                    class: "button-approved",
                }).data(item);

                $div.append($name);
                $div.append($text);
                $div.append($approvedButton);
                $reviews.append($div);
            });
            var $addButton = $("<button/>", {
                text: "Add",
                class: "add",
            });
            $reviews.append($addButton);
        }
    })
}

function buildApprovedReviews() {
    $approvedReviews.empty();

    $.ajax({
        url: "http://localhost:3000/approvedReviews",
        dataType: "json",
        success: function (review) {
            $.each(review, function (i, item) {
                var $div = $("<div/>", {class: "review-box"});
                var $name = $("<h3/>").text(item.userName);
                var $text = $("<p/>", {
                    text: item.text,
                    class: "text"
                });
                var $deleteButton = $("<button/>", {
                    text: "Delete",
                    class: "button-delete",
                    id: "review-" + item.id
                }).data(item);

                $div.append($name);
                $div.append($text);
                $div.append($deleteButton);
                $approvedReviews.append($div);
            });
        }
    })
}


(function ($) {
    buildReviews();
    buildApprovedReviews();

    $approvedReviews.on("click", ".button-delete", function () {
        var review = $(this).data();
        $.ajax({
            url: "http://localhost:3000/approvedReviews/" + review.id,
            type: "DELETE",
            success: function () {
                buildApprovedReviews();
            }
        })
    });

    $reviews.on("click", ".button-approved", function () {
        $(this).toggleClass("green");
        $(this).parent(".review-box").toggleClass("approved");
    });

    $reviews.on("click", ".add", function () {
        $(".approved").each(function (i, elem) {
            var review = $(elem).data();
            if (!$("review-" + review.id).length) {
                $.ajax({
                    url: "http://localhost:3000/approvedReviews",
                    type: "POST",
                    dataType: "json",
                    data: review,
                    success: function () {
                        buildApprovedReviews();
                    }
                })
            }
        });
    });

})(jQuery);