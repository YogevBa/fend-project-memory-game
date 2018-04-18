 let cards = document.querySelectorAll('.card');
 const restart = document.querySelector('.restart');
 const playAgain = document.querySelector('#playAgain');
 let openCards = [];
 let cardsArray = [];
 let firstCard;
 let pairs = 0;
 let moves = 0;
 let cardsCounter = 0;
 let minutesLabel = document.getElementById("minutes");
 let secondsLabel = document.getElementById("seconds");
 let totalSeconds = 0;
 let timeCounter = setInterval(startTimer, 1000);
 let movesDisplay = document.querySelector('.moves');
 let stars = document.querySelector('.stars');
 let star1 = document.querySelector('.star1');
 let star2 = document.querySelector('.star2');
 let star3 = document.querySelector('.star3');
 let summaryModal = $("#myModal");



function init() {
  restart.addEventListener('click' , function(){
    restartGame();
  });
  cardsBuilder();
  cardListener();
  restartGame();
}
// Sets the card's click event and basic functionality of flipping cards.
 function cardListener(){
   for (let i = 0; i<cards.length; i++){
    cards[i].addEventListener('click' , function(){
      cardsCounter += 1;
      if (this.classList.contains('open')) {
        cardsCounter -= 1;
        return;
      }
      else if (cardsCounter <= 2){
        showCard(this);
        addToOpenCards(this);
      }
      if (cardsCounter === 2){
        moves += 1;
        movesDisplay.textContent = moves;
        starRatings();
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
// Reset game and shuffle cards.
function restartGame(){
    $('#myModal').modal('hide');
    cardsBuilder();
    resetTimer();
    startTimer();
    starRatings();


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
      moves += 1;
      movesDisplay.textContent = moves;
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
      $("#myModal").modal();
      summary();
    },1500)
  }
}
// Shuffle function.
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
// Starts the count up timer.
function startTimer() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}
// Resets the timer.
function resetTimer() {
  totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds = 0);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds = 0));
}

// Sets the logic of number of string values for the timer.
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
// Builds and reform the game cards on the document.
function cardsBuilder(){
  cardsArray = Array.prototype.slice.call(cards); //transform NodeList to array.
  cardsArray = shuffle(cardsArray);
  openCards = [];
  pairs = 0;
  cardsCounter = 0;
  moves = 0;
  movesDisplay.textContent = 0;
  star1.style.display = "inline";
  star2.style.display = "inline";
  star3.style.display = "inline";
  document.querySelector('.deck').innerHTML = ''; //clears the innerHTML elements of "deck".
  cardsArray.forEach(function(elem){
    if (elem.classList.contains('match') || elem.classList.contains('open') || elem.classList.contains('show')){
      elem.classList.remove('match');
      removeCard(elem);
    }
    document.querySelector('.deck').appendChild(elem);
  });
  cardListener();
}
//Sets the condition for the star rating.
function starRatings(){
  // if no matches were found after 6 tries player looses 1 star
  if (moves === 6){
    star1.style.display = "none";
  }
  else if(moves === 12){
    star2.style.display = "none";
  }
  else if (moves >= 18){
    star3.style.display = "none";
  }
}

function summary(){
  $("#seconds").clone().appendTo("#summarySecs");
  $("#minutes").clone().appendTo("#summaryMin");
  $(".stars").clone().appendTo("#summaryStars");
  playAgain.addEventListener('click' , function(){
    restartGame();
  });
}

init();






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
