 const cards = document.querySelectorAll('.card');
 const restart = document.querySelector('.restart');
 let openCards = [];
 let firstCard;


 function cardListener(){
   for (let i = 0; i<cards.length; i++){
    cards[i].addEventListener('click' , function(){
      showCard(this)
      addToOpenCards(this);
      //equality(this);
    });
  };
};

cardListener();

function showCard (card){
  card.classList.add('open');
  card.classList.add('show');
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
  let card2 = secondCard.querySelector('i').classList[1];
  openCards.forEach(function(elem){
    let playedCard = elem.querySelector('i').classList[1];
    if (playedCard === card2){
      //match
      secondCard.classList.add('match');
      elem.classList.add('match');
    }
    else{
      //return to pool -> remove from array
        openCards.pop(card2);
        openCards.pop(playedCard);
        secondCard.classList.remove('open,show');
        elem.classList.remove('open');
        elem.classList.remove('show');
    }
  });
};


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
