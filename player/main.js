'use strict';

const Bacon      = require('baconjs');
const connection = require('../lib/connection');


const view = require('./view')();
document.querySelector('body').appendChild(view.el);

//Events
const evst_role = Bacon.once('fighter');

//Connection
connection(evst_st_receive => {
  const send = Bacon.mergeAll(
      view.events.evst_attack_target.map((target) => ({type: 'attack', value: target})),
      view.events.evst_defend_target.map((target) => ({type: 'defend', value: target})),
      evst_role.map((role) => ({type: 'role', value: role}))
    );

  evst_st_receive
    .onValue(st_content => console.log(st_content));

  return send;
});
