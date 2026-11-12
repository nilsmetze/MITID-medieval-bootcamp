let board;

let pot;
let servo;

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    pot = new five.Sensor({
                            pin: "A0",
                            scale: [0,255]
    });

    servo = new five.Servo(3);

    pot.on("change",function(latestValue){
        servo.to(latestValue);
    })
    
}

function draw() {
    background(200);

}