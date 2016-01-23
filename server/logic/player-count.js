'use strict';

const Bacon = require('baconjs');

const incrementCount = (c) => c+1;
const resetCount     = ()  => 0;

module.exports = function playerCount(roles_joined, messages_in){
  //Reset the count when the gm clicks "reset"
  const evst_reset_count = messages_in
    .evst_gm_messages
    .filter((message) => message.st_content === 'reset')
    .map(() => resetCount);
  //Increment the count when a new player joins
  const evst_increment_count = Bacon.mergeAll(
      roles_joined.evst_ws_wizard_join,
      roles_joined.evst_ws_fighter_join
    )
    .map(() => incrementCount);

  //prop number
  return evst_reset_count
    .merge(evst_increment_count)
    .scan(0, (c,f) => f(c));
};
