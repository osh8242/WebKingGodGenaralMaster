
		var canvas;
		var ctx;
		var sx, sy;					// 현재 위치
		var drawing = false;			// 현재 그리는 중인가?
		let drawingStatus=["pen","square"];		
		drawingStatus=drawingStatus[1];
		
		window.onload = function() {
			canvas = document.getElementById("canvas");
			if (canvas == null || canvas.getContext == null) return;
			ctx = canvas.getContext("2d");
			
			function drawRectangle2(x, y, width, height) {
			  //ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전에 그렸던 사각형 지우기
			  ctx.clearRect(str);
			  ctx.beginPath();
			  ctx.rect(x, y, width, height);
			  let str = ctx.stroke();
			}
			
			function drawRectangle(x, y, width, height) {
			  //ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전에 그렸던 사각형 지우기
			  ctx.beginPath();
			  ctx.rect(x, y, width, height);
			  ctx.stroke();
			}
			
			if(drawingStatus=="pen"){
				ctx.lineCap="round";
			
				// 현재 위치를 저장한다.
				canvas.onmousedown = function(e) {
					e.preventDefault();
					sx = canvasX(e.clientX);
					sy = canvasY(e.clientY);
					drawing = true;
				}
			
				// 현재 위치에서 새로 이동한 곳까지 선을 그린다.
				canvas.onmousemove = function(e) {
					if (drawing) {
						e.preventDefault();
						ctx.beginPath();
						ctx.moveTo(sx, sy);
						sx = canvasX(e.clientX);
						sy = canvasY(e.clientY);
						ctx.lineTo(sx, sy);
						ctx.stroke();
					}
				}
	
				// 그리기를 종료한다.
				canvas.onmouseup = function(e) {
					drawing = false;
				}
				
						
			}
			else if(drawingStatus=="square"){
				ctx.lineCap="round";
			
				// 현재 위치를 저장한다.
				
				canvas.onmousedown = function(e) {
				    e.preventDefault();
				    startX = e.clientX - canvas.offsetLeft;
				    startY = e.clientY - canvas.offsetTop;
				    drawing = true;
				  }
				
				  canvas.onmousemove = function(e) {
	
				  }
				
				  canvas.onmouseup = function(e) {
					 if (drawing) {
				      e.preventDefault();
				      var currentX = e.clientX - canvas.offsetLeft;
				      var currentY = e.clientY - canvas.offsetTop;
				      drawRectangle(startX, startY, currentX - startX, currentY - startY);
				    }
				    drawing = false;
				  }		
			}
		
		}
		
		//canvas저장
		var btnsave = document.getElementById("save");
		btnsave.addEventListener("click",saveCanvasAsImage);
		function saveCanvasAsImage() {
		  	var link = document.createElement('a');
			link.href = canvas.toDataURL('image/png');
	  		link.download = 'canvas_image.png';
	  		link.click();
		}
		
		// 선 색상 변경
		var selcolor = document.getElementById("selcolor");
		selcolor.onchange = function(e) {
			ctx.strokeStyle = selcolor.value;
		}
		
		// 선 굵기 변경
		var selwidth = document.getElementById("selwidth");
		selwidth.onchange = function(e) {
			ctx.lineWidth = selwidth.value;
		}
		
		// 모두 지우기
		var btnclear = document.getElementById("clear");
		btnclear.onclick = function(e) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
		
		function canvasX(clientX) {
			var bound = canvas.getBoundingClientRect();
			var bw = 5;
			return (clientX - bound.left - bw) * (canvas.width / (bound.width - bw * 2));
		}
		
		function canvasY(clientY) {
			var bound = canvas.getBoundingClientRect();
			var bw = -500;
			return (clientY - bound.top - bw) * (canvas.height / (bound.height - bw * 2));
		}
		
		

		