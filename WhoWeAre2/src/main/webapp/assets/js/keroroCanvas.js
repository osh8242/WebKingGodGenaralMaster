/* 두번째 날아라 케로로 */
let canvasRoro = document.querySelector("#flyingcanvas");
let contextRoro = canvasRoro.getContext("2d");

let subCanvasRoro = document.createElement('canvas');
subCanvasRoro.width = canvasRoro.width;
subCanvasRoro.height = canvasRoro.height;
let subcontextRoro = subCanvasRoro.getContext("2d");

window.onload = function() {

    //케로로 이미지
    let followImg = new Image();
    followImg.src = "assets/images/flyingroro.png";

    let backImg = new Image();
    backImg.src = "assets/images/class.jpg";

    //이미지가 로딩되면
    backImg.onload = function() {
        contextRoro.drawImage(backImg, 0, 0, canvasRoro.width, canvasRoro.height);
        subcontextRoro.drawImage(backImg, 0, 0, canvasRoro.width, canvasRoro.height);
    }

    document.getElementById("selroro").onchange = function() {
        let selroro = document.getElementById("selroro").value;
        if(selroro == 'oh'){followImg.src = "assets/images/flyingroro.png";}
        if(selroro == 'kim'){followImg.src = "assets/images/기로로-removebg-preview.png";}
        if(selroro == 'hyun'){followImg.src = "assets/images/푸루루-removebg-preview.png";}
        if(selroro == 'nam'){followImg.src = "assets/images/타마마-removebg-preview.png";}
        if(selroro == 'seo'){followImg.src = "assets/images/도로로-removebg-preview.png";}
    }



    //케로로 캔버스 클릭 이벤트 (subcanvas복붙 저장)
    canvasRoro.addEventListener("click", function(e) {
        subcontextRoro.drawImage(canvasRoro,0,0);
    });

    //케로로 캔버스 마우스따라 로로 따라다니기
    canvasRoro.addEventListener("mousemove", function(e) {
        contextRoro.clearRect(0, 0, canvasRoro.width, canvasRoro.height);
        contextRoro.drawImage(subCanvasRoro, 0, 0, canvasRoro.width, canvasRoro.height);//subcanvas로 갈아끼기
        contextRoro.drawImage(followImg, e.offsetX - 50, e.offsetY - 50, 100, 130);
    });

    canvasRoro.addEventListener("mouseout", function(e) {
        contextRoro.clearRect(0, 0, canvasRoro.width, canvasRoro.height);
        contextRoro.drawImage(subCanvasRoro, 0, 0, canvasRoro.width, canvasRoro.height);//subcanvas로 갈아끼기
    });

    //케로로 캔버스 다운로드
    let btndownloadRoro = document.getElementById("downloadRoro");
    btndownloadRoro.addEventListener("click", function(e) {
        let image = document.getElementById("flyingcanvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
        this.setAttribute("href", image);
        this.setAttribute("download","roroimage.png");
    });

    //케로로 캔버스 비우기
    let btnclearRoro = document.getElementById("clearRoro");
    btnclearRoro.addEventListener("click", function(e) {
        contextRoro.drawImage(backImg, 0, 0, canvasRoro.width, canvasRoro.height);
        subcontextRoro.drawImage(backImg, 0, 0, canvasRoro.width, canvasRoro.height);
    });


    //케로로 캔버스 배경이미지
    document.getElementById("selbg").onchange = function() {
        let selbg = document.getElementById("selbg").value;
        backImg.src= "assets/images/class.jpg";
    }

    //케로로 캔버스 배경이미지 select-box
    document.getElementById("selbg").onchange = function() {
        let selbg = document.getElementById("selbg").value;
        if(selbg == 'class'){backImg.src= "assets/images/class.jpg";}
        if(selbg == 'sky'){backImg.src = "assets/images/sky.jpg";}
        if(selbg == 'fire'){backImg.src = "assets/images/fire.jpg";}
    }

    //케로로 파일 업로드 해서 배경바꾸기
    let getImageFiles = (e) => {
        const uploadFiles = [];
        const files = e.currentTarget.files;

        if ([...files].length > 1) {
            alert('이미지는 1개만 등록가능합니다.');
            return;
        }

        // 파일 타입 검사
        [...files].forEach(file => {
            if (!file.type.match("image/.*")) {
                alert('이미지 파일만 업로드가 가능합니다.');
                return
            }

            // 파일 갯수 검사
            if ([...files].length == 1) {
                uploadFiles.push(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    const preview = changeBgImg(e, file);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    let changeBgImg = (e, file) => {
        backImg.src= e.target.result;
    }

    const realUpload = document.querySelector('.real-upload');
    const upload = document.querySelector('.upload');

    upload.addEventListener('click', () => realUpload.click());
    realUpload.addEventListener('change', getImageFiles);

}