'use strict';

const Bacon           = require('baconjs');
const connection      = require('../lib/connection');
const writeTranscript = require('../lib/write-transcript');


const reset_button = document.querySelector('[data-action="reset"]');
const evst_reset   = Bacon.fromEvent(reset_button, 'click');
evst_reset.log();

connection(receive => {
  const send = Bacon.once('game master');

  receive
    .map((message) => message.data)
    .onValue(writeTranscript);

  return send;
});
