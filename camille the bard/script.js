
let board;
let piezo;
let bodyPose;
let video;
let poses = [];

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    frameRate(12);

    // Piezo connected to pin 3
    piezo = new five.Piezo(3);

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

        // X axis controls frequency
        let frequency = map(rw.x, 0, width, 100, 900);

        // Y axis controls sound on/off
        if (rw.y < height / 2) {
            piezo.tone(frequency, 100);
        } else {
            piezo.noTone();
        }

    } else {
        piezo.noTone();
    }
}
