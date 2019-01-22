function Hamburger(size, stuffing) {
    if (size === Hamburger.SIZE_SMALL || size === Hamburger.SIZE_LARGE) {
        this.size = size;
    } else {
        alert("Error");
    }
    if (stuffing === Hamburger.STUFFING_CHEESE || stuffing === Hamburger.STUFFING_SALAD || stuffing === Hamburger.STUFFING_POTATO) {
        this.stuffing = stuffing;
    } else {
        alert("Error");
    }
}

Hamburger.SIZE_SMALL = {price: 50, calories: 20};
Hamburger.SIZE_LARGE = {price: 100, calories: 40};

Hamburger.STUFFING_CHEESE = {price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {price: 15, calories: 10};

Hamburger.TOPPING_MAYO = {price: 20, calories: 5};
Hamburger.TOPPING_SPICE = {price: 15, calories: 0};

var toppings = [];

Hamburger.prototype.addTopping = function (topping) {
    if (topping === Hamburger.TOPPING_MAYO || topping === Hamburger.TOPPING_SPICE) {
        this.topping = topping;
    } else {
        alert("Error");
    }

    toppings.push(this.topping);
    return toppings;
};


Hamburger.prototype.calculatePrice = function () {
    var price = this.size.price + this.stuffing.price;
    if (toppings.length > 0) {
        toppings.forEach(function (item, i, toppings) {
            price += toppings[i].price;
        })
    }
    alert(price);
    return price;
};

Hamburger.prototype.calculateCalories = function () {
    var calories = this.size.calories + this.stuffing.calories;
    if (toppings.length > 0) {
        toppings.forEach(function (item, i, toppings) {
            calories += toppings[i].calories;
        })
    }
    alert(calories);
    return calories;
};


var ham = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
ham.calculatePrice();
ham.calculateCalories();
ham.addTopping(Hamburger.TOPPING_MAYO);
ham.calculatePrice();
ham.calculateCalories();
ham.addTopping(Hamburger.TOPPING_MAYO);
ham.calculatePrice();


