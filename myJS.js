let getName = () => {
    let userNameValue = addToList(document.getElementById('nameInput').value);
    document.getElementById('nameOutput').innerHTML = userNameValue;
    document.getElementById('nameInput').value = '';
}

document.getElementById('nameInput').addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        getName();
    }
})

let addToList = newItem => {
    let previousValue = document.getElementById('nameOutput').innerHTML;
    let text = newItem + '<br />' + previousValue;
    return text;
}