let canvas = document.getElementById("myCanvas");
let subCanvas = document.createElement('canvas');
subCanvas.width = canvas.width;
subCanvas.height = canvas.height;
let context = canvas.getContext("2d");
let subContext = subCanvas.getContext("2d");
let clearBtn = document.getElementById('clear');
let downloadBtn = document.getElementById('download');
let startX, startY;
let drawingMode = "free";  // 기본 그리기 모드는 선(line)으로 설정
let image = document.getElementById("myCanvas")
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");


function setDrawingMode(mode) {drawingMode = mode;}
document.getElementById('line').addEventListener("click", function (e){setDrawingMode("line");});
document.getElementById('circle').addEventListener("click", function (e){setDrawingMode("circle");});
document.getElementById('rectangle').addEventListener("click", function (e){setDrawingMode("rectangle");});
document.getElementById('free').addEventListener("click", function (e){setDrawingMode("free");});

clearBtn.addEventListener("click", clearCanvas);
downloadBtn.addEventListener("click", download);

function clearCanvas(){
  context.clearRect(0,0,canvas.width,canvas.height);
}

// 다운로드 기능
function download() {
  let dl = document.getElementById("download");
  image = document.getElementById("myCanvas")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
  dl.setAttribute("href", image);
  dl.setAttribute("download","image-name.png");
}

// 캔버스 그리기 이벤트 리스너 추가
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

  if (drawingMode === "free"){
    context.beginPath();
    context.strokeStyle = document.getElementById("selColor").value;
    context.lineWidth = document.getElementById("selLineWidth").value;
    context.moveTo(startX, startY);
    context.lineTo(currentX, currentY);
    context.stroke();
    subContext.drawImage(canvas,0,0);
    startX = currentX;
    startY = currentY;
    return;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(subCanvas,0,0);


  if (drawingMode === "line") {
    // 선 그리기
    context.beginPath();
    context.strokeStyle = document.getElementById("selColor").value;
    context.lineWidth = document.getElementById("selLineWidth").value;
    context.moveTo(startX, startY);
    context.lineTo(currentX, currentY);
    context.stroke();
  } else if (drawingMode === "circle") {
    // 원 그리기
    let radius = Math.sqrt(
        Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2)
    );
    context.beginPath();
    context.strokeStyle = document.getElementById("selColor").value;
    context.lineWidth = document.getElementById("selLineWidth").value;
    context.arc(startX, startY, radius, 0, 2 * Math.PI);
    context.stroke();
  } else if (drawingMode === "rectangle") {
    // 사각형 그리기
    context.strokeStyle = document.getElementById("selColor").value;
    context.lineWidth = document.getElementById("selLineWidth").value;
    let width = currentX - startX;
    let height = currentY - startY;
    context.strokeRect(startX, startY, width, height);
  }
}

function stopDrawing() {
  startX = undefined;
  startY = undefined;
  subContext.drawImage(canvas,0,0);
}
