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
const hitBtn = document.querySelector(".btn-hit");
const turnText = document.querySelector(".turn");
/*
=============== 
Values 
===============
*/
let p1Score = 0;
let p2Score = 0;

let p1Turn = true;
let p2Turn = false;

/*
=============== 
Functions
===============
*/

const hit = () => {
     let theCard = randCard();
     if(p1Turn){
          box1.innerHTML += `<img src="./Static/css/images/${theCard}.png" alt="">`;
     } else {
          box2.innerHTML += `<img src="./Static/css/images/${theCard}.png" alt="">`;
     }
     
     updateScore(theCard);
     console.log(p2Score);
     
};

let updateScore = card => {
    let value = cardValues[card];
    const p1Text = document.querySelector(".p1Score");
    const p2Text = document.querySelector(".p2Score");

     if(!p2Turn){
          //Updates player1's score based on the card, if its an ace it decides between a value of 1 and 11 based on the current score
          p1Score = checkScore(p1Score, p1Text, value, card);
                
     } else {
          //Updates player2's score based on the card, if its an ace it decides between a value of 1 and 11 based on the current score
          p2Score = checkScore(p2Score, p2Text, value, card);
     }
};



let randCard = () => {
     let randNum = Math.floor(Math.random() * cardChoices.length);
     let card = cardChoices[randNum];
     return card;    
};

let checkTurnText = () => {
     if(!p2Turn){
          turnText.textContent = `Its Player 1's turn!`;
     } else {
          turnText.textContent = `Its Player 2's turn!`;
     }
}

let checkScore = (pScore, pText, value, card) => {
     if(pScore > 10 && card === 'A'){
          pScore += low;
          pText.textContent = pScore;
          console.log(pScore);
          
     } else if (pScore < 10 && card === 'A'){
          pScore += high;
          pText.textContent = pScore;
     } else {
          pScore += value;
          pText.textContent = pScore;
     }
     if(pScore > 21){
          pText.textContent = 'Bust';
          pText.style.color = 'red';
     }

     return pScore;
}

let checkMode = () => {

}

/*
=============== 
Events 
===============
*/

hitBtn.addEventListener('click', hit);
checkTurnText();