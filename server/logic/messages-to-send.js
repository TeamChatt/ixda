'use strict';

const Bacon = require('baconjs');

const playerCount = require('./player-count');
const monster     = require('./monster');

module.exports = function messagesToSend(roles_joined, messages_in){
  const prop_player_count   = playerCount(roles_joined, messages_in)
    .map((count) => `There are ${count} players`);
  const prop_monster_health = monster(roles_joined, messages_in)
    .map((health) => `Monster has ${health} hit points`);

  //Force subscription so this keeps the correct value even if nobody needs to know it.
  prop_monster_health  .onValue(() => {});
  prop_player_count    .onValue(() => {});


  const evst_st_ping = Bacon.once('ping').delay(10000);

  //messages_out:
  return {
    evst_st_send_to_players:
      evst_st_ping,

    evst_st_send_to_presenters:
      Bacon.mergeAll(
        evst_st_ping,
        prop_monster_health.toEventStream(),
        prop_player_count.toEventStream()
      ),

    evst_st_send_to_gms:
      evst_st_ping
  };
};
