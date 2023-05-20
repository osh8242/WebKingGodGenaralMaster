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

// div 설정
let freediv = document.getElementById('freediv');
let linediv = document.getElementById('linediv');
let circlediv = document.getElementById('circlediv');
let rectanglediv = document.getElementById('rectanglediv');

document.getElementById('line').addEventListener("click", function (){setDrawingMode("line");});
document.getElementById('circle').addEventListener("click", function (){setDrawingMode("circle");});
document.getElementById('rectangle').addEventListener("click", function (){setDrawingMode("rectangle");});
document.getElementById('free').addEventListener("click", function (){setDrawingMode("free");});


document.getElementById('freediv').addEventListener("click", function (){inputeffect(freediv);});
document.getElementById('linediv').addEventListener("click", function (){inputeffect(linediv);});
document.getElementById('circlediv').addEventListener("click", function (){inputeffect(circlediv);});
document.getElementById('rectanglediv').addEventListener("click", function (){inputeffect(rectanglediv);});


//처음 실행시 선택된 free에 효과주기
const imageContainer = document.getElementById('freediv');
const shimmerEffect = document.createElement('div');
shimmerEffect.classList.add('shimmer-effect');
imageContainer.appendChild(shimmerEffect);

//선택된 div에 효과넣기
function inputeffect(seleffect){
  removeEffect();
  const imageContainer = seleffect;
  const shimmerEffect = document.createElement('div');
  shimmerEffect.classList.add('shimmer-effect');
  imageContainer.appendChild(shimmerEffect);
}

//효과 삭제
function removeShimmerEffect(elementId) {
  const imageContainer = document.getElementById(elementId);
  const shimmerEffect = imageContainer.querySelector('.shimmer-effect');
  if (shimmerEffect) {
    imageContainer.removeChild(shimmerEffect);
  }
}

function removeEffect(){
  removeShimmerEffect('rectanglediv');
  removeShimmerEffect('circlediv');
  removeShimmerEffect('freediv');
  removeShimmerEffect('linediv');
}




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
