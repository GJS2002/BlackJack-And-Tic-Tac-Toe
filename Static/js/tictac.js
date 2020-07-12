let boxes = document.querySelectorAll(".box");
let clearBtn = document.querySelector(".btn-Clear");

let p1Turn = true;
let p2Turn = false;
let gameOver = false;
let moves = 0;


boxes.forEach(box => {
     box.addEventListener('click', e => {
          let box = e.currentTarget;
          //If the box is filled then dont do anything, if its not filled then call the fillBox function
          (!box.classList.contains('filled')) ? fillBox(box) : '';
     });
});

let fillBox = box => {
     //If its player 1's turn, get the current boxes classList and add X and add the X image in the html of the current box, if it's player 2's turn, then add O to the boxes classList and add the O image as its html
     (p1Turn) ? (box.classList.add('X'), box.innerHTML = `<img src="./Static/css/images/times.png" alt="">`) : (box.classList.add('O'), box.innerHTML = `<img src="./Static/css/images/circle.png" alt="">
     `);
     box.classList.add("filled");
     updateTurns();
     //Checks to see how many moves were made, if 9 moves were made then the boxes are all filled and the game is over as a draw
     (moves === 9) ? gameOver = true : '';
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


clearBtn.addEventListener('click', clearBoard);