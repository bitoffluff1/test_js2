const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("./public"));
app.use(bodyParser.json());


app.get("/items", (req, res) => {
    fs.readFile("./db/items.json", "utf-8", (err, data) => {
        if (err) {
            return console.log(err);
        }

        res.send(data);
    });
});

app.get("/cart", (req, res) => {
    fs.readFile("./db/cart.json", "utf-8", (err, data) => {
        if (err) {
            return console.log(err);
        }

        res.send(data);
    });
});

app.post("/cart", (req, res) => {
    fs.readFile("./db/cart.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const cart = JSON.parse(data);
        cart.push(req.body);

        fs.writeFile("./db/cart.json", JSON.stringify(cart), (err) => {
            if (err) {
                return console.log(err);
            }

            res.send(req.body);
        });
    });
});

app.patch("/cart/:id", (req, res) => {
    fs.readFile("./db/cart.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        let cart = JSON.parse(data);

        cart = cart.map((item) => {
            if (item.id === +req.params.id) {
                return {...item, ...req.body};
            }
            return item;
        });

        fs.writeFile("./db/cart.json", JSON.stringify(cart), (err) => {
            if (err) {
                return console.log(err);
            }

            res.send(cart.find((item) => item.id === +req.params.id));
        });
    });
});

app.delete("/cart/:id", (req, res) => {
    fs.readFile("./db/cart.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        let cart = JSON.parse(data);

        const index = cart.indexOf(cart.find((item) => item.id === +req.params.id));
        cart.splice(index, 1);

        fs.writeFile("./db/cart.json", JSON.stringify(cart), (err) => {
            if (err) {
                return console.log(err);
            }

            res.send(cart);
        });
    });
});



app.get("/browse", (req, res) => {
    fs.readFile("./db/menuBrowse.json", "utf-8", (err, data) => {
        if (err) {
            return console.log(err);
        }

        res.send(data);
    });
});

app.get("/nav", (req, res) => {
    fs.readFile("./db/menuNav.json", "utf-8", (err, data) => {
        if (err) {
            return console.log(err);
        }

        res.send(data);
    });
});

app.post("/users", (req, res) => {
    fs.readFile("./db/users.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const cart = JSON.parse(data);
        cart.push(req.body);

        fs.writeFile("./db/users.json", JSON.stringify(cart), (err) => {
            if (err) {
                return console.log(err);
            }

            res.send(req.body);
        });
    });
});

app.post("/feedback", (req, res) => {
    fs.readFile("./db/feedback.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const cart = JSON.parse(data);
        cart.push(req.body);

        fs.writeFile("./db/feedback.json", JSON.stringify(cart), (err) => {
            if (err) {
                return console.log(err);
            }

            res.send(req.body);
        });
    });
});


app.listen(3000, () => {
    console.log("Server has been started");
});



