const dialog = document.querySelector('dialog');
const showButton = document.querySelector('dialog + button');
const closeButton = document.querySelector('dialog button');

showButton.addEventListener('click', () => {
    dialog.show()
});

closeButton.addEventListener('click', () => {
    dialog.close()
});
