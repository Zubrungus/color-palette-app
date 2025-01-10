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

    return paletteListTriade;
}

function CalculateComplimentary() {
    /*
    Color 1: #RRGGBB (input)
    Color 2: #(F-R)(F-R)(F-G)(F-G)(F-B)(F-B) using hex math
    */
    const hexString = userSelect.value;
    const hexF = parseInt("0xF");
    let complimentString = "#";
    const paletteListCompliment = [];

    const allHexInput = hexString.substring(1);

    for (i = 0; i < allHexInput.length; i++) {
        const hexVal = parseInt(`0x${allHexInput.charAt(i)}`);
        const newHex = (hexF - hexVal).toString(16);
        complimentString += newHex;
    }

    paletteListCompliment.push(hexString);
    paletteListCompliment.push(complimentString);

    return paletteListCompliment;
}

function CalculateMonochromatic() {
    /*
    Change HSL 'lightness' value of the starting color to get
    the 2 other monochromatic colors.
    */
    const hexString = userSelect.value;
    const paletteListMonochrome = [];
    lChange = 20; // play with this? represents % of shift.

    const hslIn = HexToHSL(hexString);
    // console.log(hslIn); // matches picker, so the code I found checks out!

    let hslChange1 = JSON.parse(JSON.stringify(hslIn));
    let hslChange2 = JSON.parse(JSON.stringify(hslIn));

    if ((hslIn.l - lChange) < 0) {
        // create two lighter colors
        hslChange1.l = hslIn.l + lChange;
        hslChange2.l = hslIn.l + (lChange * 2);
    }
    else if ((hslIn.l + lChange) > 100) {
        // create two darker colors
        hslChange1.l = hslIn.l - lChange;
        hslChange2.l = hslIn.l - (lChange * 2);
    }
    else {
        // create a lighter and a darker color
        hslChange1.l = hslIn.l + lChange;
        hslChange2.l = hslIn.l - lChange;
    }

    // convert changes back to hex
    const hexChange1 = HSLToHex(hslChange1);
    const hexChange2 = HSLToHex(hslChange2);

    paletteListMonochrome.push(hexString);
    paletteListMonochrome.push(hexChange1);
    paletteListMonochrome.push(hexChange2);

    return paletteListMonochrome;
}

function setColor(idName, hexColor) {
    const colordiv = document.querySelector(`#${idName}`);
    colordiv.setAttribute('style', `background-color: ${hexColor}`);
    const colorp = document.querySelector(`#${idName} p`);
    colorp.textContent = hexColor;
}

function RenderColors() {
    const triadic = CalculateTriadic();
    const complimentary = CalculateComplimentary();
    const monochromatic = CalculateMonochromatic();

    // set all inital colors
    const initialColors = document.querySelectorAll('.initial-color');

    initialColors.forEach((element) => {
        element.setAttribute('style', `background-color: ${userSelect.value}`);
    });

    const initialColorsp = document.querySelectorAll('.initial-color p');
    
    initialColorsp.forEach((pelement) => {
        pelement.textContent = userSelect.value;
    });

    // set compliment
    setColor("compliment1", complimentary[1]);

    // set triadic
    setColor("triadic1", triadic[1]);
    setColor("triadic2", triadic[2]);

    // set monochrome
    setColor("monochrome1", monochromatic[1]);
    setColor("monochrome2", monochromatic[2]);
}

function showColor() {
    console.log(userSelect.value);
    RenderColors();
}

userSelect.addEventListener("input", showColor, false);

//Adding open close functionality to save palette button.
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

    closeButton.addEventListener("click", () => {
        dialog.close()
    });