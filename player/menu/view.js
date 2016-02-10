'use strict';

const view        = require('../../lib/view');
const menu_events = require('./events');
const menu_state  = require('./state');
const menu_dom    = require('./dom');

module.exports = (/* app_events, app_state */) =>
  view((evst_el) => {
    const events = menu_events(evst_el);
    const state  = menu_state(events);

    return {
      el:     menu_dom(state).run(),
      events: events
    };
  });
