'use strict';

/**
 * Resets the cards on the board, along with statistics.
 */
function reset(){
  cards = []; // Empty the array keeping track of cards
  document.querySelectorAll('.card').forEach(card => {
    card.remove(); // Remove all existing cards
  });
  for (let i = 0; i < cardsImage.length; i++) { // Create new cards.
    createCard(i);
  }

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
      ev.target.parentNode.style.zIndex = '10';
      if (openCards > 2) {
        cards.forEach(card => {
          card.style.zIndex = '1';
          card.classList.remove('flipped');
          card.querySelector('span').classList.add('hidden');
          openCards = 1;
        });
      }
      card.classList.toggle('flipped');
      card.querySelector('span').classList.toggle('hidden');

      if (openCards === 2) {
        attemptsEl.innerText = `Attempts: ${++attempts}`; //Update attempts counter
        let activeCards = document.querySelectorAll('.card span:not(.hidden)');
        if (activeCards[0].dataset.id === activeCards[1].dataset.id) {
          setTimeout(() => {
            activeCards.forEach(c => {
              c.parentNode.remove();
              c.style.opacity = 0;
            });
          }, 1000);
        }
      }
    });
  });
}
