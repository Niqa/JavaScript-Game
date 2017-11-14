document.addEventListener('DOMContentLoaded', function(){

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    //move
    var x = canvas.width/2;
    var y = canvas.height-30;

    //small value speed
    var dx = 2;
    var dy = -2;
    //collision
    var ballRadius = 10;
    //color
    var color = getRandomColor();
    //paddle = wiosłować || controll ball
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth)/2;
    //Pressed
    var rightPressed = false;
    var leftPressed = false;
    //brick
    var brickRowCount = 3;
    var brickColumnCount = 5;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var bricks = [], r, c;
    //score
    var score = 0;
    //lives
    var lives = 3;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    for(c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for(r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {
                x:0,
                y: 0,
                status: 1
            };
        }
    }

    function drawBricks() {
        for(c = 0; c < brickColumnCount; c++){
            for(r = 0; r < brickRowCount; r++){
                if(bricks[c][r].status === 1) {
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = color;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    //collision ball-bricks

    function collisionDetection() {
        for(c = 0; c < brickColumnCount; c++){
            for(r = 0; r < brickRowCount; r++){
                var b = bricks[c][r];
                if(b.status === 1){
                    if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        color = getRandomColor();
                        score++;
                        if(score === brickRowCount * brickColumnCount){
                            alert("YOU WIN!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + lives, canvas.width-65, 20);
    }

    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("SCORE: " + score, 8, 20);
    }

    function mouseMoveHandler() {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width){
            paddleX = relativeX - paddleWidth/2;
        }
    }

    function keyDownHandler(e) {
        if(e.keyCode === 39){
            rightPressed = true;
        } else if(e.keyCode === 37){
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.keyCode === 39){
            rightPressed = false;
        } else if(e.keyCode === 37){
            leftPressed = false;
        }
    }

    function drawBall() {

        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();
        drawScore();
        drawLives();

        if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
            dx = -dx;
            color = getRandomColor();

        }
        if(y + dy < ballRadius){
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius){
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else{
                lives--;
                if(!lives) {
                    alert('GAME OVER');
                    document.location.reload();
                } else {
                    x = canvas.width/2;
                    y = canvas.height - 30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth){
            paddleX += 7;
        } else if(leftPressed && paddleX > 0){
            paddleX -= 7;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);

    }

    draw();

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++){
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


});