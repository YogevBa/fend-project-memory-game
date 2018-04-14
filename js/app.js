 const cards = document.querySelectorAll('.card');
 const restart = document.querySelector('.restart');
 let openCards = [];
 let firstCard;
 let pairs = 0;
 let cardsCounter = 0;

function init() {
  cardListener();
}
// Sets the card's click event and basic functionality of flipping cards.
 function cardListener(){
   for (let i = 0; i<cards.length; i++){
    cards[i].addEventListener('click' , function(){
      cardsCounter += 1;
      if (this.classList.contains('open') && this.classList.contains('show')) {
        cardsCounter -= 1;
        return;
      }
      else if (cardsCounter <=2){
        showCard(this);
        addToOpenCards(this);
      }
    });
  };
};
// Functions that triggers the CSS classes on the selected div.
function showCard (card){
  card.classList.add('open');
  card.classList.add('show');
}

function removeCard (card){
  card.classList.remove('open');
  card.classList.remove('show');
}
// Adding cards to the openCards or generating card data if its the first card.
function addToOpenCards (card){
  if (!firstCard){
    firstCard = card;
  }
  else {
// If the second card clicked, move to equality for match validation.
    equality(card);
  }
  openCards.push(card);
}
// Match validation function
function equality (secondCard) {
  let playedCard = secondCard.querySelector('i').classList[1];
  openCards.forEach(function(elem){
    let cardInArray = elem.querySelector('i').classList[1];
    if (cardInArray === playedCard){
      //match
      secondCard.classList.add('match');
      elem.classList.add('match');
      pairs += 1;
      cardsCounter = 0;
      winCondition();
    }
    else{
      //Return to pool -> remove from array ->Flip cards to starting position.
      setTimeout(function(){
        if(!elem.classList.contains('match') && !secondCard.classList.contains('match')){
          removeCard(elem)
          removeCard(secondCard)
          openCards.pop(cardInArray);
          openCards.pop(playedCard);
          cardsCounter = 0;
        }
      },1000)
    }
  });
};
// Win Condition.
function winCondition(){
  if(pairs === 8){
    setTimeout(function(){
      alert('Well Done');
    },100)
  }
}

init();

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
