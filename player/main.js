'use strict';

const Bacon      = require('baconjs');
const connection = require('../lib/connection');

console.log('player');

connection(receive => {
  const send = Bacon.once('player').delay(100);
  receive.onValue(message => console.log(message));

  return send;
});


//UI stuff
const attack_button      = document.querySelector('[data-action="attack"]');
const attack_menu        = document.querySelector('#attack-menu');
const attack_back_button = document.querySelector('#attack-menu [data-action="back"]');

attack_button.addEventListener('click', () => {
  attack_menu.classList.toggle('is-hidden');
});
attack_back_button.addEventListener('click', () => {
  attack_menu.classList.toggle('is-hidden');
});

const defend_button      = document.querySelector('[data-action="defend"]');
const defend_menu        = document.querySelector('#defend-menu');
const defend_back_button = document.querySelector('#defend-menu [data-action="back"]');

defend_button.addEventListener('click', () => {
  defend_menu.classList.toggle('is-hidden');
});
defend_back_button.addEventListener('click', () => {
  defend_menu.classList.toggle('is-hidden');
});
