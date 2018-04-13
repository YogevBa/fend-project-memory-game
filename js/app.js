 const cards = document.querySelectorAll('.card');
 let cardsArray = Array.prototype.slice.call(cards);
 const restart = document.querySelector('.restart');
 let openCards = [];
 let firstCard;
 let pairs = 0;



function init() {
  cardListener();
}

 function cardListener(){
   for (let i = 0; i<cards.length; i++){
    cards[i].addEventListener('click' , function(){
      if (this.classList.contains('open') && this.classList.contains('show')) {
        return;
      }
      else {
        showCard(this)
        addToOpenCards(this);
      }


    });
  };
};

function showCard (card){
  card.classList.add('open');
  card.classList.add('show');
}

function removeCard (card){
  card.classList.remove('open');
  card.classList.remove('show');
}

function addToOpenCards (card){
  if (!firstCard){
    firstCard = card;
  }
  else {
    equality(card);
  }
  openCards.push(card);
}
function equality (secondCard) {
  let playedCard = secondCard.querySelector('i').classList[1];
  openCards.forEach(function(elem){
    let cardInArray = elem.querySelector('i').classList[1];
    if (cardInArray === playedCard){
      //match
      secondCard.classList.add('match');
      elem.classList.add('match');
      pairs += 1;
      winCondition();
    }
    else{
      //return to pool -> remove from array
        openCards.pop(playedCard);
        openCards.pop(cardInArray);
        removeCard(elem);
    }
  });
};

function winCondition(){
  if(pairs === 8){
    setTimeout(function(){
      alert('Well Done');
    },100)
  }

}
init();



// if (cardsArray.indexOf(firstCard) !== cardsArray.indexOf(card)) {
//   openCards.push(card);
//
// }
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
