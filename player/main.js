'use strict';

const Bacon      = require('baconjs');
const connection = require('../lib/connection');


const view = require('./view');
document.querySelector('body').appendChild(view().el);

//DOM events
const evst_st_role   = Bacon.once('fighter');

//Connection
connection(evst_st_receive => {
  const send = Bacon.mergeAll(
      evst_st_role
    );

  evst_st_receive
    .onValue(st_content => console.log(st_content));

  return send;
});
