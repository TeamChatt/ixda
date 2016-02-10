'use strict';

const dom = require('../lib/dom');
const hud = require('./hud/view');

module.exports = (events, state) => {
  return dom
    .open('main', {'class': 'main'})
      //Scene
      .open('div', {'class': 'scene'})
        .open('div', {'class': 'sprite'}).close()
        .open('div', {'class': 'scene_ground'}).close()
      .close()
      //Heads Up Display
      .view(hud(events, state));
};
