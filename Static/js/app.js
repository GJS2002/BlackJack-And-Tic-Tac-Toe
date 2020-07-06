const swup = new Swup();
const botBtn = document.querySelector(".btn-bot");
const playerBtn = document.querySelector(".btn-player");
const btns = document.querySelectorAll("button");
const links = document.querySelectorAll("a");
let header = document.querySelector("h1");


localStorage.setItem('mode', '');

btns.forEach(btn => {
     btn.addEventListener('click', e => {
          let theBtn = e.currentTarget;
          btns.forEach(btn => {btn.classList.remove('selected')});
          theBtn.classList.add("selected");
          setLocalStorage(theBtn.dataset.id);
     });
});   

links.forEach(link => {
     link.addEventListener('click', e => {
          let currentLink = e.currentTarget;
          let mode = getLocalStorage('mode');
          
          
          if(mode === ''){
               currentLink.preventDefault();
               header.textContent = 'Please Select a mode';
               setTimeout(() => {
                    header.textContent = 'Main Menu';
               }, 3000);
          } 
     })
     
})

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

