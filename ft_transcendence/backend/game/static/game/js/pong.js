// game/static/game/js/pong.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const tournamentInfo = document.getElementById('tournamentInfo');

    let paddle1Y = 150, paddle2Y = 150;
    let ballX = 300, ballY = 200;
    let ballSpeedX = 5, ballSpeedY = 5;
    const paddleSpeed = 5;

    let player1Score = 0;
    let player2Score = 0;
    const player1ScoreElement = document.querySelector('#player1Score span');
    const player2ScoreElement = document.querySelector('#player2Score span');

    function updateScore(playerId) {
        fetch('/update_score/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: `player_id=${playerId}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (playerId === player1Id) {
                    player1Score = data.new_score;
                    player1ScoreElement.textContent = player1Score;
                } else {
                    player2Score = data.new_score;
                    player2ScoreElement.textContent = player2Score;
                }
            }
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function drawRect(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    function drawCircle(x, y, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    function movePaddles() {
        if (keys.w && paddle1Y > 0) paddle1Y -= paddleSpeed;
        if (keys.s && paddle1Y < canvas.height - 100) paddle1Y += paddleSpeed;
        if (keys.ArrowUp && paddle2Y > 0) paddle2Y -= paddleSpeed;
        if (keys.ArrowDown && paddle2Y < canvas.height - 100) paddle2Y += paddleSpeed;
    }

    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY < 10 || ballY > canvas.height - 10) {
            ballSpeedY = -ballSpeedY;
        }

        if (ballX < 20) {
            if (ballY > paddle1Y && ballY < paddle1Y + 100) {
                ballSpeedX = -ballSpeedX;
            } else {
                updateScore(player2Id);
                ballX = 300;
                ballY = 200;
            }
        }

        if (ballX > canvas.width - 20) {
            if (ballY > paddle2Y && ballY < paddle2Y + 100) {
                ballSpeedX = -ballSpeedX;
            } else {
                updateScore(player1Id);
                ballX = 300;
                ballY = 200;
            }
        }
    }

    function draw() {
        drawRect(0, 0, canvas.width, canvas.height, '#000');
        drawRect(0, paddle1Y, 10, 100, '#fff');
        drawRect(canvas.width - 10, paddle2Y, 10, 100, '#fff');
        drawCircle(ballX, ballY, 10, '#fff');
        for (let i = 0; i < canvas.height; i += 40) {
            drawRect(canvas.width / 2 - 1, i, 2, 20, '#fff');
        }
    }

    const keys = {};

    window.addEventListener('keydown', e => {
        keys[e.key] = true;
    });

    window.addEventListener('keyup', e => {
        keys[e.key] = false;
    });

    function gameLoop() {
        movePaddles();
        moveBall();
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});