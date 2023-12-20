const canvas = document.getElementById('basketballCanvas');

const ctx = canvas.getContext('2d');

const hoop = document.getElementById('hoop');

const basketball = document.getElementById('basketball');

const startCtn = document.getElementById('startCtn');

const playbtn = document.getElementById('playbtn');

const modalContainer = document.getElementById('modalContainer');

const modalContent = document.getElementById('modalContent');

const canvasCtn = document.getElementById('canvasCtn');

let ballX = 50;
let ballY = canvas.height - 30;
let initialBallY;
let hoopX = Math.random() * (canvas.width - 115);
let hoopY = Math.random() * (canvas.height - 115);
let shooting = false;
let score = 0;

const scoreSlogans = [
    'Youre lookin like Steph Curry!',
    'You shoot, you score!',
    'Three-pointer!',
    'Nothing but net!',
    'Buckets for days!',
    'Great shot!',
    'I will take a swish with that shot',
];

const missSlogans = [
    'BRUH',
    'Airball',
    'Does the hoop own you?',
    'Hoop reject',
    'Nope',
    'Not this time',
    'Close but not close enough',
];

function getRandomSlogan(sloganArray) {
    const randomIndex = Math.floor(Math.random() * sloganArray.length);
    return sloganArray[randomIndex];
}

function showModal(message, duration) {
    modalContent.innerHTML = `<p>${message}</p>`;
    modalContainer.style.display = 'flex';

    setTimeout(function () {
        modalContainer.style.display = 'none';
    }, duration);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!startCtn.style.display || startCtn.style.display === 'none') {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 30);

        ctx.drawImage(hoop, hoopX, hoopY, 115, 115);
    }

    if (shooting) {
        ballY -= 3; 

        if (
            ballX > hoopX &&
            ballX < hoopX + 115 &&
            ballY > hoopY &&
            ballY < hoopY + 115
        ) {
            shooting = false;
            const randomScoreSlogan = getRandomSlogan(scoreSlogans);
            showModal(randomScoreSlogan, 740);
            score++;
            reset();
        } else if (ballY < 0) {
            shooting = false;
            const randomMissSlogan = getRandomSlogan(missSlogans);
            showModal(randomMissSlogan, 740);
            reset();
        }
    }

    ctx.drawImage(basketball, ballX - 10, ballY - 10, 35, 35); 

    requestAnimationFrame(draw);
}

function shootBall() {
    if (!shooting) {
        shooting = true;
        initialBallY = ballY; 
    }
}

function moveBall(direction) {
    if (!shooting) {
        if (direction === 'ArrowLeft' && ballX > 0) {
            ballX -= 15; 
        } else if (direction === 'ArrowRight' && ballX < canvas.width) {
            ballX += 15; 
        }
    }
}

function reset() {
    ballX = 100;
    ballY = initialBallY; 
    hoopX = Math.random() * (canvas.width - 115);
    hoopY = Math.random() * (canvas.height - 150);
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !shooting) {
        shootBall();
    } else if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
        moveBall(event.code);
    }
});

playbtn.addEventListener('click', function () {
    startCtn.style.opacity = 0;

    setTimeout(function () {
        startCtn.style.display = 'none';
        canvasCtn.style.display = 'flex';
        draw();
    }, 500); 
});

draw();

















