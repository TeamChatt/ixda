'use strict';

const Bacon = require('baconjs');
const view  = require('../lib/view');

const menu         = require('./menu/view');
const notification = require('./notification/view');
const dom          = require('./dom');

module.exports = () =>
  view((/* evst_el */) => {
    const events = {
      notify: Bacon.once('message').delay(10000)
    };
    const state = {
    };
    const views = {
      menu:         menu(events,state),
      notification: notification(events, state)
    };


    const events_out = {
      evst_attack_target: views.menu.events.evst_attack_target,
      evst_defend_target: views.menu.events.evst_defend_target
    };

    return {
      el:     dom(events, state, views).run(),
      events: events_out
    };
  });
