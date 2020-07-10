/*
=============== 
Objects/Arrays
===============
*/
const cardValues = {
     '2': 2,
     '3': 3,
     '4': 4,
     '5': 5,
     '6': 6,
     '7': 7,
     '8': 8,
     '9': 9,
     '10': 10,
     'J': 10,
     'Q': 10,
     'K': 10,
     'A': {low: 1, high: 11}, 
};

const {A} = cardValues;
const {low, high} = A;

const cardChoices = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

/*
=============== 
Html elements
===============
*/
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const header = document.querySelector("header");


const hitBtn = document.querySelector(".btn-hit");
const standBtn = document.querySelector(".btn-stand");
const dealBtn = document.querySelector(".btn-deal");


/*
=============== 
Values 
===============
*/
let p1Score = 0;
let p2Score = 0;

let p1Wins = 0;
let p2Wins = 0;
let draws = 0;

let p1Turn = true;
let p2Turn = false;
let p1Bust = false;
let p2Bust = false;
let gameOver = false;

let gameMode;

/*
=============== 
Functions
===============
*/

const hit = () => {
     let theCard = randCard();
     if(!gameOver){
          if(p1Turn){
               box1.innerHTML += `<img src="./Static/css/images/${theCard}.png" alt="" id="card"> `;
          } else {
               box2.innerHTML += `<img src="./Static/css/images/${theCard}.png" alt="" id="card"> `;     
          }
     }
          
     updateScore(theCard);
     
     
};

let updateScore = card => {
    let value = cardValues[card];
    let p1Text = document.querySelector(".p1Score");
    let p2Text = document.querySelector(".p2Score");

     if(p1Turn){
          //Sets p1Score variable = to score returned from checkscore and also checks to see if p1Score is > 21
          p1Score = checkScore(p1Score, p1Text, value, card);

          (p1Score > 21) ? 
          (p1Turn = false, p2Turn = true, checkTurnText(), p1Bust = true, (gameMode === "bot") ? botAI() : console.log('Not Bots Turn')) : console.log('did not bust');

          

     } else {
          //Sets p2Score variable = to score returned from checkscore and also checks to see if p2Score is > 21
          p2Score = checkScore(p2Score, p2Text, value, card);

          (p2Score > 21) ? 
          (p2Turn = false, p2Bust = true, checkWinner()) : 
          console.log('Not > 21');
           
     }
};

let randCard = () => {
     //Chooses random card from the array of card choices
     let randNum = Math.floor(Math.random() * cardChoices.length);
     let card = cardChoices[randNum];
     return card;    
};

let checkTurnText = () => {
     let alertText = document.querySelector(".alert");
     const box1Title = document.querySelector(".box1-title");
     const box2Title = document.querySelector(".box2-title");
     //Updates text to show who's turn it is
     p1Turn ? (alertText.textContent = `Its Player 1's turn!`, box1Title.style = 'text-decoration: underline;', 
     box2Title.style = 'text-decoration: none;') : 
     ((gameMode === 'bot') ? (alertText.textContent = `It's the Bot's turn!`): (alertText.textContent = `Its Player 2's turn!`),
     box2Title.style = 'text-decoration: underline;', 
     box1Title.style = 'text-decoration: none;');
}

let checkScore = (pScore, pText, value, card) => {
     //Updates the current players score and updates it based on card, if card is Ace The code then decides to add its low or high value based on the players current score
     (pScore > 10 && card === 'A') ? 
     (pScore += low, pText.textContent = pScore) : 
     (pScore < 10 && card === 'A') ? 
     (pScore += low, pText.textContent = pScore) :
     (pScore += value, pText.textContent = pScore);

     //If score is greater than 21, then the text will say you have busted
     (pScore > 21) ? 
     (pText.textContent = 'Bust', pText.style.color = 'red') :
     console.log('You Have Not Busted');

     return pScore;
}

let stand = () => {
     if(!gameOver){
          p1Turn ? (p2Turn = true, p1Turn = false, checkTurnText(), gameMode === 'bot' ? botAI() : console.log('bot is not being called')) : checkWinner();
     }
}

let deal = () => {
    let p1Text = document.querySelector(".p1Score");
    let p2Text = document.querySelector(".p2Score");
     if(gameOver){
          gameOver = false;
          p1Turn = true;
          p2Turn = false;
          p1Bust = false;
          p2Bust = false;
          p1Score = 0;
          p2Score = 0;
          p2Text.textContent = p2Score;
          p1Text.textContent = p1Score;
          p1Text.style.color = 'white';
          p2Text.style.color = 'white';
          let gameOverAlert = document.querySelector(".alert-game-over");
          gameOverAlert.remove();
          clearBoard();
          checkTurnText();
          hit();
     }
}

let checkMode = () => {
     gameMode = JSON.parse(localStorage.getItem('mode'));
}

let clearBoard = () => {
     document.querySelectorAll("#card").forEach(card => {
          card.remove();
     });
}

let checkWinner = () => {
     let p1WinsText = document.querySelector(".p1Wins");
     let p2WinsText = document.querySelector(".p2Wins");
     let drawsText = document.querySelector(".Draws");
     let alertText = document.querySelector(".alert");
     (p1Bust && p2Bust || p1Score === p2Score) ? 
     (alertText.textContent = 'Draw', draws += 1, drawsText.textContent = draws) :
     (p1Bust || p2Score > p1Score) ? 
     ((gameMode === 'bot') ? (alertText.textContent = `The Bot has won!`) : (alertText.textContent = 'Player 2 has won!'), p2Wins += 1, p2WinsText.textContent = p2Wins) :
     (p2Bust || p1Score > p2Score) ? 
     (alertText.textContent = 'Player 1 has won!', p1Wins += 1, p1WinsText.textContent = p1Wins) : 
     alertText.textContent = 'Something went horribly wrong!';

     header.innerHTML += '<p class="alert-game-over">GAME OVER, CLICK DEAL TO PLAY AGAIN</p>';
     gameOver = true;
}    

let botAI = () => {
     setTimeout(() => {
          (p1Score > 21) ? (hit(), stand()) :
          (p2Score === 21 || p1Score < p2Score) ? stand() : 
          (p1Score > p2Score && p2Score < 17) ? (hit(), botAI()) : 
          (p1Score === p2Score && p2Score < 17) ? (hit(), botAI()) : stand();
     }, 1000);
     
}



/*
=============== 
Events 
===============
*/

hitBtn.addEventListener('click', hit);
standBtn.addEventListener('click', stand);
dealBtn.addEventListener('click', deal);
checkTurnText();
checkMode();

(gameMode === 'bot') ? (document.querySelector(".other-player").textContent = 'BotWins', document.querySelector(".box2-title").innerHTML = 'Bot: <span class="p2Score">0</span>') : console.log('No changes were made');