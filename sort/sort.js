(function ($) {

//создаем массив чисел
    var arr = [];
    for (var i = 0; i < 10; i++) {
        var randomNumber = Math.floor(Math.random() * 100);
        arr.push(randomNumber);

        var $li = $("<li/>", {
            text: randomNumber,
            class: "number number_random"
        });
        $("#arrRandom").append($li);
    }


 //анимация
    $.each(arr, function (i, item) {
        var $li = $("<li/>", {
            text: item,
            class: "number number_test"
        });
        $("#test").append($li);
    });

    var $numbers = $(".number_test");
    setTimeout(bubbleSortTest($numbers),)
    ;

    function bubbleSortTest(arr) {
        for (var i = 0, endI = arr.length - 1; i < endI; i++) {
            var wasSwap = false;
            for (var j = 0, endJ = endI - i; j < endJ; j++) {
                arr.eq(j).addClass("red");
                arr.eq(j + 1).addClass("red");
                if (arr.eq(j).text() > arr.eq(j + 1).text()) {
                    var swap = arr.eq(j).text();
                    var text = arr.eq(j + 1).text();
                    arr.eq(j).text(text);
                    arr.eq(j + 1).text(swap);
                    wasSwap = true;

                }
                arr.removeClass("red");
            }
            if (!wasSwap) break;
        }
        return arr;
    }


//производим сортировку
    bubbleSort(arr);

    $.each(arr, function (i, item) {
        var $li = $("<li/>", {
            text: item,
            class: "number number_sort"
        });
        $("#arrSort").append($li);
    });


})(jQuery);


function bubbleSort(arr) {
    for (var i = 0, endI = arr.length - 1; i < endI; i++) {
        var wasSwap = false;
        for (var j = 0, endJ = endI - i; j < endJ; j++) {
            if (arr[j] > arr[j + 1]) {
                var swap = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = swap;
                wasSwap = true;
            }
        }
        if (!wasSwap) break;
    }
    return arr;
}