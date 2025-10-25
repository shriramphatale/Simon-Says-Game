let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;
let btns = ['yellow','red','purple','green'];

let h2 = document.querySelector("h2");

document.addEventListener('keypress',function(){
    if(started == false){
        console.log("Game Started");
        started = true;

        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random button choose
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq)
    btnFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML = `Game Over ! Your score was <b>${level}</b> <br> Press any key to start`;
        
        //highscore
        highScore = Math.max(highScore,level);
        let highScoreH2 = document.querySelector("#highScore");
        highScoreH2.innerText = `High Score : ${highScore}`;
        h2.insertAdjacentElement("afterend",highScoreH2);


        //reseting
        document.querySelector("body").style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = 'white';
        },500)
        
        reset();
    }
}

function btnPressed(){
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
    
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener('click',btnPressed);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}