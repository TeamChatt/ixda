'use strict';

const Bacon = require('baconjs');

//Notification
const notification = document.querySelector('#notification');

const evst_st_notification = Bacon.once('message')
  .delay(20000);

evst_st_notification
  .onValue((st_notification) => {
    console.log(st_notification);
    notification.classList.toggle('is-hidden');
  });
