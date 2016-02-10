'use strict';

const Bacon = require('baconjs');

const elements = (el) => ({
  //Attack menu
  attack_button:      el.querySelector('[data-action="select-attack"]'),
  attack_back_button: el.querySelector('#attack-menu [data-action="back"]'),

  attack_head:        el.querySelector('[data-action="attack"][data-target="head"]'),
  attack_tail:        el.querySelector('[data-action="attack"][data-target="tail"]'),
  attack_belly:       el.querySelector('[data-action="attack"][data-target="belly"]'),
  attack_back:        el.querySelector('[data-action="attack"][data-target="back"]'),

  //Defend menu
  defend_button:      el.querySelector('[data-action="select-defend"]'),
  defend_back_button: el.querySelector('#defend-menu [data-action="back"]'),

  defend_wizards:     el.querySelector('[data-action="defend"][data-target="wizards"]'),
  defend_fighters:    el.querySelector('[data-action="defend"][data-target="fighters"]')
});


module.exports = (evst_el) => {
  const view = evst_el.map(elements);

  const evst_attack_click      = view
    .flatMap((elements) => Bacon.fromEvent(elements.attack_button,      'click'));
  const evst_attack_back_click = view
    .flatMap((elements) => Bacon.fromEvent(elements.attack_back_button, 'click'));
  const evst_attack_target     = view
    .flatMap((elements) => Bacon.mergeAll(
        Bacon.fromEvent(elements.attack_head,  'click'),
        Bacon.fromEvent(elements.attack_tail,  'click'),
        Bacon.fromEvent(elements.attack_belly, 'click'),
        Bacon.fromEvent(elements.attack_back,  'click')
      )
    )
    .map((event) => event.currentTarget.getAttribute('data-target'));

  const evst_defend_click      = view
    .flatMap((elements) => Bacon.fromEvent(elements.defend_button,      'click'));
  const evst_defend_back_click = view
    .flatMap((elements) => Bacon.fromEvent(elements.defend_back_button, 'click'));
  const evst_defend_target     = view
    .flatMap((elements) => Bacon.mergeAll(
        Bacon.fromEvent(elements.defend_wizards,  'click'),
        Bacon.fromEvent(elements.defend_fighters, 'click')
      )
    )
    .map((event) => event.currentTarget.getAttribute('data-target'));


  return {
    //Attack Menu
    evst_attack_click:      evst_attack_click,
    evst_attack_back_click: evst_attack_back_click,
    evst_attack_target:     evst_attack_target,

    //Defend Menu
    evst_defend_click:      evst_defend_click,
    evst_defend_back_click: evst_defend_back_click,
    evst_defend_target:     evst_defend_target
  };
};
