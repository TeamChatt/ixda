'use strict';

const Bacon      = require('baconjs');
const connection = require('../lib/connection');


connection(evst_st_receive => {
  const send = Bacon.once('presenter');

  evst_st_receive
    .onValue(message => console.log(message));

  return send;
});
