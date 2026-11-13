let board;

let bodyPose;
// we create a variable to store the bodyPose model
let video;
// a variable to store the detected poses
let poses = [];

// our target
let target = {
    x: 300,
    y: 200,
    d: 50,
}



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

        let distance = dist(rw.x, rw.y, target.x, target.y); 


        let isColliding = distance < target.d/2;

        textSize(40);
        text(isColliding, 20, 60);

        if (isColliding) {
            fill("red");
        } else {
            fill("green");
        }

        circle(target.x, target.y, target.d);   
    }
}
