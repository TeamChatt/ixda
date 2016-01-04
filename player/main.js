'use strict';

const Bacon           = require('baconjs');
const connection      = require('../lib/connection');
const writeTranscript = require('../lib/write-transcript');


const attack_button = document.querySelector('[data-action="attack"]');
const evst_attack   = Bacon.fromEvent(attack_button, 'click');
evst_attack.log();

connection(receive => {
  const send = Bacon.once('player');

  receive
    .map((message) => message.data)
    .onValue(writeTranscript);

  return send;
});
