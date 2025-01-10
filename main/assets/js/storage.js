// save buttons
const complimentSave = document.querySelector('#compliment-save');
const triadicSave = document.querySelector("#triadic-save");
const monochromeSave = document.querySelector("#monochrome-save");

function GetSavedPalettes() {
    let savedPalettes = JSON.parse(localStorage.getItem('palettes'));

    if (savedPalettes === null) {
        savedPalettes = [];
    }

    return savedPalettes;
}

function SaveNewPalette(palette) {
    const allPalettes = GetSavedPalettes();
    allPalettes.push(palette);    
    localStorage.setItem('palettes', JSON.stringify(allPalettes));
}

function StoreLastColor(hex) {
    localStorage.setItem('lastColor', hex);
}

function InitializeColors() {
    const lastColor = localStorage.getItem('lastColor');

    if (lastColor !== null || lastColor !== "") {
        RenderColors(lastColor);
        userSelect.value = lastColor;
    }
}

// event listeners
complimentSave.addEventListener('click', function (event) {
    const palette = {
        name: "Complimentary",
        colors: CalculateComplimentary(userSelect.value)
    }

    SaveNewPalette(palette);
});

triadicSave.addEventListener('click', function (event) {
    const palette = {
        name: "Triadic",
        colors: CalculateTriadic(userSelect.value)
    }

    SaveNewPalette(palette);
});

monochromeSave.addEventListener('click', function (event) {
    const palette = {
        name: "Monochromatic",
        colors: CalculateMonochromatic(userSelect.value)
    }

    SaveNewPalette(palette);
});

InitializeColors()