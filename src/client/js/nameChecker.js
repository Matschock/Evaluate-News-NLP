function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        ""
    ]
    document.getElementById('results').innerHTML =   ` `;
    let nameCheckPassed = false;
    if(names.includes(inputText)) {
        let message = "Invalid Input";
        alert(message)
    } else {
        let message = "Analysing:" + "\n" + inputText;
        alert(message)
        nameCheckPassed = true;
    }
    return nameCheckPassed
}

export { checkForName }
