'use strict';

const Bacon           = require('baconjs');
const connection      = require('../lib/connection');
const writeTranscript = require('../lib/write-transcript');


connection(evst_st_receive => {
  const send = Bacon.once('presenter');

  evst_st_receive
    .onValue(writeTranscript);

  return send;
});
