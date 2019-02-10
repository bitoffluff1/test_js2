(function ($) {

//во время работы модального окна прячем все остальное
    $(".box-userNumbers").hide();
    $(".box-numbers").hide();

    //после загрузки страницы открываем модальное окно
    $(document).ready(function () {
        $('#modal-container').addClass("active");
    });
//при нажатии на модальное окно скрываем его и открываем блок для ввода чисел
    $('#modal-container').click(function () {
        $(this).addClass('out');
        $(".box-userNumbers").show("fold", 800);
    });

//после нажатия на кнопку "ок"
    $("#button").click(function () {
        var userNumbers = $(".userNumbers").val(); //записываем то что написано в поле input
        var regName = /^(?:\d\,?)+$/; //регулярное выражение для проверки введенного текста

        if (userNumbers.length > 0) { //если что-то написано в поле, то
            if (regName.test(userNumbers) === false) {//проверяем через регулярное выражение
                $(".userNumbers").effect("bounce", 500); //если не верно, то подсвечиваем поле
            } else { //если верно, то
                var array = userNumbers.split(","); //преобразуем введенный текс в массив

                $(".box-numbers").show("fold", 1000); //показываем блок html с массивом, анимацией и отсортированными числами

                createList(array, "number number_user", $("#arrRandom")); //создаем список в dom с введенными числами

                createList(array, "number number_animation", $("#animation")); //создаем список с введенными числами для анимации
                bubbleSortAnimation(0, 0, $(".number_animation")); //анимируем пузырьковую сортировку

                bubbleSort(array);//сортируем числа
                createList(array, "number number_sort", $("#arrSort"));//создаем список в dom из сортированных чисел
            }
        } else {
            $(".userNumbers").effect("bounce", 500); //если ничего не написано в поле,то подсвечиваем поле
        }
    });


//функция создающаяя список чисел из массива в dom
    function createList(array, className, ul) {
        ul.empty();
        $.each(array, function (i, item) {
            var $li = $("<li/>", {
                text: item,
                class: className
            });
            ul.append($li);
        });
    }


    //функция анимирующая процесс пузырьковой сортировки

    function bubbleSortAnimation(i, j, arr) {
        arr.eq(j).addClass("red"); //выделяем 1 и следующий элемент массива
        arr.eq(j + 1).addClass("red");

        var endI = arr.length - 1; //количество обходов массива
        var endJ = endI - i; //количество чисел в одном обходе

        if (i === endI) { // если это последний обход, то отмечаем первое число и выходим из функции
            arr.eq(0).addClass("grey");
            return arr;
        } else {
            if (j === endJ) {//если это последнее число в обходе, то отмечаем последнее число, переходим на следующий обход
                arr.eq(j).addClass("grey");
                i++;
                setTimeout(function () {
                    bubbleSortAnimation(i, 0, arr)
                }, 2000);
            } else {
                if (+arr.eq(j).text() > +arr.eq(j + 1).text()) {//если первое число больше следующего,то
                    var number1 = arr.eq(j).text(); //записываем значения элементов
                    var number2 = arr.eq(j + 1).text();

                    arr.eq(j).text(number2); //меняем значения элементов
                    arr.eq(j + 1).text(number1);

                    arr.removeClass("red", 500); //снимаем выделение

                    setTimeout(function () { //переходим на следующий элемент
                        bubbleSortAnimation(i, j + 1, arr)
                    }, 2000);
                } else {
                    arr.removeClass("red", 500); //если первое число меньше или равно следующему,то переходим к следующему элементу

                    setTimeout(function () {
                        bubbleSortAnimation(i, j + 1, arr)
                    }, 2000);
                }
            }
        }
    }

//производим пузырьковую сортировку

    function bubbleSort(array) {
        for (var i = 0, endI = array.length - 1; i < endI; i++) {
            var wasSwap = false;
            for (var j = 0, endJ = endI - i; j < endJ; j++) {
                if (+array[j] > +array[j + 1]) {
                    var swap = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = swap;
                    wasSwap = true;
                }
            }
            if (!wasSwap) break; //если все числа отсортированы, то заканчиваем цикл
        }
        return array;
    }


})(jQuery);
