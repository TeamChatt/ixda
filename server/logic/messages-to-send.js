'use strict';

const Bacon = require('baconjs');

const playerCount = require('./player-count');
const monster     = require('./monster');

module.exports = function messagesToSend(roles_joined, messages_in){
  const prop_player_count = playerCount(roles_joined, messages_in);
  const monster_health    = monster(roles_joined, messages_in);

  //Force subscription so this keeps the correct value even if nobody needs to know it.
  monster_health    .onValue(() => {});
  prop_player_count .onValue(() => {});


  const evst_st_ping = Bacon.once('ping').delay(10000);

  //messages_out:
  return {
    evst_st_send_to_players:
      evst_st_ping,

    evst_st_send_to_presenters:
      Bacon.mergeAll(
        evst_st_ping,
        monster_health.toEventStream(),
        prop_player_count.toEventStream()
      ),

    evst_st_send_to_gms:
      evst_st_ping
  };
};
