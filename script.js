const messagearea=document.querySelector('.message');
const gameArea=document.querySelector('.gamearea');
const button=document.querySelector('button');
const emoticons=document.querySelectorAll('img');
inPlay=false;
playNum=2;
let gameClicks=[];
let userClicks=[];

window.addEventListener('load', setupall);
button.addEventListener('click', function(){
    if(!inPlay){
        player();
    }
})

function player(){
    button.disabled=true;
    button.style.display='none';
    gameClicks=[];
    userClicks=[];
    runSequence(playNum);
   
}

function setupall(){
    for(var x=0;x<emoticons.length;x++){
        emoticons[x].addEventListener('click', checkAnswer)
    }
}

function runSequence(num){
    let boxes=document.querySelectorAll('img');
    num--;
    if(num<0){
        inPlay=true;
        return;
    }

    let randomNum=Math.floor(Math.random()*emoticons.length);
    gameClicks.push(emoticons[randomNum].currentSrc);
    boxes[randomNum].style.opacity='1';
    setTimeout(function(){
        boxes[randomNum].style.opacity='0.4';
        setTimeout(function(){
            runSequence(num);
        }, 100);
    }, 500 );
    
}

function checkAnswer(e){
        let el=e.target.currentSrc;
        userClicks.push(el);
        let el2=e.target;
        el2.style.opacity='1';
        setTimeout(function(){
            el2.style.opacity='0.4';
        }, 500);
        if(userClicks.length==gameClicks.length){
            inPlay=false;
            endGame();
        }
}


function endGame(){
    button.disabled=false;
    button.style.display='block';
    if(userClicks.toString()==gameClicks.toString()){
        playNum++;
        messager("Correct! Next level "+playNum);
    }
    else{
        messager('Not correct!')
    }
}

function messager(mes){
    messagearea.innerHTML=mes;
}