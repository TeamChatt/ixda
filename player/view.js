'use strict';

const Bacon = require('baconjs');
const view  = require('../lib/view');
const dom   = require('./dom');

module.exports = () =>
  view((evst_el) => {
    const state = {
      attack_menu_shown: Bacon.constant(false),
      defend_menu_shown: Bacon.constant(false)
    };

    return {
      el: dom(state).run(),
      events: null
    };
  });
