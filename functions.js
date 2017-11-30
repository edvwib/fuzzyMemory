'use strict';

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
  card.setAttribute('class', 'card');
  card.setAttribute('data-id', id);

  console.log(card.style.width);


  card.style.left = getRandomInt(0, board.offsetWidth-175) + 'px';
  card.style.top = getRandomInt(0, board.offsetHeight-150) + 'px';

  cards.push(card);
  board.appendChild(card);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  console.log(max);

  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
