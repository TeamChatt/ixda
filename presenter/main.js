'use strict';

const Bacon      = require('baconjs');
const connection = require('../lib/connection');

console.log('presenter');

const ws = connection();
ws.onValue(message => {
  console.log(message);
});
