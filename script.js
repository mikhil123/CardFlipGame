const cardsArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardsArray, ...cardsArray]; // duplicate for pairs
let moves = 0;
let firstCard, secondCard;
let lockBoard = false;

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Generate cards
const gameBoard = document.getElementById('gameBoard');
cards.forEach(symbol => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.innerText = '';
  gameBoard.appendChild(card);
});

// Card click event
gameBoard.addEventListener('click', function(e) {
  const clicked = e.target;
  
  if (clicked.classList.contains('card') && !clicked.classList.contains('flipped') && !lockBoard) {
    clicked.classList.add('flipped');
    clicked.innerText = clicked.dataset.symbol;

    if (!firstCard) {
      firstCard = clicked;
    } else {
      secondCard = clicked;
      lockBoard = true;
      moves++;
      document.getElementById('moves').innerText = moves;
      
      if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          firstCard.innerText = '';
          secondCard.innerText = '';
          firstCard = null;
          secondCard = null;
          lockBoard = false;
        }, 1000);
      }
    }
  }
});

// Restart button
document.getElementById('restart').addEventListener('click', () => {
  window.location.reload();
});
