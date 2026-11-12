let board;

let bodyPose;
let video;
let poses = [];


async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);


    video = createCapture(VIDEO);
    video.size(700,500);
    video.hide();
    
    bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, function(results){
        poses = results;
    })
}

function draw() {
    image(video, 0,0);

    if(poses.length > 0){
        console.log(poses[0])

        let n = poses[0].nose;
        fill("#FF0000");
        circle(n.x, n.y, 30);
    }

    
}