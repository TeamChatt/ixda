'use strict';

const Bacon = require('baconjs');

module.exports = (menu_events) => {
  const prop_attack_menu_shown = Bacon.mergeAll(
      menu_events
        .evst_attack_click
        .map(() => true),
      menu_events
        .evst_attack_back_click
        .map(() => false)
    )
    .toProperty(false);

  const prop_defend_menu_shown = Bacon.mergeAll(
      menu_events
        .evst_defend_click
        .map(() => true),
      menu_events
        .evst_defend_back_click
        .map(() => false)
    )
    .toProperty(false);

  return {
    prop_attack_menu_shown: prop_attack_menu_shown,
    prop_defend_menu_shown: prop_defend_menu_shown
  };
};
