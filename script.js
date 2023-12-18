const canvas = document.getElementById('basketballCanvas');

const ctx = canvas.getContext('2d');

const hoop = document.getElementById('hoop');

let ballX = 50;
let ballY = canvas.height - 20;
let initialBallY; 
const hoopX = 300;
const hoopY = 50;
let shooting = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // my hoop
    ctx.drawImage(hoop, 250, 30, 100, 100);

    // the ball
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, 2 * Math.PI);
    ctx.fill();

    if (shooting) {
        ballY -= 5; // fix speed of ball

        if (
            ballX > hoopX &&
            ballX < hoopX + 50 &&
            ballY > hoopY &&
            ballY < hoopY + 50
        ) {
            shooting = false;
            alert('Basket! You scored!');  //assign random slogans
            reset();
        } else if (ballY < 0) {
            shooting = false;
            alert('Missed! Try again.');
            reset();
        }
    }

    requestAnimationFrame(draw);
}

function shootBall() {
    if (!shooting) {
        shooting = true;
        initialBallY = ballY; // initial ball place maybe move
    }
}

function moveBall(direction) {
    if (!shooting) {
        if (direction === 'ArrowLeft' && ballX > 0) {
            ballX -= 5; // fix speed of shot
        } else if (direction === 'ArrowRight' && ballX < canvas.width) {
            ballX += 5; // same here
        }
    }
}

function reset() {
    ballX = 100;
    ballY = initialBallY; // figure if i want to RESET or leave ball placement
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !shooting) {
        shootBall();
    } else if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
        moveBall(event.code);
    }
});

canvas.addEventListener('click', function() {
    shootBall();
});

draw();

//self notes-- fix lines of js, css, and html add realistic ball, may stick figure, make canvas bigger, add random slogans for made/missed shots in form of modal, fix alignment of hoop, fix score radius
