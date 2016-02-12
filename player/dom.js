'use strict';

const dom = require('../lib/dom');

module.exports = (events, state, views) => {
  return dom
    .open('main', {'class': 'main'})
      .view(views.menu)
      .view(views.notification);
};
