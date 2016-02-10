'use strict';

const dom = require('../../lib/dom');

function buttonEffects(state){
  return dom
    .open('canvas', {'class': 'button_effects', 'width':'1000', 'height':'1000'}).close();
}
function notification(state){
  return dom
    .open('div', {'id': 'notification', 'class': 'notification is-hidden'})
      .open('p')
        .text('The monster is about to attack the ')
        .open('strong').text('WIZARDS').close().text('! ')
        .text('Let your teammates know.')
      .close()
    .close();
}
function topLevelMenu(state){
  return dom
    .open('div', {'id': 'menu-top-level', 'class': 'menu'})
      .open('div', {'class': 'scene'})
        .open('img', {'class': 'scene_player', src: './scene/sprites_fighter01.svg'}).close()
      .close()
      .open('div', {'class': 'controls'})
        .open('h3').text('Ambient Walrus').close()
        .open('div', {'class':'buttons buttons--horizontal'})
          .open('button', {'class':'button button--circular', 'data-action':'select-attack'})
            .open('span', {'class':'button_text'}).text('Attack').close()
            ._append(buttonEffects(state))
          .close()
          .open('button', {'class':'button button--circular', 'data-action':'select-defend'})
            .open('span', {'class':'button_text'}).text('Defend').close()
            ._append(buttonEffects(state))
          .close()
        .close()
      .close()
    .close();
}
function attackMenu(state){
  return dom
    .open('div', {'id':'attack-menu', 'class':'menu menu--offscreen menu--offscreen-left is-hidden'})
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
      .open('button', {'class': 'button menu_back-button', 'data-action':'back'}).text('Go Back').close()
    .close();
}
function defendMenu(state){
  return dom
    .open('div', {'class': 'menu menu--offscreen menu--offscreen-right is-hidden'})
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
      .open('button', {'class': 'button menu_back-button', 'data-action':'back'}).text('Go Back').close()
    .close();
}

module.exports = function(state){
  return dom
    .open('main', {'class': 'main'})
      ._append(notification(state))
      ._append(topLevelMenu(state))
      ._append(attackMenu(state))
      ._append(defendMenu(state));
};
