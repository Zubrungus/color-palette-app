// save buttons
const complimentSave = document.querySelector('#compliment-save');
const triadicSave = document.querySelector("#triadic-save");
const monochromeSave = document.querySelector("#monochrome-save");

// modal elements
const showSaved = document.querySelector("#show-saved-button");
const closeSaved = document.querySelector("#close-saved-button");
const clearSaved = document.querySelector("#clear-saved-button");
const savedPaletteBody = document.querySelector("#saved-palette-body");
const closeExplain = document.querySelector("#close-explain-button");

//modal
function GetSavedPalettes() {
    let savedPalettes = JSON.parse(localStorage.getItem('palettes'));

    if (savedPalettes === null) {
        savedPalettes = [];
    }

    return savedPalettes;
};

function SaveNewPalette(palette) {
    const allPalettes = GetSavedPalettes();
    allPalettes.push(palette);
    localStorage.setItem('palettes', JSON.stringify(allPalettes));
};

function StoreLastColor(hex) {
    localStorage.setItem('lastColor', hex);
};

function InitializeColors() {
    const lastColor = localStorage.getItem('lastColor');
    if (lastColor) {
        RenderColors(lastColor);
    }
};

function storePointer(pointerX, pointerY){
    localStorage.setItem('pointer', JSON.stringify({
        x: pointerX,
        y: pointerY
    }));
    return;
};

function getPointer(){
    const pointer = JSON.parse(localStorage.getItem('pointer'));
    return pointer;
};

function storeSlider(slider){
    localStorage.setItem('slider', parseInt(slider));
};

function getSlider(){
    slider = localStorage.getItem('slider');
    return slider;
};

function UpdateSavedModal() {
    const savedPalettes = GetSavedPalettes();

    savedPalettes.forEach(palette => {
        let message = `${palette.name}: ` + palette.colors.join(', ');
        const messageEl = document.createElement("p");
        messageEl.textContent = message;
        savedPaletteBody.appendChild(messageEl);
    });
};


//tooltips
function complimentTooltipFun () {
  const complimentTooltip = document.querySelector("#compliment-tooltip");
  complimentTooltip.style.display = "none";

  if (complimentTooltip.style.display === "none") {
      complimentTooltip.style.display = "block";
  }
  else{
    complimentTooltip.style.display  = "none";
  }
};

function triadTooltipFun () {
  const triadTooltip = document.querySelector("#triad-tooltip");
  triadTooltip.style.display = "none";

  if (triadTooltip.style.display === "none") {
      triadTooltip.style.display = "block";
  }
  else{
    triadTooltip.style.display  = "none";
  }
};

function monoTooltipFun () {
  const monoTooltip = document.querySelector("#mono-tooltip");
  monoTooltip.style.display = "none";

  if (monoTooltip.style.display === "none") {
      monoTooltip.style.display = "block";
  }
  else{
    monoTooltip.style.display  = "none";
  }
};

// event listeners
complimentSave.addEventListener('click', function (event) {
  const palette = {
    name: "Complimentary",
    colors: CalculateComplimentary(hexValue)
  }
  SaveNewPalette(palette);
  complimentTooltipFun();
});


triadicSave.addEventListener('click', function (event) {
    const palette = {
        name: "Triadic",
        colors: CalculateTriadic(hexValue)
    }

    SaveNewPalette(palette);
    triadTooltipFun();
});

monochromeSave.addEventListener('click', function (event) {
    const palette = {
        name: "Monochromatic",
        colors: CalculateMonochromatic(hexValue)
    }

    SaveNewPalette(palette);
    monoTooltipFun();
});

showSaved.addEventListener('click', UpdateSavedModal);

clearSaved.addEventListener('click', function (event) {
    localStorage.removeItem('palettes');
    savedPaletteBody.innerHTML = '';
});

closeSaved.addEventListener('click', function (event) {
    // clear to prevent duplicates when showing the saved modal again
    savedPaletteBody.innerHTML = '';

    if(document.activeElement) {
        document.activeElement.blur();
    }
});

closeExplain.addEventListener('click', function (event) {
    if(document.activeElement) {
        document.activeElement.blur();
    }
});

InitializeColors();