'use strict';

const Bacon           = require('baconjs');
const connection      = require('../lib/connection');
const writeTranscript = require('../lib/write-transcript');


const reset_button  = document.querySelector('[data-action="reset"]');
const evst_st_reset = Bacon.fromEvent(reset_button, 'click')
  .map(() => 'reset');

connection(receive => {
  const send = Bacon.once('game master')
    .merge(evst_st_reset);

  receive
    .map((message) => message.data)
    .onValue(writeTranscript);

  return send;
});
