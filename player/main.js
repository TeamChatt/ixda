'use strict';

const Bacon           = require('baconjs');
const connection      = require('../lib/connection');
const writeTranscript = require('../lib/write-transcript');


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

//Button states
const prop_attack_button_enabled = Bacon.mergeAll(
    evst_st_role
      .map(() => true),
    evst_st_attack
      .map(() => false),
    evst_st_attack
      .map(() => true)
      .delay(5000)
  )
  .toProperty(false);

prop_attack_button_enabled
  .onValue((is_enabled) => {
    attack_button.disabled = !is_enabled;
  });

const prop_role_buttons_enabled = evst_st_role
  .map(() => false)
  .toProperty(true);

prop_role_buttons_enabled
  .onValue((is_enabled) => {
    wizard_button.disabled  = !is_enabled;
    fighter_button.disabled = !is_enabled;
  });

//Connection
connection(evst_st_receive => {
  const send = Bacon.mergeAll(
      evst_st_role,
      evst_st_attack
    );

  evst_st_receive
    .onValue(writeTranscript);

  return send;
});
