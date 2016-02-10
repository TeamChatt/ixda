'use strict';

const dom          = require('../lib/dom');
const menu         = require('./menu/view');
const notification = require('./notification/dom');

module.exports = function(state){
  return dom
    .open('main', {'class': 'main'})
      .view(menu(state))
      ._append(notification(state));
};
