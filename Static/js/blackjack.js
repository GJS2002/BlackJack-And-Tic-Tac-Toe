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
     
};

let updateScore = card => {
    let value = cardValues[card];
    const p1Text = document.querySelector(".p1Score");
    const p2Text = document.querySelector(".p2Score");
     if(!p2Turn){
          if(p1Score > 10 && card === 'A'){
               p1Score += low;
               p1Text.textContent = p1Score;
          } else if (p1Score < 10 && card === 'A'){
               p1Score += high;
               p1Text.textContent = p1Score;
          } else {
               p1Score += value;
               p1Text.textContent = p1Score;
          }
                
     } else {
          if(p2Score > 10 && card === 'A'){
               p1Score += low;
               p1Text.textContent = p1Score;
          } else if (p2Score < 10 && card === 'A'){
               p2Score += high;
               p2Text.textContent = p1Score;
          } else {
               p2Score += value;
               p2Text.textContent = p1Score;
          }
     }
};



let randCard = () => {
     let randNum = Math.floor(Math.random() * cardChoices.length);
     let card = cardChoices[randNum];
     return card;    
};



/*
=============== 
Events 
===============
*/

hitBtn.addEventListener('click', hit);
