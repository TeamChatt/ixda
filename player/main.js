'use strict';

const Bacon           = require('baconjs');
const connection      = require('../lib/connection');
const writeTranscript = require('../lib/write-transcript');


const attack_button  = document.querySelector('[data-action="attack"]');
const evst_st_attack = Bacon.fromEvent(attack_button, 'click')
  .map(() => ({type: 'attack'}));


const prop_button_enabled = Bacon.mergeAll(
    evst_st_attack
      .map(() => false),
    evst_st_attack
      .delay(5000)
      .map(() => true)
  )
  .toProperty(true);

prop_button_enabled
  .onValue((is_enabled) => {
    attack_button.disabled = !is_enabled;
  });


connection(evst_st_receive => {
  const send = Bacon.mergeAll(
      Bacon.once({type: 'role', value: 'player'}),
      evst_st_attack
    );

  evst_st_receive
    .onValue(writeTranscript);

  return send;
});
