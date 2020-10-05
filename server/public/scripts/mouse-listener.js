export default function createMouseListener(document) {
    const state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('click', handleClick)

    function handleClick(event) {
        if(typeof event.target.getAttribute('image-id') === 'undefined'){
            return
        }
        else{
            const imageClicked = event.target.getAttribute('image-id')

            const command = {
                type: 'check-match',
                playerId: state.playerId,
                imageClicked
            }

        
            notifyAll(command)
        }
        
    }

    return {
        subscribe,
        registerPlayerId
    }
}