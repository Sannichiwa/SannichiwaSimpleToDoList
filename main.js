let addToDoButton = document.getElementById('addToDoBtn');
let toDoContainer = document.getElementById('toDoContainer');
let inputFieldToDo = document.getElementById('inputFieldToDo');
const clear = document.querySelector('.clear');

// this will make the stored-data in localStorage available as a JavaScript-array, instead of LocalStorage-data
// start the app with checking if the stored-data is empty/null and if so, then create an empty array
// let storedInput = JSON.parse(localStorage.getItem('textInput'));
// if (storedInput === '' || storedInput === null) {
//     storedInput = [];
//     // push it to localStorage with JSON.stringify()
//     localStorage.setItem('textInput', JSON.stringify(storedInput));
// }
// TEST TEST TEST TEST TEST
let storedInput = localStorage.getItem('textInput');
if (storedInput === '' || storedInput === null) {
    storedInput = [];
    // push it to localStorage with JSON.stringify()
    localStorage.setItem('textInput', JSON.stringify(storedInput));
}
storedInput = JSON.parse(storedInput);

addToDoButton.addEventListener('click', function () {
    // RETURN/BREAK if the input field is empty
    if (inputFieldToDo.value === '') return;

    saveToLocalStorage();
    displayStoredToDoList();
});

const removeToDo = (paragraph) => {
    toDoContainer.removeChild(paragraph);

    // this will return every toDo that is NOT(!==) the same
    storedInput = storedInput.filter((toDo) => toDo !== paragraph.innerText);

    // then stringify(JSON.stringify()) the new array and store it in localStorage
    localStorage.setItem('textInput', JSON.stringify(storedInput));
};

//Execute a function when the user releases a key on the keyboard
inputFieldToDo.addEventListener('keyup', function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById('addToDoBtn').click();
    }
});

const saveToLocalStorage = () => {
    // 'storedInput' will get/be added a new value by this spread-function
    // spread-function is like = [all-content-from-an-array, the-new-value-to-be-added]
    // https://www.samanthaming.com/tidbits/14-combine-multiple-arrays-using-spread/
    storedInput = [...storedInput, inputFieldToDo.value];

    // then stringify(JSON.stringify()) the new array and store it in localStorage
    localStorage.setItem('textInput', JSON.stringify(storedInput));
};

// clear the local storage
clear.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});

const displayStoredToDoList = () => {
    // FIRST remove everything from 'toDoContainer' to rerender it again
    toDoContainer.innerHTML = '';

    // NEXT, loop through EVERY-SINGLE toDo in the STORED toDo-list AND render/display it
    for (let toDo of storedInput) {
        let paragraph = document.createElement('li');
        paragraph.classList.add('paragraph-styling', 'to-dos');
        paragraph.innerText = toDo;

        toDoContainer.appendChild(paragraph);
        inputFieldToDo.value = '';

        paragraph.addEventListener('click', function () {
            paragraph.style.textDecoration = 'line-through';
        });
        paragraph.addEventListener('dblclick', function () {
            removeToDo(paragraph);
        });
    }
};

// This method will start when everything above is created/stored/done.
// This method will get the local-stored data and display it
displayStoredToDoList();
