/*
=============== 
Objects and arrays
===============
*/


/*
=============== 
Html DOM elements
===============
*/
const boxes = document.querySelectorAll(".box");
const clearBtn = document.querySelector(".btn-Clear");
const turnText = document.querySelector(".alert");
let p1WinsText = document.querySelector(".p1Wins");
let p2WinsText = document.querySelector(".p2Wins");
let draws = document.querySelector(".Draws");

/*
=============== 
Variables
===============
*/
let p1Turn = true;
let p2Turn = false;
let p1Win = false;
let p2Win = false;
let draw = false;
let gameOver = false;
let movesMade = 0;
let mode = JSON.parse(localStorage.getItem('mode'));

let X = [];
let O = [];


/*
=============== 
Functions
===============
*/


boxes.forEach(box => {
     box.addEventListener('click', e => {
          let box = e.currentTarget;
          if(!gameOver && mode !== 'bot'){
               //If the box is filled then dont do anything, if its not filled then call the fillBox function
               (!box.classList.contains('filled')) ? fillBox(box) : '';
          } else if(p1Turn && !gameOver && mode === 'bot'){
               //If the box is filled then dont do anything, if its not filled then call the fillBox function
               (!box.classList.contains('filled')) ? fillBox(box) : '';
          } else {
               console.log(`its the bot's turn`);
          }
     });
});

let fillBox = box => {
     //If its player 1's turn, get the current boxes classList and add X and add the X image in the html of the current box, if it's player 2's turn, then add O to the boxes classList and add the O image as its html
     (p1Turn) ? (box.classList.add('X'), box.innerHTML = `<img src="./Static/css/images/times.png" alt="">`) : (box.classList.add('O'), box.innerHTML = `<img src="./Static/css/images/circle.png" alt="">
     `);
     box.classList.add("filled");
     box.classList.remove("available");
     updateTurns();
     (mode === 'bot' && p2Turn) ? 
     setTimeout(() => {
          botLogic()
     }, 1000)  : '';
     checkForWinner();
     //Checks to see how many moves were made, if 9 moves were made then the boxes are all filled and the game is over as a draw
     (movesMade === 9) ? (gameOver = true, checkForWinner(), clearBtn.classList.remove("hide"), draw = true, showWinner()) : '';
}

let clearBoard = () => {
     //If the game is over, then all boxes will have their classLists cleared and their html cleared, this function will also reset the gameOver boolean and set the moves variable back to 0
     if(gameOver){
          boxes.forEach(box => {
               box.innerHTML = '';
               box.classList.remove("X");
               box.classList.remove("O");
               box.classList.remove("filled");
               box.classList.remove("flash");
               box.classList.add("available");
          });
          p1Turn = true;
          p2Turn = false;
          p1Win = false;
          p2Win = false;
          gameOver = false;
          movesMade = 0;
           
          clearBtn.classList.add("hide");
          turnText.textContent = `It's Player 1's turn!`;
     }
}

let updateTurns = () => {
     //If it's p1's turn then set that to false and set p2's turn to true and vise versa if its player 2's turn
     (p1Turn) ? (p1Turn = false, p2Turn = true, turnText.textContent = `It's player 2's turn!`) : (p1Turn = true, p2Turn = false, turnText.textContent = `It's player 1's turn!`) 
     movesMade += 1;
     
}

let checkForWinner = () => {
     let xBoxes = document.querySelectorAll(".X");
     let oBoxes = document.querySelectorAll(".O");
     X = [];
     O = [];
    

     (checkWinLogic(xBoxes, X) === true) ? (gameOver = true, p1Win = true, clearBtn.classList.remove("hide"), showWinner(X)) : '';
     
     (checkWinLogic(oBoxes, O) === true) ? (gameOver = true, p2Win = true, clearBtn.classList.remove("hide"), showWinner(O)) : '';
}

