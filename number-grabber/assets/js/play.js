// INIT
var canvas = document.getElementById("myCanvas");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
var playerHeight = 110;
var playerWidth = 92;
var playerX = (canvas.width - playerWidth) / 2;
var playerY = (canvas.height - playerHeight) / 2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var img = new Image();
img.src = "assets/img/basket.png";

// KEYBOARD
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if ("code" in e) {
        switch(e.code) {
            case "Unidentified":
                break;
            case "ArrowRight":
            case "Right": // IE <= 9 and FF <= 36
            case "KeyD":
                rightPressed = true;
                return;
            case "ArrowLeft":
            case "Left": // IE <= 9 and FF <= 36
            case "KeyA":
                leftPressed = true;
                return;
            case "ArrowUp":
            case "Up": // IE <= 9 and FF <= 36
            case "KeyW":
                upPressed = true;
                return;
            case "ArrowDown":
            case "Down": // IE <= 9 and FF <= 36
            case "KeyS":
                downPressed = true;
                return;
            default:
                return;
        }
    }

    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    if(e.keyCode == 40) {
        downPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
}
function keyUpHandler(e) {
    if ("code" in e) {
        switch(e.code) {
            case "Unidentified":
                break;
            case "ArrowRight":
            case "Right": // IE <= 9 and FF <= 36
            case "KeyD":
                rightPressed = false;
                return;
            case "ArrowLeft":
            case "Left": // IE <= 9 and FF <= 36
            case "KeyA":
                leftPressed = false;
                return;
            case "ArrowUp":
            case "Up": // IE <= 9 and FF <= 36
            case "KeyW":
                upPressed = false;
                return;
            case "ArrowDown":
            case "Down": // IE <= 9 and FF <= 36
            case "KeyS":
                downPressed = false;
                return;
            default:
                return;
        }
    }

    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    if(e.keyCode == 40) {
        downPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
}

// MOUSE
document.addEventListener("mousemove", mouseMoveHandler);
function mouseMoveHandler(e) {
    playerX = e.pageX - canvas.offsetLeft - playerWidth / 2;
    playerY = e.pageY - canvas.offsetTop - playerHeight / 2;
    output.textContent = `Mouse:\nx: ${playerX}, y: ${playerY}`;
}

// TOUCH
document.addEventListener("touchstart", touchHandler);
document.addEventListener("touchmove", touchHandler);
function touchHandler(e) {
    if(e.touches) {
        playerX = e.touches[0].pageX - canvas.offsetLeft - playerWidth / 2;
        playerY = e.touches[0].pageY - canvas.offsetTop - playerHeight / 2;
        output.textContent = `Touch:\nx: ${playerX}, y: ${playerY}`;
        e.preventDefault();
    }
}

// GAMEPAD
window.addEventListener("gamepadconnected", gamepadHandler);
var controller = {};
var buttonsPressed = [];
function gamepadHandler(e) {
    controller = e.gamepad;
    output.textContent = `Gamepad: ${controller.id}`;
}
function gamepadUpdateHandler() {
    buttonsPressed = [];
    if(controller.buttons) {
        for(var b=0; b<controller.buttons.length; b++) {
            if(controller.buttons[b].pressed) {
                buttonsPressed.push(b);
            }
        }
    }
}
function gamepadButtonPressedHandler(button) {
    var press = false;
    for(var i=0; i<buttonsPressed.length; i++) {
        if(buttonsPressed[i] == button) {
            press = true;
        }
    }
    return press;
}

// LEAP MOTION
var toDegrees = 1 / (Math.PI / 180);
var horizontalDegree = 0;
var verticalDegree = 0;
var degreeThreshold = 30;
var grabStrength = 0;
Leap.loop({
    hand: function(hand) {
        horizontalDegree = Math.round(hand.roll() * toDegrees);
        verticalDegree = Math.round(hand.pitch() * toDegrees);
        grabStrength = hand.grabStrength;
        output.textContent = `Leap Motion: \nroll: ${horizontalDegree}°\npitch: ${verticalDegree}°\nstrength: ${grabStrength}`;
    }
});

// DRAW
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // KEYBOARD
    if(rightPressed) {
        playerX += 5;
    }
    else if(leftPressed) {
        playerX -= 5;
    }
    if(downPressed) {
        playerY += 5;
    }
    else if(upPressed) {
        playerY -= 5;
    }

    // GAMEPAD
    gamepadUpdateHandler();
    if(gamepadButtonPressedHandler(0)) {
        playerY -= 5;
    }
    else if(gamepadButtonPressedHandler(1)) {
        playerY += 5;
    }
    if(gamepadButtonPressedHandler(2)) {
        playerX -= 5;
    }
    else if(gamepadButtonPressedHandler(3)) {
        playerX += 5;
    }
    if(gamepadButtonPressedHandler(11)) {
        alert('BOOM!');
    }

    // LEAP MOTION
    if(horizontalDegree > degreeThreshold) {
        playerX -= 5;
    }
    else if(horizontalDegree < -degreeThreshold) {
        playerX += 5;
    }
    if(verticalDegree > degreeThreshold) {
        playerY += 5;
    }
    else if(verticalDegree < -degreeThreshold) {
        playerY -= 5;
    }
    if(grabStrength == 1) {
        alert('BOOM!');
    }

    ctx.drawImage(img, playerX, playerY);
    requestAnimationFrame(draw);
}
draw();