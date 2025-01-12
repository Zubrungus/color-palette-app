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
        
        const pointer = getPointer();
        console.log(pointer.x + ', ' + pointer.y);
        colorCalc(pointer.x, pointer.y);
    };
    return;
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

        storePointer(mouseGradientX, mouseGradientY);
        colorCalc(mouseGradientX, mouseGradientY);
    };
    return;
};

function colorCalc(pointerX, pointerY){
    //Logic to discern what color the pointer is over
    const gradientPercentX = pointerX / 300;
    const gradientPercentY = pointerY / 300;

    const whitePercent = (gradientPercentX - 1) * (-1);
    const blackPercent = (gradientPercentY - 1) * (-1);

    const redDiff = 255 - baseRed;
    const greenDiff = 255 - baseGreen;
    const blueDiff = 255 - baseBlue;

    const calculatedRed = (baseRed + (redDiff * whitePercent)) * blackPercent;
    const calculatedGreen = (baseGreen + (greenDiff * whitePercent)) * blackPercent;
    const calculatedBlue = (baseBlue + (blueDiff * whitePercent)) * blackPercent;

    showColor(getHexString(calculatedRed, calculatedGreen, calculatedBlue));
    return;
}

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