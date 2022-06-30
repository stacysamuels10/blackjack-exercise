const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const startGame = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");

const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

let deck = [];
let dealerCards = [];
let playerCards = [];

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
  sum = 0;
  for (card of dealerCards) {
    const num = card.pointValue;
    sum += num;
  }
  console.log("dealer: ", sum);
};

let playrunningSum = (playerCards) => {
  sum = 0;
  for (card of playerCards) {
    const num = card.pointValue;
    sum += num;
  }
  console.log("player: ", sum);
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
  if (sum > 21) {
    gameRefresh();
  }
};
startGame.onclick = () => {
  startGame.setAttribute("disabled", "disabled");
  gameRefresh();
};

window.addEventListener("DOMContentLoaded", function () {});
