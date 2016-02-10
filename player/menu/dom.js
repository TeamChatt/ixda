'use strict';

const dom        = require('../../lib/dom');
const timerSweep = require('../../lib/effects/timer-sweep');

class TimerSweepHook {
  constructor(prop_cooldown){
    this.prop_cooldown = prop_cooldown;
  }
  hook(el){
    this.prop_cooldown
      .changes()
      .filter((is_cooldown) => is_cooldown)
      .onValue(() => {
        timerSweep(el, 5000);
      });
  }
}

function buttonEffects(prop_cooldown){
  return dom
    .open('canvas', {
      'class':       'button_effects',
      'width':       '1000',
      'height':      '1000',
      'timer-sweep': new TimerSweepHook(prop_cooldown)
    }).close();
}
function topLevelMenu(state){
  const prop_disabled = state.prop_cooldown;

  return dom
    .open('div', {'id': 'menu-top-level', 'class': 'menu'})
      //Scene
      .open('div', {'class': 'scene'})
        .open('img', {'class': 'scene_player', 'src': './scene/sprites_fighter01.svg'}).close()
      .close()
      //Controls
      .open('div', {'class': 'controls'})
        .open('h3').text('Ambient Walrus').close()
        .open('div', {'class':'buttons buttons--horizontal'})
          .open('button', {'class':'button button--circular', 'data-action':'select-attack', 'disabled':prop_disabled})
            .open('span', {'class':'button_text'}).text('Attack').close()
            ._append(buttonEffects(prop_disabled))
          .close()
          .open('button', {'class':'button button--circular', 'data-action':'select-defend', 'disabled':prop_disabled})
            .open('span', {'class':'button_text'}).text('Defend').close()
            ._append(buttonEffects(prop_disabled))
          .close()
        .close()
      .close()
    .close();
}
function attackMenu(state){
  const menu_classes = state.prop_attack_menu_shown
    .map(is_shown => is_shown ? '' : 'is-hidden')
    .map(hidden => `menu menu--offscreen menu--offscreen-left ${hidden}`);

  return dom
    .open('div', {'id':'attack-menu', 'class': menu_classes})
      .open('div', {'class': 'menu_contents'})
        .open('header', {'class': 'header'}).text('Attack where?').close()
        .open('div', {'class': 'sprite'}).close()
        .open('div', {'class': 'controls'})
          .open('div', {'class': 'buttons buttons--horizontal'})
            .open('button', {'class': 'button button--circular', 'data-action': 'attack', 'data-target': 'head'})
              .open('span', {'class': 'button_text'}).text('Head').close()
            .close()
            .open('button', {'class': 'button button--circular', 'data-action': 'attack', 'data-target': 'tail'})
              .open('span', {'class': 'button_text'}).text('Tail').close()
            .close()
            .open('button', {'class': 'button button--circular', 'data-action': 'attack', 'data-target': 'belly'})
              .open('span', {'class': 'button_text'}).text('Belly').close()
            .close()
            .open('button', {'class': 'button button--circular', 'data-action': 'attack', 'data-target': 'back'})
              .open('span', {'class': 'button_text'}).text('Back').close()
            .close()
          .close()
        .close()
      .close()
      //Back button
      .open('button', {'class': 'button menu_back-button', 'data-action':'back'}).text('Go Back').close()
    .close();
}
function defendMenu(state){
  const menu_classes = state.prop_defend_menu_shown
    .map(is_shown => is_shown ? '' : 'is-hidden')
    .map(hidden => `menu menu--offscreen menu--offscreen-right ${hidden}`);

  return dom
    .open('div', {'id': 'defend-menu', 'class': menu_classes})
      .open('div', {'class': 'menu_contents'})
        .open('header', {'class': 'header'}).text('Defend whom?').close()
        .open('div', {'class': 'controls'})
          .open('div', {'class': 'buttons buttons--vertical'})
            .open('button', {'class': 'button button--circular', 'data-action': 'defend', 'data-target': 'wizards'})
              .open('span', {'class': 'button_text'}).text('Wizards').close()
            .close()
            .open('button', {'class': 'button button--circular', 'data-action': 'defend', 'data-target': 'fighters'})
              .open('span', {'class': 'button_text'}).text('Fighters').close()
            .close()
          .close()
        .close()
      .close()
      //Back button
      .open('button', {'class': 'button menu_back-button', 'data-action':'back'}).text('Go Back').close()
    .close();
}

module.exports = (state) =>
  dom.open('div', {'class': 'combat-menus'})
    ._append(topLevelMenu(state))
    ._append(attackMenu(state))
    ._append(defendMenu(state));
