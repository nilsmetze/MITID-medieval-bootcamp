let board;
let buzzer;

let previousX;
let previousY;

let bodyPose;
// we create a variable to store the bodyPose model
let video;
// a variable to store the detected poses
let poses = [];

let speed;


async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    frameRate(12);

    board.on("ready", function() {
        buzzer = new five.Piezo(3);
    });

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


        if (previousX !== undefined) {
        
        // Calculate distance travelled by the wrist
        let distance = dist(rw.x, rw.y, previousX, previousY);

        // Calculate speed in pixels per second
        speed = distance * 12;

        // Display speed
        textSize(30);
        text(parseInt(speed), 20, 60);
        }

        if (speed > 500) {
        buzzer.tone(440, 200);
}


         // Save wrist position for the next frame
        previousX = rw.x;
        previousY = rw.y;
        
    }
}
