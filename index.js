const cardArray = [
  { name: "crab", img: "/icons8-crab-100 (2).png" },
  { name: "butterfly", img: "/icons8-butterfly-100.png" },
  { name: "cat", img: "/icons8-cat-100.png" },
  { name: "dolphin", img: "/icons8-dolphin-100.png" },
  { name: "rabbit", img: "/icons8-rabbit-100.png" },
  { name: "snail", img: "/icons8-snail-100.png" },
  { name: "turtle", img: "/icons8-turtle-100.png" },
  { name: "shiba-inu", img: "/icons8-shiba-inu-100.png" },
  { name: "crab", img: "/icons8-crab-100 (2).png" },
  { name: "butterfly", img: "/icons8-butterfly-100.png" },
  { name: "cat", img: "/icons8-cat-100.png" },
  { name: "dolphin", img: "/icons8-dolphin-100.png" },
  { name: "rabbit", img: "/icons8-rabbit-100.png" },
  { name: "snail", img: "/icons8-snail-100.png" },
  { name: "turtle", img: "/icons8-turtle-100.png" },
  { name: "shiba-inu", img: "/icons8-shiba-inu-100.png" },
];
// console.log(cardArray);
cardArray.sort(() => Math.random() - 0.5);

let cardChosen = [];
let cardChosenIds = [];
let cardsWon = [];
///game lost message if not finished within 60seconds
// setTimeout(game, 60000);
// function game() {
//   if (
//     document.querySelector("#result").innerHTML !==
//     "congratulations! you found them all!"
//   ) {
//     alert("game over! You lost!");
//   } else {
//     alert("you won!!");
//   }
// }

//start playing timer starts
let timerStart = document.getElementById("seconds");
let lostBox = document.getElementById("lost");
let wonBox = document.getElementById("won");
let bg = document.querySelector("section");
let startBtn = document.querySelector("#start");
function start() {
  startBtn.disabled = true;
  createBoard();
  // alert("start clicked");
  let initialCountValue = 60;
  setInterval(function () {
    initialCountValue = initialCountValue > 0 ? initialCountValue - 1 : 0;
    timerStart.innerHTML = initialCountValue;
    if (initialCountValue === 0 && cardsWon.length != cardArray.length / 2) {
      // alert("you lost!");
      lostBox.style.display = "block";
      bg.classList.add("blur");
    }
  }, 1000);
}
//play again
function playAgain() {
  location.reload();
}
// grid board creation
let gridDisplay = document.querySelector("#grid");
function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    let card = document.createElement("img");
    card.setAttribute("src", "/icons8-rubik's-cube-100.png");
    card.setAttribute("data-id", i);
    console.log(card, i);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
}

//function to flip card
function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardChosen.push(cardArray[cardId].name);
  cardChosenIds.push(cardId);
  console.log(cardChosen);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}
//function to check match
function checkMatch() {
  let firstCard = cardChosenIds[0];
  let secondCard = cardChosenIds[1];

  const cardsClicked = document.querySelectorAll("img");
  if (firstCard == secondCard) {
    cardsClicked[firstCard].setAttribute("src", "/icons8-rubik's-cube-100.png");
    cardsClicked[secondCard].setAttribute(
      "src",
      "/icons8-rubik's-cube-100.png"
    );
    alert("you clicked the same card");
  } else if (cardChosen[0] == cardChosen[1]) {
    cardsClicked[firstCard].setAttribute("src", "/icons8-square-100.png");
    cardsClicked[secondCard].setAttribute("src", "/icons8-square-100.png");
    cardsClicked[firstCard].removeEventListener("click", flipCard);
    cardsClicked[secondCard].removeEventListener("click", flipCard);
    cardsWon.push(cardChosen[0]);
  } else {
    cardsClicked[firstCard].setAttribute("src", "/icons8-rubik's-cube-100.png");
    cardsClicked[secondCard].setAttribute(
      "src",
      "/icons8-rubik's-cube-100.png"
    );
  }

  cardChosen = [];
  cardChosenIds = [];
  document.querySelector("#result").textContent = cardsWon.length;
  if (cardsWon.length == cardArray.length / 2) {
    document.querySelector("#result").innerHTML =
      "congratulations! you found them all!";
    wonBox.style.display = "block";
    bg.classList.add("blur");
  }
}
