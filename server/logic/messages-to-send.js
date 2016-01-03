'use strict';

const Bacon = require('baconjs');


module.exports = function messagesToSend(roles_joined, messages_in){
  const evst_st_ping      = Bacon.once('ping').delay(10000);
  const prop_player_count = roles_joined.evst_ws_player_join
    .map(() => 1)
    .scan(0, (x,y) => x+y)
    .map(c => `There are ${c} players`);


  //Force subscription so this keeps the correct value even if nobody needs to know it.
  prop_player_count.onValue(() => {});

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
