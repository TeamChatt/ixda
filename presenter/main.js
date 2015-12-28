'use strict';

const Bacon      = require('baconjs');
const connection = require('../lib/connection');

console.log('presenter');

connection(receive => {
  const send = Bacon.once('presenter').delay(100);
  receive.onValue(message => console.log(message));

  return send;
});
