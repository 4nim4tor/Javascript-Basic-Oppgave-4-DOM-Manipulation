const gridWidth = 128;
const gridHeight = 128;

// === Helper functions for shapes ===
function drawCircle(cx, cy, radius) {
  const coords = [];
  for (let angle = 0; angle < 360; angle++) {
    const rad = angle * (Math.PI / 180);
    const x = Math.round(cx + radius * Math.cos(rad));
    const y = Math.round(cy + radius * Math.sin(rad));
    coords.push([x, y]);
  }
  return coords;
}

function drawArc(cx, cy, radius, startAngle, endAngle) {
  const coords = [];
  for (let angle = startAngle; angle <= endAngle; angle += 0.05) {
    const x = Math.round(cx + radius * Math.cos(angle));
    const y = Math.round(cy + radius * Math.sin(angle));
    coords.push([x, y]);
  }
  return coords;
}

function drawLine(x1, y1, x2, y2) {
  const coords = [];
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  for (let i = 0; i <= steps; i++) {
    const x = Math.round(x1 + (dx * i) / steps);
    const y = Math.round(y1 + (dy * i) / steps);
    coords.push([x, y]);
  }
  return coords;
}

function drawFilledRect(x, y, width, height) {
  const coords = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      coords.push([x + i, y + j]);
    }
  }
  return coords;
}

function drawTriangle(baseX, baseY, height) {
  const coords = [];
  for (let y = 0; y < height; y++) {
    const startX = baseX - y;
    const endX = baseX + y;
    for (let x = startX; x <= endX; x++) {
      coords.push([x, baseY + y]);
    }
  }
  return coords;
}

// Smiley Face (Larger, rounded, with more detail)
const smileCoords = [
  // Outline of a large circle
  ...drawCircle(63, 63, 40),
  ...drawCircle(64, 64, 40),

  // Eyes (large pupils)
  ...drawFilledRect(48, 48, 8, 8), // Left eye
  ...drawFilledRect(74, 48, 8, 8), // Right eye

  // Eyebrows
  ...drawLine(44, 44, 56, 44),
  ...drawLine(43, 43, 57, 45), // Left eyebrow
  ...drawLine(72, 44, 84, 44),
  ...drawLine(71, 45, 85, 43), // Right eyebrow

  // Mouth (smile arc)
  ...drawArc(64, 64, 24, Math.PI * 0.1, Math.PI * 0.9),
  ...drawArc(64, 64, 25, Math.PI * 0.1, Math.PI * 0.9),
];

// Tree (Large triangle canopy with thicker trunk)
const treeCoords = [
  // Triangle-like canopy
  ...drawTriangle(32, 10, 12),
  ...drawTriangle(32, 18, 14),

  // Trunk
  ...drawFilledRect(30, 32, 5, 12),
];

function toIndex(x, y) {
  return y * gridWidth + x;
}

// Main generation function
function generateDotArt() {
  const description = document
    .getElementById("description")
    .value.toLowerCase();
  const grid = document.getElementById("dotArtGrid");
  grid.innerHTML = ""; // Clear previous art

  const smileIndices = smileCoords.map(([x, y]) => toIndex(x, y));
  const treeIndices = treeCoords.map(([x, y]) => toIndex(x, y));

  for (let i = 0; i < gridWidth * gridHeight; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    // add "smile" function
    if (description.includes("smile")) {
      if (smileIndices.includes(i)) {
        dot.classList.add("on");
      }

      // add "tree" function
    } else if (description.includes("tree")) {
      if (treeIndices.includes(i)) {
        dot.classList.add("on");
      }
    } else {
      // generate random art
      if (Math.random() > 0.8) {
        dot.classList.add("on");
      }
    }
    // add manual "drawing"
    dot.addEventListener("click", () => {
      dot.classList.toggle("on");
    });

    grid.appendChild(dot);
  }
}

// Clear grid button function
function clearDotArt() {
  const grid = document.getElementById("dotArtGrid");
  const dots = grid.querySelectorAll(".dot");
  dots.forEach((dot) => dot.classList.remove("on"));
}

// Activate input field content with "Enter"

const inputAct = document.querySelector("#textInput");
inputAct.addEventListener("submit", (e) => {
  e.preventDefault();
  generateDotArt();
});

// Coordinate system
dot.setAttribute("data-coords", `(${x}, ${y})`);

// --- ChatGPT suggested solution for "Enter"-field activation ---

// document.addEventListener("DOMContentLoaded", () => {
//   const input = document.getElementById("description");

//   input.addEventListener("keydown", (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       generateDotArt();
//     }
//   });
// });

//---

//

// First simple random generation attempt:

// function toIndex(x, y) {
//   return y * gridWidth + x;
// }

// function generateDotArt() {
//   const grid = document.getElementById("dotArtGrid");
//   grid.innerHTML = ""; // Clear previous art

//   for (let i = 0; i < gridWidth * gridHeight; i++) {
//     const dot = document.createElement("div");
//     dot.classList.add("dot");

//     // Random dot activation
//     if (Math.random() > 0.8) {
//       dot.classList.add("on");
//     } else if ()

//     grid.appendChild(dot);
//   }
// }
