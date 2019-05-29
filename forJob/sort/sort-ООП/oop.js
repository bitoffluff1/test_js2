function Container(id, className, tagName) {
    this.id = id;
    this.className = className;
    this.tagName = tagName;

    var element;

    this.getElement = function () {
        return element;
    };

    this.setElement = function (newValue) {
        element = newValue;
    };
}


Container.prototype.render = function () {
    var element = this.getElement();

    if (!element) {
        element = document.createElement(this.tagName);
        element.id = this.id;
        element.className = this.className;

        this.setElement(element);
    }

    return element;
};


function Menu(id, className, items, tagName) {
    Container.call(this, id, className, tagName);

    this._items = items;
}


Menu.prototype = Object.create(Container.prototype);
Menu.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    this._items.forEach(function (item) {
        if (item instanceof Container) {
            container.appendChild(item.render());
        }
    });
    return container;
};

function MenuItem(className, title) {
    Container.call(this, "", className, "li");

    this.title = title;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    container.textContent = this.title;

    return container;
};

function Submenu(className, items, tagName) {
    Menu.call(this, "", className, items, tagName);
}

Submenu.prototype = Object.create(Menu.prototype);
Submenu.prototype.render = function () {
    var container = Menu.prototype.render.call(this);

    return container;
};

function MenuItemH(title, tagName) {
    Container.call(this, "", "", tagName);

    this.title = title;
}

MenuItemH.prototype = Object.create(Container.prototype);
MenuItemH.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    container.textContent = this.title;
    return container;
};

function MenuItemInput(className, placeholder) {
    Container.call(this, "", className, "input");

    this.placeholder = placeholder;
}

MenuItemInput.prototype = Object.create(Container.prototype);
MenuItemInput.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    container.placeholder = this.placeholder;
    return container;
};

function MenuItemButton(id, className, title) {
    Container.call(this, id, className, "button");

    this.title = title;
}

MenuItemButton.prototype = Object.create(Container.prototype);
MenuItemButton.prototype.render = function () {
    var container = Container.prototype.render.call(this);

    container.textContent = this.title;
    return container;
};


//создаем div для ввода чисел
var h2 = new MenuItemH("Сортировка пузырьком", "h2");
var h4 = new MenuItemH("Вы можете наглядно познакомиться с алгоритмом сортировки простых одномерных массивов - сортировки пузырьком.", "h4");
var p = new MenuItemH("Введите целые числа через запятую без пробелов", "p");
var input = new MenuItemInput("userNumbers", "12,18,19,25,18,3,74,iwu,36");
var button = new MenuItemButton("button", "button", "OK");

var boxUserNumbers = new Menu("", "box-userNumbers", [h2, h4, p, input, button], "div");

var $container = document.getElementsByClassName("container")[0];
$container.appendChild(boxUserNumbers.render());


(function ($) {

//проверяем введенный текст, преобразуем в массив чисел, создаем списки в dom и сортируем числа
    $("#button").click(function () {
        var userNumbers = $(".userNumbers").val();
        var regName = /^(?:\d\,?)+$/;

        if (userNumbers.length > 0) {
            if (regName.test(userNumbers) === false) {
                $(".userNumbers").effect("bounce", 500);
            } else {
                var array = userNumbers.split(",");

                var listUser = createList(array, "number number_user");
                var arrUser = new Menu("arrUser", "arr arr_user", listUser, "ul");
                var titleListUser = new MenuItemH("Введенные числа:", "h4");

                var listAnimation = createList(array, "number number_animation");
                var arrAnimation = new Menu("arrUser", "arr arr", listAnimation, "ul");
                var titleListAnimation = new MenuItemH("Анимация пузырьковой сортировки:", "h4");

                var arraySort = bubbleSort(array);
                var listSort = createList(arraySort, "number number_sort");
                var arrSort = new Menu("arrSort", "arr arr_sort", listSort, "ul");
                var titleListSort = new MenuItemH("Отсортированные числа:", "h4");

                var boxNumbers = new Submenu("box-numbers", [
                    titleListUser,
                    arrUser,
                    titleListAnimation,
                    arrAnimation,
                    titleListSort,
                    arrSort
                ], "div");
                $(".container").append(boxNumbers.render());

                bubbleSortAnimation(0, 0, $(".number_animation"));
            }
        } else {
            $(".userNumbers").effect("bounce", 500);
        }
    });

    //функция создающаяя пункты в список из чисел
    function createList(array, className) {
        var list = [];

        $.each(array, function (i, item) {
            var menuItem = new MenuItem(className, item);
            list.push(menuItem);
        });
        return list;
    }


    //функция анимирующая процесс пузырьковой сортировки
    function bubbleSortAnimation(i, j, arr) {
        arr.eq(j).addClass("red"); //выделяем iwu и следующий элемент массива
        arr.eq(j + 1).addClass("red");

        var endI = arr.length - 1; //количество обходов массива
        var endJ = endI - i; //количество чисел в одном обходе

        if (i === endI) { // если это последний обход, то отмечаем первое число и выходим из функции
            arr.eq(0).addClass("grey");
            return arr;

        } else {
            if (j === endJ) {  //если это последнее число в обходе, то отмечаем последнее число, переходим на следующий обход
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
            if (!wasSwap) break; //проверяем есть ли неотсортированные числа
        }
        return array;
    }

})(jQuery);