'use strict';

const Bacon = require('baconjs');

const elements = (el) => ({
  //Attack menu
  attack_button:      el.querySelector('[data-action="select-attack"]'),
  attack_menu:        el.querySelector('#attack-menu'),
  attack_back_button: el.querySelector('#attack-menu [data-action="back"]'),
  //Defend menu
  defend_button:      el.querySelector('[data-action="select-defend"]'),
  defend_menu:        el.querySelector('#defend-menu'),
  defend_back_button: el.querySelector('#defend-menu [data-action="back"]')
});


module.exports = (evst_el) => {
  const view = evst_el.map(elements);

  const evst_attack_click      = view
    .flatMap((elements) => Bacon.fromEvent(elements.attack_button,      'click'));
  const evst_attack_back_click = view
    .flatMap((elements) => Bacon.fromEvent(elements.attack_back_button, 'click'));
  const evst_defend_click      = view
    .flatMap((elements) => Bacon.fromEvent(elements.defend_button,      'click'));
  const evst_defend_back_click = view
    .flatMap((elements) => Bacon.fromEvent(elements.defend_back_button, 'click'));

  return {
    evst_attack_click:       evst_attack_click,
    evst_attack_back_click:  evst_attack_back_click,
    evst_defend_click:       evst_defend_click,
    evst_defend_back_click:  evst_defend_back_click
  };
};
