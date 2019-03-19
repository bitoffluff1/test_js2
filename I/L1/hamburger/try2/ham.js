window.onload = function () {
    document.forms[0].onsubmit = function () {
        try {
            var burger = new Hamburger(+this.size.value, +this.stuffing.value);

            if (this.topping_mayo.checked) {
                burger.addTopping(Hamburger.TOPPING_MAYO);
            }

            if (this.topping_spice.checked) {
                burger.addTopping(Hamburger.TOPPING_SPICE);
            }

            document.getElementById("result").innerHTML = "Ваш гамбургер: Cтоимость:<span>" + burger.getPrice() + " руб </span>, Калории: <span>" + burger.getCalories() + " ккал </span>";
            document.getElementById("pre").innerHTML = burger;
        } catch (e) {
            console.error(e.message);
        }
        return false;
    };
};

function Hamburger(size, stuffing) {
    this._toppings = [];

    switch (size) {
        case Hamburger.SIZE_SMALL:
            this._price = 50;
            this._calories = 20;
            break;
        case Hamburger.SIZE_LARGE:
            this._price = 100;
            this._calories = 40;
            break;
        default:
            throw new HamburgerException("Неправильный размер гамбургера: " + size);
    }
    this._size = size;

    switch (stuffing) {
        case Hamburger.STUFFING_CHEESE:
            this._price += 10;
            this._calories += 20;
            break;
        case Hamburger.STUFFING_SALAD:
            this._price += 20;
            this._calories += 5;
            break;
        case Hamburger.STUFFING_POTATO:
            this._price += 15;
            this._calories += 10;
            break;
        default:
            throw new HamburgerException("Неправильная начинка: " + stuffing);
    }
    this._stuffing = stuffing;
}

Hamburger.SIZE_SMALL = 1;
Hamburger.SIZE_LARGE = 2;
Hamburger.STUFFING_CHEESE = 1;
Hamburger.STUFFING_SALAD = 2;
Hamburger.STUFFING_POTATO = 3;
Hamburger.TOPPING_MAYO = 1;
Hamburger.TOPPING_SPICE = 2;


Hamburger.prototype.addTopping = function (topping) {
    switch (topping) {
        case Hamburger.TOPPING_MAYO:
            if (this._toppings.indexOf(Hamburger.TOPPING_MAYO) === -1) {
                this._toppings.push(Hamburger.TOPPING_MAYO);
                this._price += 20;
                this._calories += 5;
            }
            break;
        case Hamburger.TOPPING_SPICE:
            if (this._toppings.indexOf(Hamburger.TOPPING_SPICE) === -1) {
                this._toppings.push(Hamburger.TOPPING_SPICE);
                this._price += 15;
            }
            break;
        default:
            throw new HamburgerException("Неправильный топпинг: " + topping);
    }
};

Hamburger.prototype.removeTopping = function (topping) {
    switch (topping) {
        case Hamburger.TOPPING_MAYO:
            if (this._toppings.indexOf(Hamburger.TOPPING_MAYO) >= 0) {
                this._toppings.splice(this._toppings.indexOf(Hamburger.TOPPING_MAYO));
                this._price -= 20;
                this._calories -= 5;
            }
            break;
        case Hamburger.TOPPING_SPICE:
            if (this._toppings.indexOf(Hamburger.TOPPING_SPICE) >= 0) {
                this._toppings.splice(this._toppings.indexOf(Hamburger.TOPPING_SPICE));
                this._price -= 15;
            }
            break;
        default:
            throw new HamburgerException("Неправильный топпинг: " + topping);
    }
};

Hamburger.prototype.getToppings = function () {
    return this._toppings;
};

Hamburger.prototype.getSize = function () {
    return this._size;
};

Hamburger.prototype.getStuffing = function () {
    return this._stuffing;
};

Hamburger.prototype.getPrice = function () {
    return this._price;
};

Hamburger.prototype.getCalories = function () {
    return this._calories;
};

Hamburger.prototype.toString = function () {
    var res = "<span>Hamburger:</span><br>Size: ";
    res += (this._size === Hamburger.SIZE_SMALL) ? "Small<br>" : "Big<br>";
    res += "Stuffing: ";
    res += (this._stuffing === Hamburger.STUFFING_CHEESE) ? "Cheese<br>"
        : (this._stuffing === Hamburger.STUFFING_POTATO) ? "Potato<br>" : "Salad<br>";
    res += "Toppings: ";
    res += (this._toppings.length > 0) ?
        this._toppings.map(function (t) {
            return t === Hamburger.TOPPING_MAYO ? "Mayo<br>" : "Spice<br>";
        }).join(", ")
        : "none<br>";
    res += "Price: " + this._price + "rub<br>";
    res += "Calories: " + this._calories + "ccal";

    return res;
};


function HamburgerException(message) {
    this.name = "Hamburger Exception";
    this.message = message;
}
