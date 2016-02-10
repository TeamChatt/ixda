'use strict';

const Bacon = require('baconjs');
const view  = require('../lib/view');
const dom   = require('./dom');

module.exports = () =>
  view((/* evst_el */) => {
    const events = {
      notify: Bacon.once('message').delay(10000)
    };
    const state = {
    };

    return {
      el: dom(events, state).run(),
      events: null
    };
  });
