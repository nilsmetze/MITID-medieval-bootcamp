let board;

let bodyPose;
// we create a variable to store the bodyPose model
let video;
// a variable to store the detected poses
let poses = [];

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    led = new five.Led(3);

    video = createCapture(VIDEO);       // we open the webcam
    video.size(700, 500);
    video.hide();                        // we hide the video element

    bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, function(results){
        poses = results;                 // we store the detected poses in the variable
    });  
    
}

function draw() {
    image(video, 0, 0);                  // we draw the video on the canvas

    if (poses.length > 0) {                 // if we have detected at least one pose
        
        let rw = poses[0].right_wrist;  //right writst coordinates
        let lw = poses[0].left_wrist;   //left wrist coordinates

        let distance = parseInt(dist(rw.x, rw.y, lw.x, lw.y));  //distance between wrists



        text(distance, 10, 10);     //debug distance

        //translate distance into brightness
        let bri = map(distance, 30, 500, 0, 255);
        led.brightness(bri);  //apply brightness to the led
    }
}
