export { renderGame, gameOver }
function renderGame(playerCard, tableCard, state, activePlayerId) {
    //render cards
    
    createOtherPlayersDivs(state.players)

    const otherPlayersCards = document.getElementsByClassName('other-player-card')
    const otherPlayersNames = document.getElementsByClassName('other-player-name')
    const otherPlayersScores = document.getElementsByClassName('other-player-score')
    const activePlayerName = document.getElementById('playerName')
    const activePlayerScore = document.getElementById('playerScore')
    let type;
    let currentCard = 0
    for (const playerId in state.players){  
        if(playerId === activePlayerId){
            type = 'activePlayer'
        }
        else{
            type = 'otherPlayer'
        }
        let card = generateCard(state.players[playerId].card,type)

        if(type === 'otherPlayer'){
            if(state.players[playerId].lastPoint){
                otherPlayersCards[currentCard].classList.add("last-point")
            }
            else{
                otherPlayersCards[currentCard].classList.remove("last-point")
            }
            otherPlayersCards[currentCard].appendChild(card)
            otherPlayersNames[currentCard].textContent = state.players[playerId].playerName
            otherPlayersScores[currentCard].textContent = state.players[playerId].score.toString().padStart(4,'0')
            currentCard++
        }
        else if(type === 'activePlayer'){
            if(state.players[playerId].lastPoint){
                playerCard.classList.add("last-point")
            }
            else{
                playerCard.classList.remove("last-point")
            }
            playerCard.textContent = ''
            playerCard.appendChild(card)
            activePlayerName.textContent = state.players[playerId].playerName
            activePlayerScore.textContent = state.players[playerId].score.toString().padStart(4,'0')
        }        
    }
    
    let currentTableCard = generateCard(state.tableCard)
    tableCard.textContent=''
    tableCard.appendChild(currentTableCard)

    function createOtherPlayersDivs(players){
        let otherPlayers = Object.keys(players).length - 1
        let cols = 12 / (otherPlayers)
        let otherPlayersHeaders = document.getElementById('other-players-header')
        
        let otherPlayersCards = document.getElementById('other-players-card')
        otherPlayersHeaders.textContent = ''
        otherPlayersCards.textContent =''
        
        for(let i = 0; i < otherPlayers; i++){
            let newOtherPlayer = otherPlayerDiv(cols)
            console.log(otherPlayersHeaders)
            console.log(otherPlayersCards)
            otherPlayersHeaders.appendChild(newOtherPlayer.header)
            otherPlayersCards.appendChild(newOtherPlayer.card)
        }
    }

    function otherPlayerDiv(cols){
        
        let header = newElement('div',('col-md-'+cols))
        let playerNameColumn = newElement('div', 'col-md-6')
        let playerName = newElement('div', 'other-player-header other-player-name','PLAYER X')
        playerNameColumn.appendChild(playerName)
        let playerScoreColumn = newElement('div', 'col-md-6')
        let playerScore = newElement('div', 'other-player-header','SCORE: ')
        playerScoreColumn.appendChild(playerScore)
        playerScore.appendChild(newElement('span', 'other-player-score','0000'))
        let row = newElement('div', 'row')
        header.appendChild(row)
        row.appendChild(playerNameColumn)
        row.appendChild(playerScoreColumn)

        let card = newElement('div', 'col-md-'+cols)
        let otherCardDiv = newElement('div','other-player-card')        
        card.appendChild(otherCardDiv)

        let otherPlayer = {
            'header': header,
            'card': card
        }
        
        return otherPlayer

    }

    function newElement(type, elmClass, txtContent){
        let element = document.createElement(type)
        element.setAttribute('class', elmClass)
        element.textContent = txtContent 
        return element
    }

    function newImg(imgClass,imgSrc){
        let image = document.createElement('img')
        image.setAttribute('class', imgClass)
        image.setAttribute('src', imgSrc)
        return image
    }

    function idEmitter(){
        let id = parseInt(this.getAttribute('image-id'))
        console.log(id)
    }
    

    function generateCard(card,type){    
        
        let rotation = ['normal', 'rotate60', 'rotate120']
        let isTableCard;
        if (type === 'activePlayer' || type === 'otherPlayer'){
            isTableCard = false;
        }
        else{
            isTableCard = true;
        }
        let cardDiv = newElement('div', 'dobble-card')
        if( type === 'otherPlayer'){
            cardDiv = newElement('div', 'dobble-card other-player')
        }
        let cardImgs = newElement('div', 'images-container')
        let firstRow = newElement('div','images row')
        let secondRow = newElement('div','images row')
        let thirdRow = newElement('div','images row') 
        let fourthRow = newElement('div','images row')
    
        for(let i = 0; i < 8; i++){
            let size;
            size = 1 + Math.floor(Math.random()*3)
            if(type === 'otherPlayer'){
                size--
            }
            let degrees = Math.round(Math.random()*2)
            let image = newImg(('size'+ size + ' ' + rotation[degrees]),('./images/selected/' + card[i] +'.png') )
           
            if(type === 'activePlayer'){
                image.setAttribute('image-id', card[i])
            }

            let imageDiv = newElement('div','card-image')

            imageDiv.appendChild(image) 
    
            if (i === 0) {               
                let card12Div = newElement('div','col-md-12')            
                card12Div.appendChild(imageDiv)
                firstRow.appendChild(card12Div)
            }
            else if(i < 4){
                let card4Div = newElement('div','col-md-4')
                card4Div.appendChild(imageDiv)
                secondRow.appendChild(card4Div)
                
            }
            else if( i < 7){
                let card4Div = newElement('div','col-md-4')
                card4Div.appendChild(imageDiv)
                thirdRow.appendChild(card4Div)
                
            }
            else{
                let card12Div = newElement('div','col-md-12')
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
}

function gameOver(playerCard, tableCard, winners){
    
    let otherPlayersCards = document.getElementById('other-players-card')
    otherPlayersCards.textContent =''
    playerCard.textContent = ''
    tableCard.textContent = ''
    
    let winnersString = winners[0]
    if(winners.length > 1){
        for(let i = 1; i < winners.length; i++){
            winnersString = winnersString + ', ' + winners[i]
        }
    }    
    console.log(winnersString)
    alert(`WINNERS: ${winnersString}` )

}