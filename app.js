let highScore;
highScore = parseInt(localStorage.getItem('highestScore')) || 0;

let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btnColorArray = ["yellow", "red", "purple", "green"];

let h2 = document.querySelector("h2");

// step 1 => we have to start the game and level up and flash the button.
let keyPressHandler = function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
        document.removeEventListener("keypress", keyPressHandler); // Remove keypress event listener
    }
    console.log("raju"); // for checking purpose of keyPressHandler is woriking or not.
};

console.log("raja sekhar"); // on the console it will first print when "compiling" see on line no: 86
document.addEventListener("keypress", keyPressHandler);

// step 2 => we have to print the level Number, we have to flash the random color and store sequence of
// gameSeq.
function levelUp() {
    userSeq = [] // to reset the userSequence because after each level the user will again enter from 
    // beginning.
    level++;

    h2.innerText = `Level ${level}`;

    //random box will selected
    let ranInd = Math.floor(Math.random() * 4);
    let ranColor = btnColorArray[ranInd];
    let ranbtn = document.querySelector(`.${ranColor}`);

    console.log(ranInd); // for checking purpose
    console.log(ranColor);
    console.log(ranbtn);

    gameSeq.push(ranColor); // to store the colors because to match the sequence of colors same as user.
    console.log(gameSeq);

    setTimeout(function () {
        gameFlash(ranbtn); // calling the btnflash function after 1 sec when h2 heading is changed
    }, 800);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

// step 3 => when the user press the button it will flash and store the sequence in the userSeq.
function btnPress() {
    if(!started) {
        return;
    }
    console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id"); // this line for getting the color from id selector.
    console.log(userColor);

    userSeq.push(userColor); // storing the colors of user entered btn color id.
    console.log(userSeq);

    checkSequence(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    console.log("raju5678"); // it will print 4 times because their are "4" btn classes exits in htmlCode
    btn.addEventListener("click", btnPress); // here btnPress is callback function
}


function disableButtons() {
    for (btn of allBtns) {
        btn.removeEventListener("click", btnPress);
    }
}


// step 4 => matching the sequence
function checkSequence(index) {
    console.log(`curr level no : ${level}`);
    if (userSeq[index] == gameSeq[index]) {
        if (userSeq.length == gameSeq.length) {
            levelUp();
        }
    }
    else {
        let body = document.querySelector("body");
        GameOverFlash(body)
        max(level);
        h2.innerHTML = `Game Over!! Your Score was <b>${level}</b> <br> Press any key to start.<br> Highest score was ${highScore}`;
        disableButtons();
        reset();
    }
}

function GameOverFlash(btn) {
    btn.classList.add("gameOverFlash");
    setTimeout(function () {
        btn.classList.remove("gameOverFlash");
    }, 250);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;

    // Enabling the buttons after resetting the game
    for (btn of allBtns) {
        btn.addEventListener("click", btnPress);
    }

    document.addEventListener("keypress", keyPressHandler);
}

function max(score) {
    if (score > highScore) {
        highScore = score;

        // Store the highest score in local storage
        localStorage.setItem('highestScore', highScore);
    }
}
