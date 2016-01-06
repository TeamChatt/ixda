'use strict';

const Bacon = require('baconjs');

const incrementCount = (c) => c+1;
const resetCount     = ()  => 0;

module.exports = function messagesToSend(roles_joined, messages_in){
  const evst_reset_count = messages_in
    .evst_gm_messages
    .filter((message) => message.st_content === 'reset')
    .map(() => resetCount);
  const evst_increment_count = roles_joined.evst_ws_player_join
    .map(() => incrementCount);

  const prop_player_count = evst_reset_count
    .merge(evst_increment_count)
    .scan(0, (c,f) => f(c))
    .map((count) => `There are ${count} players`);

  //Force subscription so this keeps the correct value even if nobody needs to know it.
  prop_player_count.onValue(() => {});

  const evst_st_ping = Bacon.once('ping').delay(10000);

  //messages_out:
  return {
    evst_st_send_to_players:
      evst_st_ping,

    evst_st_send_to_presenters:
      Bacon.mergeAll(
        evst_st_ping,
        prop_player_count.toEventStream()
      ),

    evst_st_send_to_gms:
      evst_st_ping
  };
};
