let addToDoButton = document.getElementById("addToDoBtn");
let toDoContainer = document.getElementById("toDoContainer");
let inputFieldToDO = document.getElementById("inputFieldToDo");
const storedInput = localStorage.getItem("textInput");
const clear = document.querySelector(".clear");

addToDoButton.addEventListener("click", function () {
  let paragraph = document.createElement("li");
  paragraph.classList.add("paragraph-styling", "to-dos");
  paragraph.innerText = inputFieldToDO.value;

  saveToLocalStorage(inputFieldToDO.value);

  toDoContainer.appendChild(paragraph);
  inputFieldToDO.value = "";

  paragraph.addEventListener("click", function () {
    paragraph.style.textDecoration = "line-through";
  });
  paragraph.addEventListener("dblclick", function () {
    toDoContainer.removeChild(paragraph);
  });
});

//Execute a function when the user releases a key on the keyboard
inputFieldToDO.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("addToDoBtn").click();
  }
});

const saveToLocalStorage = (newValue) => {
  localStorage.setItem("textInput", toDoContainer.textContent); //ORRI
};

addToDoButton.addEventListener("click", saveToLocalStorage);

if (inputFieldToDO) {
  toDoContainer.textContent = storedInput;
}

// clear the local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
