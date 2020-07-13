let boxes = document.querySelectorAll(".box");
let clearBtn = document.querySelector(".btn-Clear");

let p1Turn = true;
let p2Turn = false;
let p1Win = false;
let p2Win = false;


let gameOver = false;
let moves = 0;


boxes.forEach(box => {
     box.addEventListener('click', e => {
          let box = e.currentTarget;
          if(!gameOver){

               //If the box is filled then dont do anything, if its not filled then call the fillBox function
               (!box.classList.contains('filled')) ? fillBox(box) : '';
          }
     });
});

let fillBox = box => {
     //If its player 1's turn, get the current boxes classList and add X and add the X image in the html of the current box, if it's player 2's turn, then add O to the boxes classList and add the O image as its html
     (p1Turn) ? (box.classList.add('X'), box.innerHTML = `<img src="./Static/css/images/times.png" alt="">`) : (box.classList.add('O'), box.innerHTML = `<img src="./Static/css/images/circle.png" alt="">
     `);
     box.classList.add("filled");
     updateTurns();
     checkForWinner();
     //Checks to see how many moves were made, if 9 moves were made then the boxes are all filled and the game is over as a draw
     (moves === 9) ? (gameOver = true, checkForWinner()) : '';
}

let clearBoard = () => {
     //If the game is over, then all boxes will have their classLists cleared and their html cleared, this function will also reset the gameOver boolean and set the moves variable back to 0
     if(gameOver){
          boxes.forEach(box => {
               box.innerHTML = '';
               box.classList.remove("X");
               box.classList.remove("O");
               box.classList.remove("filled");
          });
          p1Turn = true;
          p2Turn = false;
          gameOver = false;
          moves = 0;
     }
}

let updateTurns = () => {
     //If it's p1's turn then set that to false and set p2's turn to true and vise versa if its player 2's turn
     (p1Turn) ? (p1Turn = false, p2Turn = true) : (p1Turn = true, p2Turn = false) 
     moves += 1;
}

let checkForWinner = () => {
     let xBoxes = document.querySelectorAll(".X");
     let oBoxes = document.querySelectorAll(".O");
     let X = [];
     let O = [];

     (checkWinLogic(xBoxes, X) === true) ? (gameOver = true, p1Win = true) : '';
     
     (checkWinLogic(oBoxes, O) === true) ? (gameOver = true, p2Win = true) : '';
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

clearBtn.addEventListener('click', clearBoard);