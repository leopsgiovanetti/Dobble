import express from 'express'
import http from 'http'
import createGame from './public/scripts/game.js'
import socketio from 'socket.io'
import createDeck from './deckCreator.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))


// admin
app.get('/setup1704', function(req, res){
    res.sendFile('c://Users//Leopoldo//Documents//Code//github//Match-Game//server//setup1704.html')
})

const deck = createDeck()
const game = createGame(deck)


game.subscribe((command) => {
    console.log(`> Emitting ${command.type}`)
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected: ${playerId}`)
    
    socket.emit('setup', game.state)
    game.addPlayer({ playerId: playerId })

    socket.on('update-name', (command) => {
        game.state.players[playerId].playerName = command.playerName }
    )

    let players = Object.keys(game.state.players).length
    console.log(`players: ${players}`)
    if(players === 2){
        game.start()
    }

    socket.on('disconnect', () => {
        game.removePlayer({ playerId: playerId })
        console.log(`> Player disconnected: ${playerId}`)
    })

    socket.on('check-match', (command) => {
        command.playerId = playerId
        command.type = 'check-match'
        
        game.checkMatch(command)
    })

})

server.listen(8080, () => {
    console.log(`> Server listening on port: 8080`)
})


/*
TO DOs

    1) Network
        a) connection/disconnetion
    2) Game
        a) initial setup
            - deal first cards
            - update deck
        b) check match
            - match: playercard = tablecard / score++
            - miss: miss++ (on 3rd miss => score --)
        c) gameover
        d) 
*/