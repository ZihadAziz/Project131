img = "";
status = "";
object = [];

function preload() {
    img = loadImage("fruitbasket.jpg");
}

function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();

    ObjectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}



function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    ObjectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(img, 0, 0, 600, 600);
    if (status != "") {
        for (i=0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status: Image Dectected";

            fill("red");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
        }
    
}