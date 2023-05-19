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



document.getElementById('line').addEventListener("click", function (){setDrawingMode("line");});
document.getElementById('circle').addEventListener("click", function (){setDrawingMode("circle");});
document.getElementById('rectangle').addEventListener("click", function (){setDrawingMode("rectangle");});
document.getElementById('free').addEventListener("click", function (){setDrawingMode("free");});

//클리어, 다운로드버튼 이벤트 리스너 추가
clearBtn.addEventListener("click", clearCanvas);
downloadBtn.addEventListener("click", download);

// 캔버스 그리기 이벤트 리스너 추가
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", moving);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

function clearCanvas(){
  context.clearRect(0,0,canvas.width,canvas.height);
  subContext.clearRect(0,0,subCanvas.width,subCanvas.height);
}

//그리기 모드 전환
function setDrawingMode(mode) {drawingMode = mode;}

// 다운로드 버튼 구현
function download() {
  let dl = document.getElementById("download");
  image = document.getElementById("myCanvas")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
  dl.setAttribute("href", image);
  dl.setAttribute("download","image-name.png");
}

//그리기 시작
function startDrawing(event) {
  const canvasRect = canvas.getBoundingClientRect(); // 캔버스 요소의 크기와 위치 정보를 가져옴
  startX = event.clientX - canvasRect.left;
  startY = event.pageY - (canvasRect.top + window.pageYOffset);
  context.strokeStyle = document.getElementById("selColor").value;
  context.lineWidth = document.getElementById("selLineWidth").value;
}

//그리는 중
function moving(event) {
  if (startX === undefined || startY === undefined) return;
  const canvasRect = canvas.getBoundingClientRect();
  let currentX = event.clientX - canvasRect.left;
  let currentY = event.pageY - (canvasRect.top + window.pageYOffset);

  if (drawingMode === "free"){
    context.beginPath();
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

  switch (drawingMode){
    case "line":
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(currentX, currentY);
      context.stroke(); break;
    case "circle":
      let radius = Math.sqrt(
          Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
      context.beginPath();
      context.arc(startX, startY, radius, 0, 2 * Math.PI);
      context.stroke(); break;
    case "rectangle":
      let width = currentX - startX;
      let height = currentY - startY;
      context.strokeRect(startX, startY, width, height);
  }

}
//그리기 종료
function stopDrawing() {
  startX = undefined;
  startY = undefined;
  subContext.drawImage(canvas,0,0);
}


/*
                <div class="canvas">
                  <div class="menuBar">
                    <div class="option">
                      <label for="selColor">색상:</label>
                      <input type="color" id="selColor">
                    </div>
                    <div class="option">
                      <label for="selLineWidth">굵기:</label>
                      <input type="number" id="selLineWidth" value="5">
                    </div>
                    <div class="option select">
                      <div class="free list-inline">
                        <img src="free.png" alt="loading fail" id="free">
                      </div>
                      <div class="line">
                        <img src="line.png" alt="loading fail" id="line">
                      </div>
                      <div class="circle">
                        <img src="circle.png" alt="loading fail" id="circle">
                      </div>
                      <div class="rectangle">
                        <img src="rectangle.png" alt="loading fail" id="rectangle">
                      </div>
                    </div>
                  </div>
                  <div class="drawingField">
                    <canvas id="myCanvas" width="1000" height="600" style="border: 2px solid black"></canvas>
                  </div>
                  <div>
                    <a id="clear">
                      <button class="btn btn-default" type="button">Clear</button>
                    </a>
                    <a id="download">
                      <button class="btn btn-default" type="button">Image Download</button>
                    </a>
                  </div>
                </div>
 */