'use strict';

const Bacon           = require('baconjs');
const connection      = require('../lib/connection');
const writeTranscript = require('../lib/write-transcript');

const reset_button       = document.querySelector('[data-action="reset"]');
const evst_message_reset = Bacon.fromEvent(reset_button, 'click')
  .map(() => ({type: 'reset'}));

connection(evst_st_receive => {
  const send = Bacon.mergeAll(
      Bacon.once({type: 'role', value: 'game master'}),
      evst_message_reset
    );

  evst_st_receive
    .onValue(writeTranscript);

  return send;
});
