const swup = new Swup();
let btns;

//Sets the selected gamemode to the mode item in local storage so other pages can determine if a bot is included or not
let setLocalStorage = mode => {
     let gameMode = getLocalStorage(mode);
     gameMode = mode.toString();
     localStorage.setItem('mode', JSON.stringify(gameMode));
}

//Grabs the current gamemode from localStorage and if it doesnt exist it sets it to an empty string
let getLocalStorage = mode => {
     let s = localStorage.getItem(mode)?JSON.parse(localStorage.getItem(mode)): '';
     return s;
}

//Sets local storage by default to bot 
setLocalStorage('bot');

//Event for buttons that removes and adds selected class and changes local storage based on
let btnEvents = btn => {
     btns = document.querySelectorAll("button");
     btns.forEach(btn => {btn.classList.remove('selected')});
     btn.classList.add("selected");
     setLocalStorage(btn.dataset.id);
}


