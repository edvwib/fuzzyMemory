'use strict';

function reset(){

}

function updateTime() {
  ++time;

  let m = Math.round(time / 60);
  let s = time % 60;

  if(s >= 30){/* Do not display minute until a minut has actually passed */
    m -= 1;
  }

  if(m.toString().length < 2){/* Add padding to display if int is 1 number */
    timeM.innerHTML = `0${m}`;
  }else{
    timeM.innerHTML = m;
  }
  if(s.toString().length < 2){
    timeS.innerHTML = `0${s}`;
  }else{
    timeS.innerHTML = s;
  }
}


function createCard(id){
  let card = document.createElement("div");
  card.classList.add('class', 'card');  

  card.innerHTML = `<span class="hidden" data-id="${cardsImage[id]}"></span>`;
  card.childNodes[0].style.backgroundImage = `url('./img/${cardsImage[id]}.png')`;
  
  board.appendChild(card);
  
  card.style.left = getRandomInt(0, board.offsetWidth - 150) + 'px';
  card.style.top = getRandomInt(0, board.offsetHeight - 200) + 'px';
  
  
  let newRect = card.getBoundingClientRect();
  cards.forEach(oldCard => {
    let oldRect = oldCard.getBoundingClientRect();
    setInterval(() => {
      if(intersects(newRect, oldRect)){
        card.style.left = getRandomInt(0, board.offsetWidth-200) + 'px';
        card.style.top = getRandomInt(0, board.offsetHeight-200) + 'px';
        console.log('intersecting');
        newRect = card.getBoundingClientRect();
      }
    },1000);
    
  });
  cards.push(card);
}

function intersects(c1, c2) {
  return !(c2.left > c1.right ||
    c2.right < c1.left ||
    c2.top > c1.bottom ||
    c2.bottom < c1.top);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function setCardEventListener(){
  cards.forEach(card => {
    card.addEventListener('click', (ev) => {
      ++openCards;
      ev.target.style.zIndex = '10';
      if (openCards > 2) {
        cards.forEach(card => {
          card.classList.remove('flipped');
          card.querySelector('span').classList.add('hidden');
          openCards = 1;
        });
      }
      card.classList.toggle('flipped');
      card.querySelector('span').classList.toggle('hidden');

      if (openCards === 2) {
        attemptsSpan.innerText = `Attempts: ${++attempts}`; //Update attempts counter        
        let activeCards = document.querySelectorAll('.card span:not(.hidden)');
        if (activeCards[0].dataset.id === activeCards[1].dataset.id) {
          setTimeout(() => {
            activeCards.forEach(c => {
              c.parentNode.style.visibility = 'hidden';
              c.parentNode.style.zIndex = '0';
              c.style.opacity = 0;
            });
          }, 1000);
        }
      }
    });
  });
}
