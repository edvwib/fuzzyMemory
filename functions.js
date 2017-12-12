'use strict';

/**
 * Resets the cards on the board, along with statistics.
 */
function reset(){
  popup.style.visibility = 'hidden';
  overlay.style.visibility = 'hidden';
  cards = []; // Otherwise it will cause a loop when creating new cards
  document.querySelectorAll('.card').forEach(card => {
    card.remove();
  });
  createCards();
  cards.forEach(card => {/* Adding new EventListeners, since the elements have been replaced  */
    card.addEventListener('click', (ev) => {
      checkCards(ev, card);
    });
  });
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
    timeM.textContent = `0${m}`;
  }else{
    timeM.textContent = m;
  }
  if(s.toString().length < 2){// Add padding to display if int is 1 number
    timeS.textContent = `0${s}`;
  }else{
    timeS.textContent = s;
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
    let span = document.createElement('span');
    span.classList.add('hidden');
    span.setAttribute('data-id', cardsImage[i]);
    span.setAttribute('data-uid', i);
    card.appendChild(span);
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
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkCards(ev, card){
  openCards++;
  card.classList.toggle('flipped');
  card.querySelector('span').classList.toggle('hidden');
  // activeCards = document.querySelectorAll('.card span:not(.hidden)');
  activeCards.push(card.firstChild);
  if(activeCards.length === 0){
    console.log('sd');
    openCards = 1;
  }


  if (openCards === 1) {
    card.style.zIndex = '10';
  }
  if (openCards === 2) {
    attemptsEl.innerText = `Attempts: ${++attempts}`; //Update attempts counter
    if (activeCards[0].dataset.uid === activeCards[1].dataset.uid) {
      attemptsEl.innerText = `Attempts: ${--attempts}`;
      card.classList.add('flipped');
      card.firstChild.classList.remove('hidden');
      activeCards = [];
      activeCards.push(card.firstChild);
      openCards = 1;
    }else if (activeCards[0].dataset.id === activeCards[1].dataset.id) {
      setTimeout(() => {
        activeCards[0].parentNode.remove();
        activeCards[1].parentNode.remove();
        activeCards = [];
        openCards = 0;
      }, 1500);
    }else {
      setTimeout(() => {
        activeCards[0].parentNode.classList.remove('flipped');
        activeCards[1].parentNode.classList.remove('flipped');
        activeCards[0].classList.add('hidden');
        activeCards[1].classList.add('hidden');
        activeCards = [];
        openCards = 0;
      }, 1500);
    }
    //Check if there are no cards left on the board
    setTimeout(() => {
      let count = document.querySelectorAll('.card');
      if (count.length === 0) {
        displayEnd();
      }
    }, 1750);
  }
}


function displayEnd(){
  popup = document.querySelector('.popup');
  popupText = popup.querySelector('p');
  overlay = document.querySelector('.overlay');
  if (timeM.textContent === '00') {
    popupText.textContent = `You won!<br>And it only took you ${timeS.textContent} seconds, with a total of ${attempts} attempts!`;
  }else {
    popupText.textContent = `You won!<br>And it only took you ${timeM.textContent} minutes and ${timeS.textContent} seconds, with a total of ${attempts} attempts!`;
  }

  popup.style.visibility = 'visible';
  overlay.style.visibility = 'visible';
}
