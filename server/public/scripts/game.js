export default function createGame(deck) {
    const state = {
        players: {},
        tableCard: null,
        deck: deck
    }

    const observers = []
    

    function start() {
        //
        state.tableCard = state.deck.splice(Math.floor(Math.random()*state.deck.length),1)[0]
        console.log('first table card')
        console.log(state.tableCard)

        notifyAll({
            type: 'update-state',
            state: state
        })
        
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        console.log('notifying:')
        console.log(command)
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const card = state.deck.splice(Math.floor(Math.random()*state.deck.length),1)[0]
        const score = 0;
        let playerName = command.playerName
        
        if (playerName === null || playerName == ""){
            playerName = 'Player ' + (Object.keys(state.players).length + 1);   
        }     
        const lastPoint = false;

        state.players[playerId] = {
            card: card,
            score: score,
            playerName: playerName,
            lastPoint: lastPoint
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId
        })
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        })
    }

    function checkMatch(command){
        let id = parseInt(command.imageClicked)
        let match;
        for(let i = 0; i < 8; i ++){
            if(id === state.tableCard[i]){
                match = true;
            }
        }
        if(match){
            console.log('MATCH!')            
            state.players[command.playerId].score ++;
            clearLastPoint()
            state.players[command.playerId].lastPoint = true;
            
            if(updateCards(command) === 'gameover'){
                return
            }

            notifyAll({
                type: 'update-state',
                state: state
            })
        }
        else{
            console.log('FAIL!')
        }
    }

    function updateCards(command){
        state.players[command.playerId].card = state.tableCard
        if(state.deck.length > 50){
            state.tableCard = state.deck.splice(Math.floor(Math.random()*state.deck.length),1)[0]
        }
        else{
            gameOver()
            return 'gameover';
        }       

    }

    function gameOver(){
        let winners = checkWinner()
        notifyAll({
            type: 'game-over',
            winner: winners
        })
    }

    function checkWinner(){
        let scores = []

        for (const playerId in state.players){
            scores.push(state.players[playerId].score)
        }

        let winnerScore = Math.max(...scores)

        let winners = []
        for (const playerId in state.players){        
            if(state.players[playerId].score === winnerScore){
                winners.push(state.players[playerId].playerName)
            }
        }
        return winners
    }

    function clearLastPoint(){
        for(const playerId in state.players){
            state.players[playerId].lastPoint = false;
        }
    }

//     let tableCardId, playerCardId, tableCard, playerCard;
//     let round = 0;

//     let scoreContainer = document.getElementById('score')
//     let combo = 0;
//     let score = 0;    



//     function nextRound(){
        
//         tableCardContainer.textContent=""
//         playerCardContainer.textContent=""
//         if(deck.length > 0){
//             if(round === 0){
//                 console.log('first round')
                
//                 round++;
//                 tableCardId = Math.floor(Math.random()*deck.length);
//                 tableCard = deck.splice(tableCardId,1)[0]
//                 playerCardId = Math.floor(tableCardId/2)+1;
//                 playerCard = deck.splice(playerCardId,1)[0]
//                 timerCountdown()
                
//             }
//             else{
//                 round++;
//                 playerCard = tableCard;
//                 tableCard = deck.splice(Math.floor(Math.random()*deck.length),1)[0];
//                 timerCountdown()
//             }
        
//             let player = 'player'
//             playerCardDiv = generateCard(playerCard, player)
//             tableCardDiv = generateCard(tableCard)
        
        
//             tableCardContainer.appendChild(tableCardDiv)
//             playerCardContainer.appendChild(playerCardDiv)
//         }
//         else{
//             tableCardContainer.textContent="GAME OVER"
//         }
        
//     }



//     function checkMatch(){
//         let id = parseInt(this.getAttribute('image-id'))
//         let match;
//         for(let i = 0; i < 8; i ++){
//             if(id === tableCard[i]){
//                 match = true;
//             }
//         }
//         if(match){
//             console.log('MATCH!')
//             combo++;
//             score += combo;
//             updateScore()
//             clearInterval(timer);
            
//             nextRound()
//         }
//         else{
//             console.log('FAIL!')
//             combo = 0;
//             clearInterval(timer);
//             changeTableCard()
//         }
        
//     }

//     function changeTableCard(){
//         tableCardContainer.textContent=""
//         if(deck.length > 0){        
//             round++;
//             playerCard = tableCard;
//             tableCard = deck.splice(Math.floor(Math.random()*deck.length),1)[0];
//             tableCardDiv = generateCard(tableCard)
//             tableCardContainer.appendChild(tableCardDiv)
//             timerCountdown()
//         }
//         else{
//             tableCardContainer.textContent="GAME OVER"
//         }
//     }







//     // score: multiple in a row bonus
//     // timer before starts (3-2-1-GO)
//     // deal first 2 cards (1 clickable(player) e the other not clickable)
//     // 3 seconds per card (to capture click)
//     // captures click id and checks matches
//     // if matches, playerCard = tableCard, score ++
//     // else playercard doesnt change, table card changes
//     // else (timeout) 
//     // else (error), score--


// 

return {
    addPlayer,
    removePlayer,
    state,
    setState,
    checkMatch,
    subscribe,
    start
}

}
