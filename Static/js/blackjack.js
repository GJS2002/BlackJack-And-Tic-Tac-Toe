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
     //gets random card
     let theCard = randCard();
     //If the game is not over, then the hit button code will work
     if(!gameOver){
          if(p1Turn){
               //Adds a card to the player1 div on the screen
               box1.innerHTML += `<img src="./Static/css/images/${theCard}.png" alt="" id="card"> `;
          } else {
               //Adds a card to the player2/bot div on the screen
               box2.innerHTML += `<img src="./Static/css/images/${theCard}.png" alt="" id="card"> `;     
          }
          //Updates the score based on the card chosen
          updateScore(theCard);
     }
};

let updateScore = card => {
    //Gets the value of the card that was put in the function parameters
    let value = cardValues[card];


    let p1Text = document.querySelector(".p1Score");
    let p2Text = document.querySelector(".p2Score");

     if(p1Turn){
          //Sets p1Score variable = to score returned from checkscore and also checks to see if p1Score is > 21
          p1Score = checkScore(p1Score, p1Text, value, card);

          (p1Score > 21) ? 
          //Automatically makes it player 2's turn if player 1's score is above 21
          (p1Turn = false, p2Turn = true, checkTurnText(), p1Bust = true, (gameMode === "bot") ? 
          //If the user chose the gameMode to be against a bot, this will then run the bot AI and remove event Listeners from the buttons to prevent the user from clicking the buttons while the bot AI is working
          (botAI(), hitBtn.removeEventListener('click', hit), standBtn.removeEventListener('click', stand)) : console.log('Not Bots Turn')) : console.log('did not bust');

     } else {
          //Sets p2Score variable = to score returned from checkscore and also checks to see if p2Score is > 21
          p2Score = checkScore(p2Score, p2Text, value, card);

          (p2Score > 21) ? 
          //Automatically sets player 2's turn to false and checks to see who the winner is if the score is > 21
          (p2Turn = false, p2Bust = true, checkWinner()) : 
          console.log('Not > 21');
           
     }
};

let randCard = () => {
     //Chooses random card from the array of card choices by generating a random number
     let randNum = Math.floor(Math.random() * cardChoices.length);
     let card = cardChoices[randNum];
     return card;    
};

let checkTurnText = () => {
     let alertText = document.querySelector(".alert");
     const box1Title = document.querySelector(".box1-title");
     const box2Title = document.querySelector(".box2-title");
     //Updates text to alert the user of who's turn it is by changing the header text and underlining the current player
     p1Turn ? (alertText.textContent = `Its Player 1's turn!`, box1Title.style = 'text-decoration: underline;', 
     box2Title.style = 'text-decoration: none;') : 
     ((gameMode === 'bot') ? (alertText.textContent = `It's the Bot's turn!`): (alertText.textContent = `Its Player 2's turn!`),
     box2Title.style = 'text-decoration: underline;', 
     box1Title.style = 'text-decoration: none;');
}

let checkScore = (pScore, pText, value, card) => {
     console.log(card);
     //Updates the current players score and updates it based on card, if card is Ace The code then decides to add its low or high value based on the players current score
     (pScore > 10 && card === 'A') ? 
     (pScore += 1, pText.textContent = pScore) : 
     (pScore < 10 && card === 'A') ? 
     (pScore += 11, pText.textContent = pScore) :
     (pScore += value, pText.textContent = pScore);

     //If score is greater than 21, then the text will say you have busted
     (pScore > 21) ? 
     (pText.textContent = 'Bust', pText.style.color = 'red') :
     console.log('You Have Not Busted');

     return pScore;
}

let stand = () => {
     //If the game is not over then the stand code will run
     if(!gameOver){
          //If its player 1's turn, then it just sets the boolean values to show that its player 2's turn, but if the gamemode chosen was bot, then it runs the botAI and removes events from the buttons to prevent the user from clicking buttons while the bot AI is running, if its not player 1's turn, then the code will check who won by calling the checkWinner function
          p1Turn ? (p2Turn = true, p1Turn = false, checkTurnText(), gameMode === 'bot' ? (botAI(), hitBtn.removeEventListener('click', hit), standBtn.removeEventListener('click', stand)) : console.log('bot is not being called')) : checkWinner();
     }
}

