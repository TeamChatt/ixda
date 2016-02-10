'use strict';

const view    = require('../../lib/view');
const hud_dom = require('./dom');

module.exports = (app_events, app_state) =>
  view((/*evst_el*/) => {
    return {
      el:     hud_dom(app_events, app_state).run(),
      events: null
    };
  });
