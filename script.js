'use strict';

let attempts = 0;
const attemptsEl = document.querySelector('.attempts');
let time = 0;
const timeEl = document.querySelector('.timer');
const timeM = document.querySelector('.timer .minutes');
const timeS = document.querySelector('.timer .seconds');
const resetEl = document.querySelector('.reset');
setInterval(updateTime, 1000);

const container = document.querySelector('.container');
const board = document.querySelector('.board');
let cards = []; //Used for keeping track of cards
let cardsImage = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
let openCards = 0;

createCards();

setCardEventListener();

resetEl.addEventListener('click', () => {
  reset();
});
