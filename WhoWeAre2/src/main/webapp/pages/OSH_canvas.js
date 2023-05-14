let cv = document.getElementById("myCanvas");
let obj = cv.getContext("2d"); // 그림 객체
let startX, startY; // 시작좌표
let isDrawing = false; // 그리기 상태
let downBtn = document.getElementById("download").childNodes[0];
let clearBtn = document.getElementById("clearBtn").childNodes[0];


cv.addEventListener('mousedown', function(e) {mouseDown(e)}, false);
cv.addEventListener('mousemove', function(e) {mouseMove(e)}, false);
cv.addEventListener('mouseup', function(e) {mouseUp(e)}, false);

clearBtn.addEventListener('click',clearCanvas());
downBtn.addEventListener('click',download());


function draw(curX, curY){
  obj.beginPath();
  obj.strokeStyle = document.getElementById("selColor").value;
  obj.lineWidth = document.getElementById("selLineWidth").value;
  obj.moveTo(startX, startY);
  obj.lineTo(curX, curY);
  obj.stroke();
}

function mouseDown (e){
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
}
function mouseMove(e){
  if(!isDrawing) return;
  let curX = e.offsetX;
  let curY = e.offsetY;
  draw(curX, curY);
  startX = curX;
  startY = curY;  
}
function mouseUp(){
  isDrawing = false;
}