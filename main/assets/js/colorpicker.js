//Code for custom color picker
const sliderBackground = document.querySelector("#slider-background");
const sliderEl = document.querySelector("#slider");
const baseColor = document.querySelector("#base-color");
const twoDimensionalGradient = document.querySelector(".gradient2");
const pointerEl = document.querySelector("#pointer");
let sliderMouseDown = false;
let pointerMouseDown = false;
let baseRed = 0;
let baseGreen = 0;
let baseBlue = 0;
let pointerPosX = 0;
let pointerPosY = 0;

function updateSlider(mouse) {

    if (sliderMouseDown) {
        const sliderBackgroundRect = sliderBackground.getBoundingClientRect();
        let mousePosInSlider = mouse.clientY - sliderBackgroundRect.y;
        

        //Prevent slider from being set outside the range of the background, then place slider
        if (mousePosInSlider < 0) {
            mousePosInSlider = 0;
        } else if (mousePosInSlider > 300) {
            mousePosInSlider = 300;
        }
        sliderEl.style.top = mousePosInSlider + "px";

        sliderCalc(mousePosInSlider);

        

        storeSlider(sliderEl.style.top);

        const pointer = getPointer();
        colorCalc(pointer.x, pointer.y);
    };
    return;
};

function sliderCalc(mousePosInSlider){
    let red = 0;
    let green = 0;
    let blue = 0;

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
}



function updatePointer(mouse) {
    if (pointerMouseDown) {
        const gradientRect = twoDimensionalGradient.getBoundingClientRect();
        const baseHex = baseColor.style.background;
        let mouseGradientX = Math.round(mouse.clientX - gradientRect.x);
        let mouseGradientY = Math.round(mouse.clientY - gradientRect.y);

        //Prevent pointer from being set outside the range of the background, then place pointer
        if (mouseGradientX < 0) {
            mouseGradientX = 0;
        } else if (mouseGradientX > 300) {
            mouseGradientX = 300;
        };
        pointerEl.style.left = (mouseGradientX - 1) + "px";

        if (mouseGradientY < 0) {
            mouseGradientY = 0;
        } else if (mouseGradientY > 300) {
            mouseGradientY = 300;
        };
        pointerEl.style.top = (mouseGradientY - 1) + "px";

        pointerPosX = mouseGradientX;
        pointerPosY = mouseGradientY;
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

function colorInit(){
    let slider = getSlider();
    let pointer = getPointer();
    pointerPosX = pointer.x;
    pointerPosY = pointer.y;

    sliderEl.style.top = slider + "px";
    sliderCalc(slider);

    pointerEl.style.left = (pointerPosX - 1) + "px";
    pointerEl.style.top = (pointerPosY - 1) + "px";
    colorCalc(pointerPosX, pointerPosY);

};

//Listening for clicks/mouse movement on the background or slider
sliderBackground.addEventListener("mousedown", function (mouse) {
    sliderMouseDown = true;
    updateSlider(mouse);
});

sliderEl.addEventListener("mousedown", function (mouse) {
    sliderMouseDown = true;
    updateSlider(mouse);
});

document.addEventListener("mouseup", function () {
    sliderMouseDown = false;
    pointerMouseDown = false;
});

sliderBackground.addEventListener("mousemove", updateSlider);
sliderEl.addEventListener("mousemove", updateSlider);

//Listening for clicks on the 2D gradient
twoDimensionalGradient.addEventListener("mousedown", function (mouse) {
    pointerMouseDown = true;
    updatePointer(mouse);
});

pointerEl.addEventListener("mousedown", function (mouse) {
    pointerMouseDown = true;
    updatePointer(mouse);
});

twoDimensionalGradient.addEventListener("mousemove", updatePointer);
pointer.addEventListener("mousemove", updatePointer);

colorInit();