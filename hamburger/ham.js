function Hamburger(size) {
    this.size = size;
}

Hamburger.SIZE_SMALL = {price: 50, calories: 20};



Hamburger.prototype.calculatePrice = function () {
    var price = this.size["price"];
    alert(price);
    return price;
};

var ham = new Hamburger('Hamburger.SIZE_SMALL');
ham.calculatePrice();


