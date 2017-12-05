'use strict';

/**
 * Resets the cards on the board, along with statistics.
 */
function reset(){
  cards = []; // Otherwise it will cause a loop when creating new cards
  document.querySelectorAll('.card').forEach(card => {
    card.remove();
  });
  createCards();
  setCardEventListener(); /* Adding new EventListeners, since the elements have
                             been replaced  */
  time = -1; // Reset the time, -1 so it dispalys 00:00
  attempts = 0;
}

/**
 * Runs on an interval every second, and updates the element in
 * the HTML to dispaly a clock. Not very accurate, but it works for now.
 */
function updateTime() {
  ++time;

  let m = Math.round(time / 60);
  let s = time % 60;

  if(s >= 30){/* Do not display minute until a minut has actually passed */
    m -= 1;
  }

  if(m.toString().length < 2){// Add padding to display if int is 1 number
    timeM.innerHTML = `0${m}`;
  }else{
    timeM.innerHTML = m;
  }
  if(s.toString().length < 2){// Add padding to display if int is 1 number
    timeS.innerHTML = `0${s}`;
  }else{
    timeS.innerHTML = s;
  }
}

/**
 * Creates a card and adds it to the array of cards, to easily loop through
 * them later on. Also positions them reandomly on the board and tries not to
 * place them on top of one another.
 */
function createCards(){
  for(let i = 0; i < cardsImage.length; i++) {
    let card = document.createElement("div");
    card.classList.add('class', 'card');

    card.innerHTML = `<span class="hidden" data-id="${cardsImage[i]}"></span>`;
    card.childNodes[0].style.backgroundImage = `url('./img/${cardsImage[i]}.png')`;

    board.appendChild(card);

    for (let i = 0; i < 250; i++) {
      setTimeout(() => {
        card.style.left = getRandomInt(0, board.offsetWidth-200) + 'px';
        card.style.top = getRandomInt(0, board.offsetHeight-200) + 'px';
      },500);
    }
    cards.push(card);
  }
}

/**
 * Returns random int between min-max.
 * @param  {[int]} min
 * @param  {[int]} max
 * @return {[int]}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function checkCards(ev, card){
  openCards++;
  card.classList.toggle('flipped');
  card.querySelector('span').classList.toggle('hidden');
  if (openCards === 1) {
    card.style.zIndex = '10';
  }
  if (openCards === 2) {
    attemptsEl.innerText = `Attempts: ${++attempts}`; //Update attempts counter
    let activeCards = document.querySelectorAll('.card span:not(.hidden)');
    if (activeCards[0].dataset.id === activeCards[1].dataset.id) {
      setTimeout(() => {
        activeCards[0].parentNode.remove();
        activeCards[1].parentNode.remove();
        activeCards = null;
        openCards = 0;
      }, 1500);
    }else {
      setTimeout(() => {
        activeCards[0].parentNode.classList.remove('flipped');
        activeCards[1].parentNode.classList.remove('flipped');
        activeCards[0].classList.add('hidden');
        activeCards[1].classList.add('hidden');
        activeCards = null;
        openCards = 0;
      }, 1500);
    }

    //Check if there are no cards left on the board
    setTimeout(() => {
      let count = document.querySelectorAll('.card');
      console.log(count);
      if (count.length === 0) {
        displayEnd();
      }
    }, 1750);
  }
}


function displayEnd(){
  let popup = document.querySelector('.popup');
  let overlay = document.querySelector('.overlay');
  popup.style.display = 'block';
  overlay.style.display = 'block';

}
