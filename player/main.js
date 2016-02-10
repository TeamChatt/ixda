'use strict';

const Bacon      = require('baconjs');
const connection = require('../lib/connection');

// require('./menu/behavior');
// require('./notification/behavior');

const dom = require('./menu/dom');
const el  = dom().run();

document.querySelector('body').appendChild(el);

//DOM elements
const wizard_button  = document.querySelector('[data-action="role-wizard"]');
const fighter_button = document.querySelector('[data-action="role-fighter"]');
const attack_button  = document.querySelector('[data-action="attack"]');

//DOM events
const evst_st_role   = Bacon.mergeAll(
    Bacon.fromEvent(wizard_button, 'click')
      .map(() => 'wizard'),
    Bacon.fromEvent(fighter_button, 'click')
      .map(() => 'fighter')
  )
  .map((role) => ({type: 'role', value: role}))
  .take(1);

const evst_st_attack = evst_st_role
  .flatMap(() => Bacon.fromEvent(attack_button, 'click'))
  .map(() => ({type: 'attack'}));

//Connection
connection(evst_st_receive => {
  const send = Bacon.mergeAll(
      evst_st_role,
      evst_st_attack
    );

  evst_st_receive
    .onValue(st_content => console.log(st_content));

  return send;
});
