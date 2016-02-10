'use strict';

const Bacon = require('baconjs');

module.exports = (app_events) => {
  const prop_notification_shown   = Bacon.mergeAll(
    app_events.notify
      .map(() => true),
    app_events.notify.delay(4000)
      .map(() => false)
    )
    .toProperty(false);
  const prop_st_notification_text = app_events.notify
    .toProperty('');

  return {
    prop_notification_shown:   prop_notification_shown,
    prop_st_notification_text: prop_st_notification_text
  };
};
