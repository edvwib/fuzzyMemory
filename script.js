'use strict';

let time = 0;
const timeEl = document.querySelector('.timer');
const timeM = document.querySelector('.timer .minutes');
const timeS = document.querySelector('.timer .seconds');
setInterval(updateTime, 1000);

const container = document.querySelector('.container');
const board = document.querySelector('.board');
var cards = [];
var cardsImage = [0,0,1,1,2,2,3,3];

for(let i = 0; i < 8; i++){
  createCard(i);
}
