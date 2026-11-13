let board;
let bodyPose;
let video;
let poses = [];

let previousRightX;
let previousRightY;
let previousLeftX;
let previousLeftY;

let speed = 0;

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    frameRate(12);

    video = createCapture(VIDEO);       // we open the webcam
    video.size(700, 500);
    video.hide();                        // we hide the video element

    bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, function(results){
        poses = results;                 // we store the detected poses in the variable
    });  
    
}


function draw() {
    background(200);
    image(video, 0, 0);

     if (poses.length > 0) {

        let rs = poses[0].right_shoulder;
        let ls = poses[0].left_shoulder;

       if (previousRightX !== undefined) {

            // Calculate how far each shoulder moved
            let rightDistance = dist(rs.x, rs.y, previousRightX, previousRightY);
            let leftDistance = dist(ls.x, ls.y, previousLeftX, previousLeftY);

            // Calculate average speed
            speed = (rightDistance + leftDistance) / 2 * 12;

            // Green overlay when movement is very slow
            if (speed < 30) {
                fill(0, 255, 0, 100);
                noStroke();
                rect(0, 0, width, height);
            }

            console.log(speed);
        }

        // Save positions for the next frame
        previousRightX = rs.x;
        previousRightY = rs.y;
        previousLeftX = ls.x;
        previousLeftY = ls.y;
    }
}