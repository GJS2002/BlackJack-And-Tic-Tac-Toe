const swup = new Swup();
const botBtn = document.querySelector(".btn-bot");
const playerBtn = document.querySelector(".btn-player");
const btns = document.querySelectorAll("button");


btns.forEach(btn => {
     btn.addEventListener('click', e => {
          let theBtn = e.currentTarget;
          btns.forEach(btn => {btn.classList.remove('selected')});
          theBtn.classList.add("selected");
     })
})



