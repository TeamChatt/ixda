'use strict';

const Bacon           = require('baconjs');
const connection      = require('../lib/connection');
const writeTranscript = require('../lib/write-transcript');


const attack_button  = document.querySelector('[data-action="attack"]');
const evst_st_attack = Bacon.fromEvent(attack_button, 'click')
  .map(() => 'attack');

connection(evst_st_receive => {
  const send = Bacon.once('player')
    .merge(evst_st_attack);

  evst_st_receive
    .onValue(writeTranscript);

  return send;
});
