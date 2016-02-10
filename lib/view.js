'use strict';

const Bacon = require('baconjs');

module.exports = (view) => {
  const fwd = new Bacon.Bus();
  const {el, events} = view(fwd);

  window.setTimeout(() => {
    fwd.push(el);
    fwd.end();
  }, 0);

  return {
    type:    'Widget',
    init:    () => el,
    update:  () => void 0,
    destroy: () => void 0,
    el:      el,
    events:  events
  };
};
