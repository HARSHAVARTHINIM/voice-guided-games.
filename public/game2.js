const scoreElement = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
startScreen.addEventListener('click', start);
let player = { speed: 5, score: 0 };
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
let highestScore = 0;
const userId = 5; // Replace with the actual user ID from your authentication system

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}

function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item) {
        if (item.y >= 650) {
            item.y -= 740;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

async function saveCarRacingScore() {
    try {
        await fetch('http://localhost:8080/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, gameName: 'Car Racing Game', score: player.score }),
        });
    } catch (error) {
        console.error('Error saving Car Racing score:', error);
    }
}

async function saveHighestScore() {
    try {
        await fetch('http://localhost:8080/api/scores/highest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, gameName: 'Car Racing Game', score: highestScore }),
        });
    } catch (error) {
        console.error('Error saving highest score:', error);
    }
}

async function fetchAndDisplayScores() {
    try {
        const response = await fetch('http://localhost:8080/api/scores');
        const scores = await response.json();

        const userScores = scores.filter(score => score.userId === userId);

        const leaderboardElement = document.getElementById('leaderboard');
        leaderboardElement.innerHTML = `<h2>Leaderboard</h2>`;

        userScores.forEach(score => {
            leaderboardElement.innerHTML += `<p>${score.gameName}: ${score.score} (Email: ${score.email})</p>`;
        });
    } catch (error) {
        console.error('Error fetching scores:', error);
    }
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    
    // Check and update the highest score
    if (player.score > highestScore) {
        highestScore = player.score;
        saveHighestScore(); // Save the new highest score
        
        // Show celebration GIF
        const celebrationGif = document.createElement('img');
        celebrationGif.src = 'https://i.pinimg.com/originals/7f/3a/68/7f3a68fe9ae08dfcfb26a0863a20d375.gif'; // Celebration GIF URL
        celebrationGif.classList.add('celebration');
        startScreen.appendChild(celebrationGif);
    }

    startScreen.innerHTML += "<br> Final score:" + player.score + " " + "<br>Highest score: " + highestScore + "<br>Press again to restart";
    saveCarRacingScore(); // Save the score for Car Racing Game
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item) {
        if (isCollide(car, item)) {
            console.log("Bang!");
            endGame();
        }
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function gamePlay() {
    console.log("here we go");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if (player.start) {
        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > (road.top + 70)) {
            player.y -= player.speed
        }
        if (keys.ArrowDown && player.y < (road.bottom - 85)) {
            player.y += player.speed
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);
        player.score++;
        let ps = player.score - 1;
        scoreElement.innerText = "Score: " + ps;
    }
}

async function start() {
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;

    // Fetch the highest score
    try {
        const response = await fetch('http://localhost:8080/api/scores/highest?userId=' + userId + '&gameName=Car Racing Game');
        const data = await response.json();
        if (data) {
            highestScore = data.score;
        }
    } catch (error) {
        console.error('Error fetching highest score:', error);
    }

    window.requestAnimationFrame(gamePlay);

    for (let x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (let x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}

fetchAndDisplayScores();
