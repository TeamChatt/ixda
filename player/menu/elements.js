'use strict';

//Attack menu
const attack_button      = document.querySelector('[data-action="select-attack"]');
const attack_menu        = document.querySelector('#attack-menu');
const attack_back_button = document.querySelector('#attack-menu [data-action="back"]');

//Defend menu
const defend_button      = document.querySelector('[data-action="select-defend"]');
const defend_menu        = document.querySelector('#defend-menu');
const defend_back_button = document.querySelector('#defend-menu [data-action="back"]');

module.exports = {
  attack_button:      attack_button,
  attack_menu:        attack_menu,
  attack_back_button: attack_back_button,

  defend_button:      defend_button,
  defend_menu:        defend_menu,
  defend_back_button: defend_back_button
};
