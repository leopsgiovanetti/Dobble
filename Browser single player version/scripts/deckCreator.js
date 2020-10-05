
function startDeck() {
  let symbolsPerCard = 8;    
  let currentCard = 0;    // progressive number of cards
  let deck = []; // array of series (cards)
  
  // symbolsPerCard must be a prime number plus 1
//   if (!isPrime(symbolsPerCard-1)) {
//     document.write("<pre>ERROR: N value ("+ symbolsPerCard +") is not a prime number +1:"); 
//     document.write(" some tests will fail.</pre>");
//   }
  
  // Generates first subdeck of cards with image #0 as the matching image
  for (let card = 0; card <= symbolsPerCard - 1; card++)  {
    let subDeck = [];
    currentCard++;
    subDeck.push(0);//add image #0 to
    for (let image = 1; image <= symbolsPerCard - 1; image++) {
        //adds 7 other images to each card that already contains image #0
        subDeck.push((symbolsPerCard - 1) + (symbolsPerCard - 1) * (card - 1) + (image));
    }
    deck.push(subDeck);
  }
  
  // Generates the remaining subdecks of cards
  for (i= 1; i <= symbolsPerCard - 1; i++) {
    for (i2=1; i2 <= symbolsPerCard - 1; i2++) {
      let subDeck = [];
      currentCard++;
      subDeck.push(i);
      for (i3=1; i3 <= symbolsPerCard - 1; i3++) {
        subDeck.push((symbolsPerCard) + (symbolsPerCard - 1) * (i3-1) + ( ((i-1) * (i3-1) + (i2-1)) ) % (symbolsPerCard - 1));
      }
      deck.push(subDeck);
    }
  }
 
  // perform test and print the results to console
  checkDeck(deck);
  shuffleDeck(deck);
  return deck;
}

function shuffleDeck(deck){
    for(let i = 0; i < deck.length; i++){
        for(let j = 0; j < 8; j++){
            let shuffles = deck[i].length
            while (shuffles > 0){
                let index = Math.floor(Math.random()*shuffles);
                shuffles--

                let temp = deck[i][shuffles] //last element
                deck[i][shuffles] = deck[i][index]
                deck[i][index] = temp
            }
        }
    }
}


function isPrime(num) {
  for(let i = 2; i < num; i++) {
    if(num % i === 0) return false;
  }
  return num > 1;
}
 
 
// test function
// compares each card with every other card in the deck and checks the total matching images


function checkDeck(deck){

    let matchingImage = new Array(deck.length).fill(0);
    for(let currentCard = 0; currentCard < deck.length; currentCard++){
        matchingImage[currentCard] = new Array(deck.length).fill(0);
    }

    for(let currentCard = 0; currentCard < deck.length - 1; currentCard++){
        
        
        for(let nextCard = currentCard + 1; nextCard < deck.length; nextCard++){
            for(let nextCardImg = 0; nextCardImg < 8; nextCardImg++){
                                
                for(let currentCardImg = 0; currentCardImg < 8; currentCardImg++){
            
                    if(deck[nextCard][nextCardImg] === deck[currentCard][currentCardImg]){
                        matchingImage[currentCard][nextCard]++              
                    }                       

                }

            }
        }
    }
    // console.log(matchingImage)

    // for(let currentCard = 0; currentCard < deck.length; currentCard++){
    //     if(Math.max(...matchingImage[currentCard]) < 2){
    //         console.log(`CARD ${currentCard} successfully matches only 1 image with every other card in the deck`)
    //     }
    //     else{
    //         console.log(`CARD ${currentCard} failed`)
    //     }
    // }
    
    
}

