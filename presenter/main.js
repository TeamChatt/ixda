'use strict';

const Bacon           = require('baconjs');
const connection      = require('../lib/connection');
const writeTranscript = require('../lib/write-transcript');


connection(receive => {
  const send = Bacon.once('presenter');

  receive
    .map((message) => message.data)
    .onValue(writeTranscript);

  return send;
});
