const $text = document.getElementById("text");
const $button = document.getElementById("button");

$button.addEventListener("click", () => {
    const newText = $text.textContent.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');
    document.body.innerHTML = `<div>${newText}</div>`
});


