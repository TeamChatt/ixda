'use strict';

const Bacon      = require('baconjs');
const connection = require('../lib/connection');

console.log('player');

connection(receive => {
  const send = Bacon.once('player').delay(100);
  receive.onValue(message => console.log(message));

  return send;
});
