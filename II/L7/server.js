const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const moment = require("moment");

const app = express();

app.use(express.static("./public"));
app.use(bodyParser.json());

app.use("/cart", (req, res, next) => {
    if (["POST", "PATCH", "DELETE"].includes(req.method)) {
        const mapping = {
            POST: "Добавление",
            PATCH: "Редактирование",
            DELETE: "Удаление"
        };
        fs.readFile("./db/stats.json", "utf-8", (err, data) => {
            if (err) {
                return console.log(err);
            }
            const stats = JSON.parse(data);

            switch (req.method) {
                case "POST":
                    stats.push({
                        action: mapping[req.method],
                        name: req.body.name,
                        timestamp: moment().format()
                    });
                    fs.writeFile("./db/stats.json", JSON.stringify(stats), (err) => {
                        if (err) {
                            return console.log(err);
                        }
                    });
                    break;
                case "PATCH":
                case "DELETE":
                    const [, , id] = req.url.split("/");
                    fs.readFile("./db/items.json", "utf-8", (err, data) => {
                        if (err) {
                            return console.log(err);
                        }

                        const products = JSON.parse(data);
                        const product = products.find((item) => item.id === +id);
                        stats.push({
                            action: mapping[req.method],
                            name: product.name,
                            timestamp: moment().format()
                        });
                        fs.writeFile("./db/stats.json", JSON.stringify(stats), (err) => {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    });
            }
        })
    }
    next();
});

app.get("/items", (req, res) => {
    fs.readFile("./db/items.json", "utf-8", (err, data) => {
        if (err) {
            return console.log(err);
        }

        res.send(data);
    });
});

app.get("/cart/:userId", (req, res) => {
    fs.readFile("./db/cart.json", "utf-8", (err, data) => {
        if (err) {
            return console.log(err);
        }
        let cart = JSON.parse(data);

        cart = cart.filter((item) => {
            if (item.userId === +req.params.userId) {
                return item;
            }
        });

        res.send(cart);
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
        const deleted = cart.find((item) => item.id === +req.params.id);
        cart = cart.filter((item) => item.id !== +req.params.id);

        fs.writeFile("./db/cart.json", JSON.stringify(cart), (err) => {
            if (err) {
                return console.log(err);
            }

            res.send(deleted);
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

        const users = JSON.parse(data);
        const {login} = req.body;
        const isExist = users.find((user) => user.login === login);

        if (isExist) {
            res.send(["User with this login is already registered"]);
        } else {
            users.push({...req.body, "id": users.length + 1});

            fs.writeFile("./db/users.json", JSON.stringify(users), (err) => {
                if (err) {
                    return console.log(err);
                }

                res.send(users.find((item) => item.login === users));
            });
            res.send(req.body);
        }
    });
});

app.post("/auth", (req, res) => {
    fs.readFile("./db/users.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const users = JSON.parse(data);
        const {checkLogin, checkPassword} = req.body;
        const isExist = users.find((user) => user.login === checkLogin && user.password === checkPassword);

        if (isExist) {
            res.send(isExist);
        } else {
            res.send(["Wrong login or password"]);
        }
    });
});

app.post("/pass", (req, res) => {
    fs.readFile("./db/users.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const users = JSON.parse(data);
        const {currentPassword, newPassword, userId} = req.body;
        const isExist = users.find((user) => user.id === userId && user.password === currentPassword);
        console.log(isExist);
        if (isExist) {
            isExist.password = newPassword;

            fs.writeFile("./db/users.json", JSON.stringify(users), (err) => {
                if (err) {
                    return console.log(err);
                }

                res.send(["Password change"]);
            });
        } else {
            res.send(["Wrong password"]);
        }
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



