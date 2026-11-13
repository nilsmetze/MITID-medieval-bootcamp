let board;

let led; // digital led representation

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);
    
    led = new five.Led(3);
}

function draw() {
    background(200);

    // if(mouseX < width/2){
    //     led.on();
    // }else{
    //     led.off();
    // }

    let brightnessValue = map(mouseX, 0, innerWidth, 0, 255);

    led.brightness(brightnessValue);
}

function mousePressed(){
    led.toggle();
}


