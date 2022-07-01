const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const startGame = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");

const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

let deck = [];
let dealerCards = [];
let playerCards = [];

const youLost = () => {
  window.alert("You Lost!");
};

const youWin = () => {
  window.alert("You Win!");
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

const playerHit = () => {
  addPlayerCard();
  console.log(playerCards);
  playrunningSum(playerCards);
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
const getCard = () => {
  const dealtCard = Math.floor(Math.random() * deck.length - 1) + 1;
  return deck.splice(dealtCard, 1)[0];
};

let dealrunningSum = (dealerCards) => {
  dsum = 0;
  for (card of dealerCards) {
    const num = card.pointValue;
    dsum += num;
  }
  console.log("dealer: ", dsum);
};

let playrunningSum = (playerCards) => {
  psum = 0;
  for (card of playerCards) {
    const num = card.pointValue;
    psum += num;
  }

  console.log("player: ", psum);
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
};

const renderCard = (card, targetElement) => {
  const img = document.createElement("img");
  img.src = "./images/" + card.rank + "_of_" + card.suit + ".png";
  targetElement.append(img);
};

hitButton.onclick = () => {
  playerHit();
  setTimeout(() => {
    if (psum > 21) {
      youLost();
      gameStart();
    }
    factorAcesp(playerCards);
    factorAcesd(dealerCards);
  }, 500);
};

startGame.onclick = () => {
  startGame.setAttribute("disabled", "disabled");
  gameRefresh();
  factorAcesp(playerCards);
  factorAcesd(dealerCards);
  console.log("players sum", psum);
  console.log("dealers sum", dsum);
};

window.addEventListener("DOMContentLoaded", function () {});
