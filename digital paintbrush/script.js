
let board;
let button;
let bodyPose;
let video;
let poses = [];

let paint;
let previousX;
let previousY;

let potWidth;
let potColor;

let lineWidth = 5;
let lineColor = 0;

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    frameRate(12);

    // Webcam
    video = createCapture(VIDEO);
    video.size(700, 500);
    video.hide();

    // BodyPose
    bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, function(results) {
        poses = results;
    });
}

function draw() {
    background(200);
    image(video, 0, 0);

    if (poses.length > 0) {

        let rw = poses[0].right_wrist;

        if (previousX !== undefined) {

            paint.stroke(lineColor, 255, 255);
            paint.strokeWeight(lineWidth);

            paint.line(previousX, previousY, rw.x, rw.y);
        }

        // Save wrist position
        previousX = rw.x;
        previousY = rw.y;

    } else {
        previousX = undefined;
    }

    // clears the drawing
    if (button.isDown) {
    console.log("Button pressed");
    paint.clear();
}

    // Display the drawing over the webcam
    image(paint, 0, 0);
}
