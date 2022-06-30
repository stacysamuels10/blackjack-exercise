const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const makeDeck = (rank, suit) => {
  let pointValue = rank;

  const card = {
    rank: rank,
    suit: suit,
    pointValue: rank > 10 ? 10 : rank,
  };
  deck.push(card);
};
for (let suit of suits) {
  for (const rank of ranks) {
    makeDeck(rank, suit);
  }
}

const getCard = () => {
  const dealtCard = Math.floor(Math.random() * deck.length - 1) + 1;
  return deck.splice(dealtCard, 1)[0];
};

const dealerStartHand = () => {
  const dealerCard1 = getCard();
  const dCard1num = Object.values(dealerCard1)[0];
  const dCard1suit = Object.values(dealerCard1)[1];
  const dealerCard2 = getCard();
  const dCard2num = Object.values(dealerCard2)[0];
  const dCard2suit = Object.values(dealerCard2)[1];
  sum = dCard1num + dCard2num;
  console.log("you're hand adds up to", sum);
};

const playerStartHand = () => {
  const playerCard1 = getCard();
  const playerCard2 = getCard();
};

dealerStartHand();
playerStartHand();

window.addEventListener("DOMContentLoaded", function () {});
