const validation = {
    name: /^[a-z]+$/iu,
    phone: /^\+\d\(\d{3}\)\d{3}-\d{4}$/,
    email: /.+@.+\..+/i
};


document.getElementById("button").addEventListener("click", () => {
    Object.keys(validation).forEach((rule) => {
        const $fields = document.querySelectorAll("[data-validation-rule='" + rule + "']");
        $fields.forEach((field) => {
            if (validation[rule].test(field.value)) {
                field.classList.remove("invalid");
            } else {
                field.classList.add("invalid");
            }
        });
    });
    event.preventDefault();
});

