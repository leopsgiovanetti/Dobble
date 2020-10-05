const start = document.getElementById('start')
let deck = startDeck();

let tableCardId, playerCardId, tableCard, playerCard;
let round = 0;

let scoreContainer = document.getElementById('score')
let combo = 0;
let score = 0;

const tableCardContainer = document.getElementById('table-card')
const playerCardContainer = document.getElementById('player-card')
let timer;

start.addEventListener('click', nextRound)

function nextRound(){
    
    tableCardContainer.textContent=""
    playerCardContainer.textContent=""
    if(deck.length > 0){
        if(round === 0){
            console.log('first round')
            
            round++;
            tableCardId = Math.floor(Math.random()*deck.length);
            tableCard = deck.splice(tableCardId,1)[0]
            playerCardId = Math.floor(tableCardId/2)+1;
            playerCard = deck.splice(playerCardId,1)[0]
            timerCountdown()
            
        }
        else{
            round++;
            playerCard = tableCard;
            tableCard = deck.splice(Math.floor(Math.random()*deck.length),1)[0];
            timerCountdown()
        }
    
        let player = 'player'
        playerCardDiv = generateCard(playerCard, player)
        tableCardDiv = generateCard(tableCard)
    
    
        tableCardContainer.appendChild(tableCardDiv)
        playerCardContainer.appendChild(playerCardDiv)
    }
    else{
        tableCardContainer.textContent="GAME OVER"
    }
    
}


function timerCountdown(){
    let seconds = 5;
    let milliseconds = 0;

    timer = setInterval(function() {                         

        

        // Time calculations for days, hours, minutes and seconds
        if(milliseconds === 0){
            milliseconds = 99
            seconds--
            // console.log('passou no mili = 0')
        }
        else{
            milliseconds--
            // console.log('passou no mili--')
        }
        
        // Display the updated timer
        document.getElementById("timer").textContent = seconds.toString().padStart(2,'0') + ":" +
            milliseconds.toString().padStart(2,'0');
        
        // If the count down is finished, write some text
        if (seconds === 0 && milliseconds === 0) {
            clearInterval(timer);
            combo = 0;
            changeTableCard()
        }
        }, 10);
}


// function startTimer(){
        
//     const interval = setInterval(function(){
//     console.log('chamou o timer')
//     // initialize timer  
//     let seconds = 5
//     let milliseconds = 0 
        
    
    
//     if (round === 0){
//         nextRound()
//     }
//     else{
//         changeTableCard()
//     }
        
//     }
    
    
//         ,5000)
// }

function updateScore(){
    let textScore = score.toString().padStart(4,'0')
    scoreContainer.textContent = textScore;
}

function checkMatch(){
    let id = parseInt(this.getAttribute('image-id'))
    let match;
    for(let i = 0; i < 8; i ++){
        if(id === tableCard[i]){
            match = true;
        }
    }
    if(match){
        console.log('MATCH!')
        combo++;
        score += combo;
        updateScore()
        clearInterval(timer);
        
        nextRound()
    }
    else{
        console.log('FAIL!')
        combo = 0;
        clearInterval(timer);
        changeTableCard()
    }
    
}

function changeTableCard(){
    tableCardContainer.textContent=""
    if(deck.length > 0){        
        round++;
        playerCard = tableCard;
        tableCard = deck.splice(Math.floor(Math.random()*deck.length),1)[0];
        tableCardDiv = generateCard(tableCard)
        tableCardContainer.appendChild(tableCardDiv)
        timerCountdown()
    }
    else{
        tableCardContainer.textContent="GAME OVER"
    }
}

function generateCard(card,type){
    
    let size = ['small', 'medium', 'large']
    let rotation = ['normal', 'rotate60', 'rotate120']
    let isPlayerCard = false;
    if (type === 'player'){
        isPlayerCard = true;
    }
    let cardDiv = document.createElement('div')
    cardDiv.setAttribute('class', 'dobble-card')
    let cardImgs = document.createElement('div')
    cardImgs.setAttribute('class', 'images-container')
    let firstRow = document.createElement('div')
    firstRow.setAttribute('class','row')
    let secondRow = document.createElement('div')
    secondRow.setAttribute('class','row')
    let thirdRow = document.createElement('div')
    thirdRow.setAttribute('class','row') 
    let fourthRow = document.createElement('div')
    fourthRow.setAttribute('class','row') 


    
    for(let i = 0; i < 8; i++){
        let image = document.createElement('img')
        let src = 'images/selected/' + card[i] +'.png'
        image.setAttribute('width','60')
        image.setAttribute('height','60')
        image.setAttribute('class',size[Math.round(Math.random()*2)] + ' ' + rotation[Math.round(Math.random()*2)])
        image.setAttribute('image-id', card[i])
        if(isPlayerCard){
            image.addEventListener('click', checkMatch)
        }        
        image.setAttribute('src',src)
        let imageDiv = document.createElement('div')
        imageDiv.setAttribute('class','card-image')
        imageDiv.appendChild(image) 

        if (i === 0) {               
            let card12Div = document.createElement('div')
            card12Div.setAttribute('class','col-md-12')            
            card12Div.appendChild(imageDiv)
            firstRow.appendChild(card12Div)
        }
        else if(i < 4){
            let card4Div = document.createElement('div')               
            card4Div.setAttribute('class','col-md-4')
            card4Div.appendChild(imageDiv)
            secondRow.appendChild(card4Div)
            
        }
        else if( i < 7){
            let card4Div = document.createElement('div')               
            card4Div.setAttribute('class','col-md-4')
            card4Div.appendChild(imageDiv)
            thirdRow.appendChild(card4Div)
            
        }
        else{
            let card12Div = document.createElement('div')
            card12Div.setAttribute('class','col-md-12')
            card12Div.appendChild(imageDiv)
            fourthRow.appendChild(card12Div)
            
        }       
    }
    cardImgs.appendChild(firstRow)
    cardImgs.appendChild(secondRow)
    cardImgs.appendChild(thirdRow)
    cardImgs.appendChild(fourthRow)
    cardDiv.appendChild(cardImgs)

    return cardDiv
}

// score: multiple in a row bonus
// timer before starts (3-2-1-GO)
// deal first 2 cards (1 clickable(player) e the other not clickable)
// 3 seconds per card (to capture click)
// captures click id and checks matches
// if matches, playerCard = tableCard, score ++
// else playercard doesnt change, table card changes
// else (timeout) 
// else (error), score--