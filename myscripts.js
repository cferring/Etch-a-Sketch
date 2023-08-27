// DEFAULTS
const DEFAULT_COLOR = '#333333'
const DEFAULT_SIZE = 64
const DEFAULT_MODE = 'color'

let currentColor = DEFAULT_COLOR
let currentSize = DEFAULT_SIZE
let currentMode = DEFAULT_MODE


// Find Grid element
const grid = document.getElementById("grid");

// Make rows and columns x size
function createGrid(size) {
    // set Grid element to be a grid of given dimensions
    grid.style.setProperty('--grid-rows', size);
    grid.style.setProperty('--grid-cols', size);
    // Generate each cell inside grid, put event listeners on them
    for (c = 0; c < (size * size); c++) {
        let gridElement = document.createElement("div");
        gridElement.classList.add("grid-element");
        // Add Event Listeners
        gridElement.addEventListener('mouseover', draw);
        gridElement.addEventListener('mousedown', draw);
        grid.appendChild(gridElement);
    };
};

// Mousedown variable allows us to click, drag the pencil around, and then unclick
// basically true while holding down click
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// Function to change color of target cell. 
// If just mousing over but already un-clicked, do nothing
// otherwise, draw when called
function draw(e) {
    // When NOT to draw when called
    if (e.type === 'mouseover' && !mouseDown) return
    console.log(e.type);
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
}

// Press COLOR PICK button, mode change
let colorPick = document.getElementById("colorPick");
colorPick.addEventListener('click', () => {
    currentMode = 'color';
})
// Press ERASER button, mode change
let eraser = document.getElementById("eraser");
eraser.addEventListener('click', () => {
    currentMode = 'eraser';
})
// // Press RAINBOW button, mode change
// let rainbow = document.getElementById("rainbow");
// rainbow.addEventListener('click', () => {
//     currentMode = 'rainbow';
// })
// Press CLEAR button, clear
let clear = document.getElementById("clear");
clear.addEventListener('click', () => {
    reloadGrid();
})

// Size Slider. reloads grid when changed, updates new size text
const sizeSlider = document.getElementById('sizeSlider');
// event listener for slider use
sizeSlider.addEventListener('click', (e) => {
    // send slider value to variable, display variable
    sliderValue = e.target.value;
    console.log(sliderValue);
    currentSize = sliderValue;
    // change html of slider
    const sizeValue = document.getElementById('sizeValue');
    sizeValue.innerHTML = `${sliderValue} x ${sliderValue}`;
    // reload grid with new size
    reloadGrid();
})

function reloadGrid() {
    clearGrid()
    createGrid(currentSize)
}
  
function clearGrid() {
    grid.innerHTML = ''
}

colorPicker.oninput = (e) => {
    currentColor = e.target.value;
}

// Run
createGrid(DEFAULT_SIZE);


// When the web page loads, begin program
// window.onload = () => {
//     createGrid(16, 16);
    // other stuff comes next

//   }