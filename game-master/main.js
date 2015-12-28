'use strict';

const Bacon      = require('baconjs');
const connection = require('../lib/connection');

console.log('game master');

connection(receive => {
  const send = Bacon.once('game master').delay(100);
  receive.onValue(message => console.log(message));

  return send;
});
