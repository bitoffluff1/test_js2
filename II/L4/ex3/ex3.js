const $button = document.getElementById("button");
const $form = document.querySelectorAll("input");

$button.addEventListener("click", () => {
    const name = $form[0].value;
    const regName = /^[а-я\s]+$/i;
    if (name.length > 0) {
        if (regName.test(name) === false) {
            $form[0].classList.add("error");
            alert("Не правильно введено имя");
        } else {
            $form[0].classList.remove("error");
        }
    }


    const phone = $form[1].value;
    const regPhone = /^\+\d\(\d{3}\)\d{3}-\d{4}$/;
    if (phone.length > 0) {
        if (regPhone.test(phone) === false) {
            $form[1].classList.add("error");
            alert("Не правильно введен номер телефона");
        } else {
            $form[1].classList.remove("error");
        }
    }

    const email = $form[2].value;
    const regEmail = /^.+@.+\..+$/;
    if (email.length > 0) {
        if (regEmail.test(email) === false) {
            $form[2].classList.add("error");
            alert("Не правильно введен адрес электронной почты");
        } else {
            $form[2].classList.remove("error");
        }
    }
});

