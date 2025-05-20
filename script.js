const gridWidth = 64;
const gridHeight = 64;

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

function drawFilledRect(x, y, width, height) {
  const coords = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      coords.push([x + i, y + j]);
    }
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
  ...drawCircle(32, 32, 20),

  // Eyes (large pupils)
  ...drawFilledRect(22, 24, 4, 4), // Left eye
  ...drawFilledRect(38, 24, 4, 4), // Right eye

  // Eyebrows
  ...drawLine(20, 22, 26, 22), // Left eyebrow
  ...drawLine(38, 22, 44, 22), // Right eyebrow

  // Mouth (smile arc)
  ...drawArc(32, 38, 12, Math.PI * 0.1, Math.PI * 0.9),
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

    //add "smile" function
    if (description.includes("smile")) {
      if (smileIndices.includes(i)) {
        dot.classList.add("on");
      }

      //add "tree" function
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

//

// First simle random generation attempt:

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
