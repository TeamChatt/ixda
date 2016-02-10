'use strict';

const dom = require('../../lib/dom');

module.exports = (state) => {
  const notification_classes = state.prop_notification_shown
    .map(is_shown => is_shown ? '' : 'is-hidden')
    .map(hidden => `notification ${hidden}`);

  return dom
    .open('div', {'id': 'notification', 'class': notification_classes})
      .open('p')
        .text('The monster is about to attack the ')
        .open('strong').text('WIZARDS').close().text('! ')
        .text('Let your teammates know.')
      .close();
};
