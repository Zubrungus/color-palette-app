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

// event listeners
complimentSave.addEventListener('click', function (event) {
    const palette = {
        name: "Complimentary",
        colors: CalculateComplimentary()
    }

    SaveNewPalette(palette);
});

triadicSave.addEventListener('click', function (event) {
    const palette = {
        name: "Triadic",
        colors: CalculateTriadic()
    }

    SaveNewPalette(palette);
});

monochromeSave.addEventListener('click', function (event) {
    const palette = {
        name: "Monochromatic",
        colors: CalculateMonochromatic()
    }

    SaveNewPalette(palette);
});