const userSelect = document.querySelector('#user-select');

function CalculateTriadic() {
    /*
    Color 1: #RRBBGG (input)
    Color 2: #GGRRBB
    Color 3: #BBGGRR
    */
    const hexString = userSelect.value;
    const paletteListTriade = [];

    const rSection = hexString.substring(1, 3);
    const bSection = hexString.substring(3, 5);
    const gSection = hexString.substring(5);

    const grbString = `#${gSection}${rSection}${bSection}`;
    const bgrString = `#${bSection}${gSection}${rSection}`;

    paletteListTriade.push(hexString);
    paletteListTriade.push(grbString);
    paletteListTriade.push(bgrString);
    // TEMP:
    console.log(paletteListTriade);

    return paletteListTriade;
}

function CalculateComplimentary() {
    /*
    Color 1: #RRGGBB (input)
    Color 2: #(F-R)(F-R)(F-G)(F-G)(F-B)(F-B) using hex math
    */
    const hexString = userSelect.value;
    const hexF = parseInt("0xF");
    let complimentString = "#"
    const paletteListCompliment = [];

    const allHexInput = hexString.substring(1);

    for (i = 0; i < allHexInput.length; i++) {
        const hexVal = parseInt(`0x${allHexInput.charAt(i)}`);
        const newHex = (hexF - hexVal).toString(16);
        complimentString += newHex;
    }

    paletteListCompliment.push(hexString);
    paletteListCompliment.push(complimentString);
    // TEMP:
    console.log(paletteListCompliment);

    return paletteListCompliment;
}

function showColor() {
    console.log(userSelect.value);
    CalculateTriadic();
    CalculateComplimentary();
}

userSelect.addEventListener("input", showColor, false);
