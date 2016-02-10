'use strict';

const view               = require('../../lib/view');
const notification_state = require('./state');
const notification_dom   = require('./dom');

module.exports = (app_events /*, app_state */) =>
  view(() => {
    const state = notification_state(app_events);
    return {
      el:     notification_dom(state).run(),
      events: null
    };
  });
