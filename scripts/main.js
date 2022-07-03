const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const startGame = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const dealerPoints = document.getElementById("dealer-points");
const playerPoints = document.getElementById("player-points");

const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

let deck = [];
let dealerCards = [];
let playerCards = [];

const playerStand = () => {
  hitButton.setAttribute("disabled", "disabled");
  standButton.setAttribute("disabled", "disabled");
  while (dsum < 17) {
    dealrunningSum(dealerCards);
    addDealerCard();
    dealrunningSum(dealerCards);
  }
  setTimeout(() => {
    if (psum > dsum) {
      youWin();
    }
    if (dsum > psum && dsum < 21) {
      youLost();
    }
    if (dsum > 21) {
      youWin();
    }
  }, 500);
};
const playerHit = () => {
  addPlayerCard();
  playrunningSum(playerCards);
};

const youLost = () => {
  window.alert("You Lost!");
  hitButton.setAttribute("disabled", "disabled");
  standButton.setAttribute("disabled", "disabled");
  gameStart();
};
const youWin = () => {
  window.alert("You Win!");
  hitButton.setAttribute("disabled", "disabled");
  standButton.setAttribute("disabled", "disabled");
  gameStart();
};

const instantCheck = () => {
  for (card of dealerCards) {
    const ace = card.pointValue;
    if (ace === 1 && dsum === 11) {
      dsum += 10;
      dealerPoints.innerText = dsum;
      playerPoints.innerText = psum;
      setTimeout(() => {
        youLost();
      }, 500);
    }
  }
  for (card of playerCards) {
    const ace = card.pointValue;
    if (ace === 1 && psum === 11) {
      psum += 10;
      dealerPoints.innerText = dsum;
      playerPoints.innerText = psum;
      setTimeout(() => {
        youWin();
      }, 500);
    }
  }
};
const factorAcesp = (playerCards) => {
  for (card of playerCards) {
    const ace = card.pointValue;
    if (ace === 1 && psum < 11) {
      psum = psum + 10;
      return psum;
    }
  }
};
const factorAcesd = (dealerCards) => {
  for (card of dealerCards) {
    const ace = card.pointValue;
    if (ace === 1 && dsum < 11) {
      dsum = dsum + 10;
      return dsum;
    }
  }
};
let dealrunningSum = (dealerCards) => {
  dsum = 0;
  for (card of dealerCards) {
    const num = card.pointValue;
    dsum += num;
  }
};
let playrunningSum = (playerCards) => {
  psum = 0;
  for (card of playerCards) {
    const num = card.pointValue;
    psum += num;
  }
};

const makeDeck = (rank, suit) => {
  let pointValue = rank;

  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};
const makeNewDeck = () => {
  for (let suit of suits) {
    for (const rank of ranks) {
      makeDeck(rank, suit);
    }
  }
};
const renderCard = (card, targetElement) => {
  const img = document.createElement("img");
  img.src = "./images/" + card.rank + "_of_" + card.suit + ".png";
  targetElement.append(img);
};
const getCard = () => {
  const dealtCard = Math.floor(Math.random() * deck.length - 1) + 1;
  return deck.splice(dealtCard, 1)[0];
};
const addPlayerCard = () => {
  const card = getCard();
  playerCards.push(card);
  renderCard(card, playerHand);
};
const addDealerCard = () => {
  const card = getCard();
  dealerCards.push(card);
  renderCard(card, dealerHand);
};

const gameStart = () => {
  startGame.removeAttribute("disabled", "disabled");
};
const gameRefresh = () => {
  dealerHand.innerHTML = null;
  playerHand.innerHTML = null;
  dealerCards = [];
  playerCards = [];
  deck = [];
  makeNewDeck();
  addPlayerCard();
  addDealerCard();
  addPlayerCard();
  addDealerCard();
  dealrunningSum(dealerCards);
  playrunningSum(playerCards);
  instantCheck();
};

hitButton.onclick = () => {
  playerHit();
  console.log("dealers sum", dsum);
  console.log("players sum", psum);
  setTimeout(() => {
    if (psum > 21) {
      youLost();
      gameStart();
    }
    factorAcesp(playerCards);
    factorAcesd(dealerCards);
  }, 500);
  dealerPoints.innerText = dsum;
  playerPoints.innerText = psum;
};
standButton.onclick = () => {
  playerStand();
  dealerPoints.innerText = dsum;
  playerPoints.innerText = psum;
};

startGame.onclick = () => {
  //startGame.setAttribute("disabled", "disabled");
  hitButton.removeAttribute("disabled", "disabled");
  standButton.removeAttribute("disabled", "disabled");
  gameRefresh();
  factorAcesp(playerCards);
  factorAcesd(dealerCards);
  console.log("players sum", psum);
  console.log("dealers sum", dsum);
  dealerPoints.innerText = dsum;
  playerPoints.innerText = psum;
};

window.addEventListener("DOMContentLoaded", function () {});
