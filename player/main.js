'use strict';

const Bacon           = require('baconjs');
const connection      = require('../lib/connection');
const writeTranscript = require('../lib/write-transcript');


connection(receive => {
  const send = Bacon.once('player');

  receive
    .log()
    .map((message) => message.data)
    .log()
    .onValue(writeTranscript);

  return send;
});
