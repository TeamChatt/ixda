'use strict';

const dom = require('../../lib/dom');

module.exports = (state) =>
  dom
    .open('div', {'id': 'notification', 'class': 'notification is-hidden'})
      .open('p')
        .text('The monster is about to attack the ')
        .open('strong').text('WIZARDS').close().text('! ')
        .text('Let your teammates know.')
      .close();
