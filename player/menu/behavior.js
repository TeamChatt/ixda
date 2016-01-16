'use strict';

const menu_elements = require('./elements');
const menuEvents    = require('./events');
const menuState     = require('./state');
const timerSweep    = require('../../lib/effects/timer-sweep');


const menu_events = menuEvents(menu_elements);
const menu_state  = menuState(menu_events);

//Behavior
menu_state.prop_attack_menu_shown
  .onValue((is_shown) => {
    menu_elements.attack_menu
      .classList
      .toggle('is-hidden', !is_shown);
  });

menu_state.prop_defend_menu_shown
  .onValue((is_shown) => {
    menu_elements.defend_menu
      .classList
      .toggle('is-hidden', !is_shown);
  });

menu_state.prop_cooldown
  .onValue((is_cooldown) => {
    menu_elements.attack_button.disabled = is_cooldown;
    menu_elements.defend_button.disabled = is_cooldown;
  });
menu_state.prop_cooldown
  .changes()
  .filter((is_cooldown) => is_cooldown)
  .onValue(() => {
    timerSweep(menu_elements.attack_button, 5000);
    timerSweep(menu_elements.defend_button, 5000);
  });
