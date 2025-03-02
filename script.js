
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "pink", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        h2.innerText = "Game is starting...";
        started = true;
        setTimeout(levelUp, 500);
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIndx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns() {
    let lastIdx = userSeq.length - 1;
    
    if (userSeq[lastIdx] !== gameSeq[lastIdx]) {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
        return;
    }
    
    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "Press any key to START the game";
}
