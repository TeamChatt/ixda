'use strict';

const dom = require('../lib/dom');

function healthBar(){
  return dom
    .open('div', {'class': 'meter meter--small health-bar'})
      .open('div', {'class': 'meter_fill meter_fill--left', 'style': 'width: 40%;'}).close()
    .close();
}
function playerMetrics(){
  return dom
    .open('div', {'class': 'meter meter--large player-metrics'})
      .open('div', {'class': 'meter_fill meter_fill--left player-metrics_attacking',  'style':'width: 40%;'}).close()
      .open('div', {'class': 'meter_fill meter_fill--right player-metrics_defending', 'style':'width: 60%;'}).close()
    .close();
}
function notification(){
  return dom
    .open('div', {'class': 'notification'})
      .text('The monster attacks')
    .close();
}

module.exports = (/* events, state */) => {
  return dom
    .open('main', {'class': 'main'})
      //Scene
      .open('div', {'class': 'scene'})
        .open('div', {'class': 'sprite'}).close()
        .open('div', {'class': 'scene_ground'}).close()
      .close()

      //Heads Up Display
      .open('div', {'class': 'hud'})
        .open('div', {'class': 'hud_row'})
          ._append(healthBar())
        .close()
        .open('div', {'class': 'hud_row'})
          ._append(notification())
          ._append(playerMetrics())
        .close()
      .close();
};
