'use strict';

const Bacon = require('baconjs');

module.exports = (view) => {
  const evst_attack_click      = Bacon.fromEvent(view.attack_button,      'click');
  const evst_attack_back_click = Bacon.fromEvent(view.attack_back_button, 'click');
  const evst_defend_click      = Bacon.fromEvent(view.defend_button,      'click');
  const evst_defend_back_click = Bacon.fromEvent(view.defend_back_button, 'click');

  return {
    evst_attack_click:       evst_attack_click,
    evst_attack_back_click:  evst_attack_back_click,
    evst_defend_click:       evst_defend_click,
    evst_defend_back_click:  evst_defend_back_click
  };
};
