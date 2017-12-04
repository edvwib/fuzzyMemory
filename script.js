'use strict';

let attempts = 0;
const attemptsEl = document.querySelector('.attempts');
let time = 0;
const timeEl = document.querySelector('.timer');
const timeM = document.querySelector('.timer .minutes');
const timeS = document.querySelector('.timer .seconds');
setInterval(updateTime, 1000);

const container = document.querySelector('.container');
const board = document.querySelector('.board');
var cards = [];
var cardsImage = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
var openCards = 0;


for(let i = 0; i < cardsImage.length; i++){
  createCard(i);
}

setCardEventListener();

document.querySelector('.reset').addEventListener('click', (ev) => {
  reset();
});
