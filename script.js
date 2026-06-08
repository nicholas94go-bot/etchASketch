const container = document.querySelector(".container");
const allDivs = document.createElement("div");
const resetBtn = document.querySelector("#resetBtn");
resetBtn.style.marginBottom = "10px";
resetBtn.style.padding = "10px 20px";
resetBtn.style.fontSize = "16px";
resetBtn.style.cursor = "pointer";
resetBtn.style.backgroundColor = "blue";
resetBtn.style.color = "white";
resetBtn.style.border = "none";
resetBtn.style.borderRadius = "5px";
resetBtn.addEventListener("mouseover", () => {
  resetBtn.style.backgroundColor = "#45a049";
});

let maxDivs = 100;
let count = 0;


// Track global mouse drawing status
let isDrawing = false;

window.addEventListener('mousedown', (e) => {
  e.preventDefault(); 
  isDrawing = true;
});

window.addEventListener('mouseup', () => {
  isDrawing = false;
});

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 80%, 60%)`;
}
function createGrid(size) {
  container.textContent = "";

  const squareSizePercentage = 100 / size;
  const totalSquares = size * size;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = `${squareSizePercentage}%`;
    square.style.height = `${squareSizePercentage}%`;

    // Draw random color instantly on initial target click
    square.addEventListener("mousedown", () => {
      square.style.backgroundColor = getRandomColor();
    });

    // Draw random colors as the user drags across squares
    square.addEventListener("mouseenter", () => {
      if (isDrawing) {
        square.style.backgroundColor = getRandomColor();
      }
    });

    container.appendChild(square);
  }
}

// Reset trigger setup
resetBtn.addEventListener("click", () => {
  let userInput = prompt("Enter the number of squares per side (Max 100):");
  let gridSize = parseInt(userInput);

  if (!isNaN(gridSize) && gridSize > 0 && gridSize <= 100) {
    createGrid(gridSize);
  } else if (gridSize > 100) {
    alert("Please enter a number 100 or less to prevent browser lag!");
  } else {
    alert("Please enter a valid number.");
  }
});

// Initialize canvas setup
createGrid(16);
