function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert(`Analysing: /
                ${inputText}`)
    } else {
        let message = "Analysing:" + "\n" + inputText;
        alert(message)
    }
}

export { checkForName }
