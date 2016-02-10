'use strict';

const dom          = require('../lib/dom');
const menu         = require('./menu/view');
const notification = require('./notification/view');

module.exports = function(events, state){
  return dom
    .open('main', {'class': 'main'})
      .view(menu(events, state))
      .view(notification(events, state));
};
