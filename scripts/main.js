const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
let deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const startGame = document.getElementById("deal-button");

let dealerCards = [];
let playerCards = [];

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
  console.log(sum);
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
  console.log("dealer", dealerCards);
  console.log("player", playerCards);
  console.log(deck);
  dealrunningSum(dealerCards);
};

const renderCard = (card, targetElement) => {
  const img = document.createElement("img");
  img.dataset.suit = card.suit;
  img.dataset.rank = card.rank;
  targetElement.append(img);
};

startGame.onclick = gameStart;

window.addEventListener("DOMContentLoaded", function () {});
