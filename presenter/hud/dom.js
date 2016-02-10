'use strict';

const dom = require('../../lib/dom');

function healthBar(prop_health){
  const bar_style = prop_health
    .map((health) => `width: ${health * 100}%;`);

  return dom
    .open('div', {'class': 'meter meter--small health-bar'})
      .open('div', {'class': 'meter_fill meter_fill--left', 'style': bar_style}).close()
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

module.exports = (app_events, app_state) => {
  return dom
    .open('div', {'class': 'hud'})
      .open('div', {'class': 'hud_row'})
        ._append(healthBar(app_state.monster_health))
      .close()
      .open('div', {'class': 'hud_row'})
        ._append(notification())
        ._append(playerMetrics())
      .close();
};