let deal = () => {
    let p1Text = document.querySelector(".p1Score");
    let p2Text = document.querySelector(".p2Score");
     if(gameOver){
          //Resets everything back the way it was and deals out one card to player 1 so you can play again
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
          //Removes text telling user the game is over
          let gameOverAlert = document.querySelector(".alert-game-over");
          gameOverAlert.remove();
          //If gamemode is bot then events were removed at some point to prevent a but where the user could click buttons while the bot AI was working, this will add those events back
          (gameMode === 'bot') ? addEvents() : console.log('No need to add events again');
          //Find funcitons, there are comments with them that explain what they do
          clearBoard();
          checkTurnText();
          startingCards();
     }
}

let checkMode = () => {
     //Grabs selected mode from local storage where it was stored at the main menu
     gameMode = JSON.parse(localStorage.getItem('mode'));
}

let clearBoard = () => {
     //Clears all cards off of the board by looping through them
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
     //Adds +1 to draws on the table and displayes the text Draw where the alert is 
     (alertText.textContent = 'Draw', draws += 1, drawsText.textContent = draws) :
     (p1Bust || p2Score > p1Score && !p2Bust) ? 
     //Adds +1 to Player 2 wins/Bot wins on the table and displays the text Player 2/Bot has won where the alert is 
     ((gameMode === 'bot') ? (alertText.textContent = `The Bot has won!`) : (alertText.textContent = 'Player 2 has won!'), p2Wins += 1, p2WinsText.textContent = p2Wins) :
     (p2Bust || p1Score > p2Score) ? 
     //Adds +1 to Player 1 wins on the table and displays the text 'Player 1 has won' where the alert is  
     (alertText.textContent = 'Player 1 has won!', p1Wins += 1, p1WinsText.textContent = p1Wins) : 
     //If you see this an error has occoured
     alertText.textContent = 'Something went horribly wrong!';

     //Displays this text in the header to alert the player that the game is over and to continue playing they must click the deal button
     header.innerHTML += '<p class="alert-game-over">GAME OVER, CLICK DEAL TO PLAY AGAIN</p>';
     gameOver = true;
}    

let botAI = () => {
     //Bot logic that tells the cpu what to do based on the given outcomes, also delays the code by 1 second to prevent the computer from giving any errors or crashing the website
     setTimeout(() => {
          (p1Score > 21) ? (hit(), stand()) :
          (p2Score === 21 || p1Score < p2Score) ? stand() : 
          (p1Score > p2Score && p2Score < 17) ? (hit(), botAI()) : 
          (p1Score === p2Score && p2Score < 17) ? (hit(), botAI()) : stand();
     }, 1000);
     
}

let addEvents = () => {
     //Adds events to the buttons so that they work
     hitBtn.addEventListener('click', hit);
     standBtn.addEventListener('click', stand);
     dealBtn.addEventListener('click', deal);
}

let startingCards = () => {
     //gets random card
     let p1Card = randCard();
     let p2Card = randCard();
     
     
     //Adds a card to the player1 div on the screen
     box1.innerHTML += `<img src="./Static/css/images/${p1Card}.png" alt="" id="card"> `;
     //Updates the score based on the card chosen
     updateScore(p1Card);
     setTimeout(() => {
          //Shifts turns to correctly add score and give card to player 2
          p1Turn = false;
          p2Turn = true;
          //Adds a card to the player2/bot div on the screen
          box2.innerHTML += `<img src="./Static/css/images/${p2Card}.png" alt="" id="card"> `;     
          //Updates the score based on the card chosen
          updateScore(p2Card);
          document.querySelector(".p2Score").textContent = p2Score;
          //Resets turn values to resume normal play
          p1Turn = true;
          p2Turn = false;    
     }, 100);
}

/*
=============== 
Events 
===============
*/
addEvents();
checkTurnText();
checkMode();
startingCards();

//Checks if the gameMode is bot, if it is then it will change the text displayed to let the user know they are playing against a bot
(gameMode === 'bot') ? (document.querySelector(".other-player").textContent = 'BotWins', document.querySelector(".box2-title").innerHTML = 'Bot: <span class="p2Score">0</span>') : console.log('No changes were made');