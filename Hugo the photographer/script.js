let board;
let button;
let video;

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    button = new five.Button({ pin: 2, isPullup: true });

    // Webcam 
    video = createCapture(VIDEO);
    video.size(700, 500);
    video.hide();
    
}

function draw() {
    background(200);
    image(video, 0, 0);

    if(button.isDown){
          saveCanvas("selfie", "png");
        }
}