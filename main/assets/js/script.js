const userSelect = document.querySelector('#user-select');


function CalculateTriadic(hex) {
    /*
    Color 1: #RRBBGG (input)
    Color 2: #GGRRBB
    Color 3: #BBGGRR
    */
    const hexString = hex;
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

function CalculateComplimentary(hex) {
    /*
    Color 1: #RRGGBB (input)
    Color 2: #(F-R)(F-R)(F-G)(F-G)(F-B)(F-B) using hex math
    */
    const hexString = hex;
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

function CalculateMonochromatic(hex) {
    /*
    Change HSL 'lightness' value of the starting color to get
    the 2 other monochromatic colors.
    */
    const hexString = hex;
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

function RenderColors(hexIn) {
    const triadic = CalculateTriadic(hexIn);
    const complimentary = CalculateComplimentary(hexIn);
    const monochromatic = CalculateMonochromatic(hexIn);

    // set all inital colors
    const initialColors = document.querySelectorAll('.initial-color');

    initialColors.forEach((element) => {
        element.setAttribute('style', `background-color: ${hexIn}`);
    });

    const initialColorsp = document.querySelectorAll('.initial-color p');

    initialColorsp.forEach((pelement) => {
        pelement.textContent = hexIn;
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

function showColor(receivedColor) {
    RenderColors(receivedColor);
    StoreLastColor(receivedColor);
}

//userSelect.addEventListener("input", showColor, false);

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

//Code for custom color picker
const sliderBackground = document.querySelector("#slider-background");
const slider = document.querySelector("#slider");
const baseColor = document.querySelector("#base-color");
const twoDimensionalGradient = document.querySelector(".gradient2");
const pointer = document.querySelector("#pointer");
let mouseDown = false;
let baseRed = 170;
let baseGreen = 0;
let baseBlue = 255;

function updateSlider(mouse) {

    if (mouseDown) {
        const sliderBackgroundRect = sliderBackground.getBoundingClientRect();
        let mousePosInSlider = mouse.clientY - sliderBackgroundRect.y;
        let red = 0;
        let green = 0;
        let blue = 0;

        //Prevent slider from being set outside the range of the background, then place slider
        if (mousePosInSlider < 0) {
            mousePosInSlider = 0;
        } else if (mousePosInSlider > 300) {
            mousePosInSlider = 300;
        }
        slider.style.top = mousePosInSlider + "px";

        //Logic to discern what color the slider is over
        const sliderPercent = mousePosInSlider / 300;
        if (sliderPercent < 0.17) {
            red = 255;
            green = Math.round(255 * sliderPercent / (17 / 100));
        } else if (sliderPercent < 0.33) {
            red = Math.round(255 * (1 - (sliderPercent - 0.17) / (16 / 100)));
            green = 255;
        } else if (sliderPercent < 0.50) {
            green = 255;
            blue = Math.round(255 * (sliderPercent - 0.33) / (17 / 100));
        } else if (sliderPercent < 0.66) {
            green = Math.round(255 * (1 - (sliderPercent - 0.50) / (16 / 100)));
            blue = 255;
        } else if (sliderPercent < 0.83) {
            red = Math.round(255 * (sliderPercent - 0.66) / (17 / 100));
            blue = 255;
        } else {
            red = 255;
            blue = Math.round(255 * (1 - (sliderPercent - 0.83) / (17 / 100)));
        }

        //Store the decimal RGB values in a global var for the updatePointer function to use
        baseRed = red;
        baseGreen = green;
        baseBlue = blue;



        //Apply the resulting hex color to the main color picker background
        baseColor.style.background = getHexString(red, green, blue);

    };
};


function updatePointer(mouse) {
    if (mouseDown) {
        const gradientRect = twoDimensionalGradient.getBoundingClientRect();
        const baseHex = baseColor.style.background;
        let mouseGradientX = mouse.clientX - gradientRect.x;
        let mouseGradientY = mouse.clientY - gradientRect.y;

        //Prevent pointer from being set outside the range of the background, then place pointer
        if (mouseGradientX < 0) {
            mouseGradientX = 0;
        } else if (mouseGradientX > 300) {
            mouseGradientX = 300;
        };
        pointer.style.left = (mouseGradientX - 1) + "px";

        if (mouseGradientY < 0) {
            mouseGradientY = 0;
        } else if (mouseGradientY > 300) {
            mouseGradientY = 300;
        };
        pointer.style.top = (mouseGradientY - 1) + "px";

        //Logic to discern what color the pointer is over
        const gradientPercentX = mouseGradientX / 300;
        const gradientPercentY = mouseGradientY / 300;

        const whitePercent = (gradientPercentX - 1) * (-1);
        const blackPercent = (gradientPercentY - 1) * (-1);

        let redDiff = 255 - baseRed;
        let greenDiff = 255 - baseGreen;
        let blueDiff = 255 - baseBlue;

        let calculatedRed = (baseRed + (redDiff * whitePercent)) * blackPercent;
        let calculatedGreen = (baseGreen + (greenDiff * whitePercent)) * blackPercent;
        let calculatedBlue = (baseBlue + (blueDiff * whitePercent)) * blackPercent;

        showColor(getHexString(calculatedRed, calculatedGreen, calculatedBlue));
    };
};

function getHexString(red, green, blue) {
    let hexRed = Math.round(red).toString(16);
    let hexGreen = Math.round(green).toString(16);
    let hexBlue = Math.round(blue).toString(16);

    //If hex color is one character, add a 0 to the front
    if (hexRed.length == 1) {
        hexRed = "0" + hexRed;
    };
    if (hexGreen.length == 1) {
        hexGreen = "0" + hexGreen;
    };
    if (hexBlue.length == 1) {
        hexBlue = "0" + hexBlue;
    };

    return `#${hexRed}${hexGreen}${hexBlue}`;
}


//Listening for clicks/mouse movement on the background or slider
sliderBackground.addEventListener("mousedown", function (mouse) {
    mouseDown = true;
    updateSlider(mouse);
});

slider.addEventListener("mousedown", function (mouse) {
    mouseDown = true;
    updateSlider(mouse);
});

document.addEventListener("mouseup", function () {
    mouseDown = false;
});

sliderBackground.addEventListener("mousemove", updateSlider);
slider.addEventListener("mousemove", updateSlider);

//Listening for clicks on the 2D gradient
twoDimensionalGradient.addEventListener("mousedown", function (mouse) {
    mouseDown = true;
    updatePointer(mouse);
});

pointer.addEventListener("mousedown", function (mouse) {
    mouseDown = true;
    updatePointer(mouse);
});

twoDimensionalGradient.addEventListener("mousemove", updatePointer);
pointer.addEventListener("mousemove", updatePointer);