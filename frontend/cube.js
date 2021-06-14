 let array = new Array(20*20);
    array.fill(false);

window.addEventListener("load", () => {

    let offsetX = 700;
    let offsetY = 100;
    let blockSize = 30;
    const canvas = document.querySelector("#canvas");
    canvas.height = 600;
    canvas.width = 600;
    const contexte = canvas.getContext('2d');
    gridCreate();
    let painting = false;

    

    function gridCreate(params) {
        for (let i = 0; i < 600 ; i = i+ blockSize) {
            contexte.moveTo(i,0);
            contexte.lineTo(i,600);
            contexte.stroke();
        }
    
        for (let j = 0; j < 600 ; j = j + blockSize) {
            contexte.moveTo(0,j);
            contexte.lineTo(600,j);
            contexte.stroke();
        }
        
    }

    function lastPosition(){
        painting = false;
        contexte.beginPath();
    }

    canvas.addEventListener("mouseup", lastPosition);

    function firstPosition(x){
        painting = true;
        contexte.fillRect( (Math.round((x.clientX - offsetX ) / blockSize) * blockSize ) ,
        (Math.round((x.clientY - offsetY ) / blockSize) * blockSize ) ,blockSize,blockSize);
        fillArray(x);        
    }

    canvas.addEventListener("mousedown", firstPosition);

    function draw(x) {
        if(!painting) return;
        contexte.lineCap = "round"
        contexte.fillRect( (Math.round((x.clientX - offsetX) / blockSize) * blockSize ),
        (Math.round((x.clientY - offsetY ) / blockSize) * blockSize ) ,blockSize,blockSize);

        fillArray(x);
    }

    canvas.addEventListener("mousemove", draw);

    function gridClear(){
        contexte.clearRect(0 , 0 , 2600, 2600);
        gridCreate();
        array.fill(false)
    }

    

    document.getElementById("clear").addEventListener("click", function() {
        gridClear();
      }); 

    function fillArray(x) {
        let i = Math.round((x.clientX - offsetX ) / blockSize)
        let j = Math.round((x.clientY - offsetY ) / blockSize)
        array[i +(j * 20)] = true;
    }

    function fetchCanvasTrain(kek){
        fetch('http://localhost:8000/train/', {
            method: 'POST',
            body: JSON.stringify({canvas:array, number:kek})
        })
    }

    document.getElementById("train").addEventListener("click", function() {
        var input = document.getElementById("nbr").value;
        fetchCanvasTrain(input);
      });

    async function fetchCanvasPredict(){
        const responce = await fetch('http://localhost:8000/predict/', {
            method: 'POST',
            body: JSON.stringify({canvas:array})
        })
        .then(async function(response){
            response.json().then( result=>{
            document.getElementById("0").innerHTML = ("0:" + result[0][0]);
            document.getElementById("1").innerHTML = ("1:" + result[0][1]);
            document.getElementById("2").innerHTML = ("2:" + result[0][2]);
            document.getElementById("3").innerHTML = ("3:" + result[0][3]);
            document.getElementById("4").innerHTML = ("4:" + result[0][4]);
            document.getElementById("5").innerHTML = ("5:" + result[0][5]);
            document.getElementById("6").innerHTML = ("6:" + result[0][6]);
            document.getElementById("7").innerHTML = ("7:" + result[0][7]);
            document.getElementById("8").innerHTML = ("8:" + result[0][8]);
            document.getElementById("9").innerHTML = ("9:" + result[0][9]);
            });
        });
    }

    document.getElementById("predict").addEventListener("click", function() {
        fetchCanvasPredict();
      });


    

    
});