'use strict';

const Bacon      = require('baconjs');
const connection = require('../lib/connection');

console.log('game master');

const ws = connection();
ws.onValue(message => {
  console.log(message);
});
