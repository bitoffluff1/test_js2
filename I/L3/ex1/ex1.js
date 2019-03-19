
var $text = document.getElementById("text");
var $button = document.getElementById("button");

$button.addEventListener("click",handleButtonClick);

function handleButtonClick(){
    var newText = $text.textContent.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');

    var $newDiv = document.createElement("div");
    $newDiv.textContent= newText;
    document.body.appendChild($newDiv);
}