let checkWinLogic = (boxes, boxArray) => {
     let win = false;

     boxes.forEach(box => {
          boxArray.push(parseFloat(box.id));
     });
     
     boxArray.forEach(num => {
          (num === 1) ? (
               (boxArray.includes(num + 1) && boxArray.includes(num + 2))
               ? (win = true) : 
               (boxArray.includes(num + 3) && boxArray.includes(num + 6))
               ? (win = true) : 
               (boxArray.includes(num + 4) && boxArray.includes(num + 8))
               ? (win = true) : ''
          ) : 
          (num === 2) ? (
               (boxArray.includes(num + 3) && boxArray.includes(num + 6))
               ? (win = true) : ''
          ) : 
          (num === 3) ? (
               (boxArray.includes(num + 3) && boxArray.includes(num + 6))
               ? (win = true) : 
               (boxArray.includes(num + 2) && boxArray.includes(num + 4))
               ? (win = true) : ''
          ) : 
          (num === 4) ? (
               (boxArray.includes(num + 1) && boxArray.includes(num + 2))
               ? (win = true) : ''
          ) : 
          (num === 7) ? (
               (boxArray.includes(num + 1) && boxArray.includes(num + 2))
               ? (win = true) : ''
          ) : ''
     });
     return win;
}

let showWinner = array => {
     (p1Win) ? 
     (turnText.textContent = `Player 1 has won!`, p1WinsText.textContent = parseFloat(p1WinsText.textContent) + 1) : 
     (p2Win) ? 
     (turnText.textContent = `Player 2 has won!`, p2WinsText.textContent = parseFloat(p2WinsText.textContent) + 1) : 
     (draw) ? (turnText.textContent = `Draw`, draws.textContent = parseFloat(draws.textContent) + 1) : ''

     array.forEach(num => {
          let winningBox = document.querySelector(`.box-${num}`);
          winningBox.classList.add("flash");
     });
    
}

let botLogic = () => {
     if(!gameOver){
          let firstMoves = [boxes[6], boxes[0], boxes[2], boxes[8]];
          let allMoves = document.querySelectorAll(".available");
          (movesMade === 1 && !boxes[4].classList.contains("filled")) 
          ? fillBox(boxes[4]) : (movesMade === 1 && boxes[4].classList.contains("filled")) ? fillBox(randomMove(firstMoves)) 
          : (X.includes(1) && X.includes(2) && !boxes[2].classList.contains("filled")) ? fillBox(boxes[2]) :

               (X.includes(1) && X.includes(3) && !boxes[1].classList.contains("filled")) ? fillBox(boxes[1]) :

               (X.includes(1) && X.includes(4) && !boxes[6].classList.contains("filled")) ? fillBox(boxes[6]) : 

               (X.includes(1) && X.includes(7) && !boxes[3].classList.contains("filled")) ? fillBox(boxes[3]) : 

               (X.includes(1) && X.includes(5) && !boxes[3].classList.contains("filled")) ?  fillBox(boxes[3]) : 

               (X.includes(1) && X.includes(9) && !boxes[4].classList.contains("filled")) ?  fillBox(boxes[4]) : 
           
               (X.includes(2) && X.includes(5) && !boxes[7].classList.contains("filled")) ?  fillBox(boxes[7]) : 

               (X.includes(2) && X.includes(8) && !boxes[4].classList.contains("filled")) ?  fillBox(boxes[4]) : 
        
          
               (X.includes(3) && X.includes(6) && !boxes[8].classList.contains("filled")) ?  fillBox(boxes[8]) : 

               (X.includes(3) && X.includes(9) && !boxes[5].classList.contains("filled")) ?  fillBox(boxes[5]) : 

               (X.includes(3) && X.includes(5) && !boxes[6].classList.contains("filled")) ?  fillBox(boxes[6]) : 

               (X.includes(3) && X.includes(7) && !boxes[4].classList.contains("filled")) ?  fillBox(boxes[4]) : 
               
               (X.includes(5) && X.includes(7) && !boxes[2].classList.contains("filled")) ?  fillBox(boxes[2]) : 


               (X.includes(4) && X.includes(5) && !boxes[5].classList.contains("filled")) ?  fillBox(boxes[5]) :

               (X.includes(4) && X.includes(6) && !boxes[4].classList.contains("filled")) ?  fillBox(boxes[4]) : 
          

               (X.includes(7) && X.includes(8) && !boxes[8].classList.contains("filled")) ?  fillBox(boxes[8]) :

               (X.includes(7) && X.includes(9) && !boxes[7].classList.contains("filled")) ?  fillBox(boxes[7]) : 
               
               (fillBox(randomMove(allMoves)), console.log('yo6'))
           
          }

}

let randomMove = (array) => {
     console.log('im being called');
     let randIndex = Math.floor(Math.random() * array.length);
     let currentMove = array[randIndex];
     return array[randIndex];
     
}

/*
=============== 
Event Listeners
===============
*/

clearBtn.addEventListener('click', clearBoard);
