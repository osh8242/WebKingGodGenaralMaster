let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
let clearBtn = document.getElementById('clear');
let downloadBtn = document.getElementById('download');
let startX, startY;
let drawingMode = "line";  // 기본 그리기 모드는 선(line)으로 설정
let rectangles = [];
let circles = [];
let lines = [];

function setDrawingMode(mode) {
  drawingMode = mode;
}
let line = document.getElementById('line');
line.addEventListener("click", function (e){
  setDrawingMode("line");
});

let circle = document.getElementById('circle');
circle.addEventListener("click", function (e){
  setDrawingMode("circle");
});

let rectangle = document.getElementById('rectangle');
rectangle.addEventListener("click", function (e){
  setDrawingMode("rectangle");
});

let free = document.getElementById('free');
free.addEventListener("click", function (e){
  setDrawingMode("free");
});

clearBtn.addEventListener("click", clearCanvas);
downloadBtn.addEventListener("click", download);

function clearCanvas(){
  context.clearRect(0,0,canvas.width,canvas.height);
}

function download() {
  let dl = document.getElementById("download");
  let image = document.getElementById("myCanvas")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
  dl.setAttribute("href", image);
  dl.setAttribute("download","image-name.png");
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", moving);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);



function startDrawing(event) {
  startX = event.clientX - canvas.offsetLeft;
  startY = event.clientY - canvas.offsetTop;
}

function moving(event) {
  if (startX === undefined || startY === undefined) return;

  let currentX = event.clientX - canvas.offsetLeft;
  let currentY = event.clientY - canvas.offsetTop;

  context.clearRect(0, 0, canvas.width, canvas.height);

  if (drawingMode === "line") {
    // 선 그리기
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(currentX, currentY);
    context.stroke();
  } else if (drawingMode === "circle") {
    // 원 그리기
    let radius = Math.sqrt(
        Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2)
    );
    context.beginPath();
    context.arc(startX, startY, radius, 0, 2 * Math.PI);
    context.stroke();
  } else if (drawingMode === "rectangle") {
    // 사각형 그리기
    let width = currentX - startX;
    let height = currentY - startY;
    context.strokeRect(startX, startY, width, height);
  } else if (drawingMode === "free"){
    context.beginPath();
    context.strokeStyle = document.getElementById("selColor").value;
    context.lineWidth = document.getElementById("selLineWidth").value;
    context.moveTo(startX, startY);
    context.lineTo(currentX, currentY);
    context.stroke();
    startX = currentX;
    startY = currentY;
  }
}

function stopDrawing() {
  startX = undefined;
  startY = undefined;
}
