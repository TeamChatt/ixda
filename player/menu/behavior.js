'use strict';

const menu_elements = require('./elements');
const menuEvents    = require('./events');
const menuState     = require('./state');


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
