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

  card.innerHTML = `<span class="hidden">${cardsImage[id]}</span>`;

  cards.push(card);
  board.appendChild(card);

  card.style.left = getRandomInt(0, board.offsetWidth-200) + 'px';
  card.style.top = getRandomInt(0, board.offsetHeight-200) + 'px';

  let onTop = false;
  cards.forEach(oldCard => {
    do {
      if (intersects(card.getBoundingClientRect(), oldCard.getBoundingClientRect())) {
        onTop = true;
      } else {
        onTop = false;
        break;
      }
    } while (onTop);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function intersects(r1, r2) {
  return !(r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top);
}

function setCardEventListener(){
  cards.forEach(card => {
    card.addEventListener('click', (ev) => {
      ++openCards;
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
        let activeCards = document.querySelectorAll('.card span:not(.hidden)');
        console.log(activeCards);
        if (activeCards[0].innerText === activeCards[1].innerText) {
          setTimeout(() => {
            activeCards.forEach(c => {
              c.parentNode.style.visibility = 'hidden';
              c.style.opacity = 0;
            });
          }, 1000);
        }
      }
    });
  });
}
