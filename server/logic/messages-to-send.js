'use strict';

const Bacon = require('baconjs');

const playerCount = require('./player-count');
const monster     = require('./monster');

module.exports = function messagesToSend(roles_joined, messages_in){
  const prop_player_count     = playerCount(roles_joined, messages_in);
  const prop_monster_health   = monster(roles_joined, messages_in);
  const evst_monster_defeated = prop_monster_health
    .filter((health) => health === 0);

  //Force subscription so this keeps the correct value even if nobody needs to know it.
  prop_monster_health  .onValue(() => {});
  prop_player_count    .onValue(() => {});


  const evst_st_ping = Bacon.once('ping').delay(10000);

  //messages_out:
  return {
    evst_st_send_to_players:
      Bacon.mergeAll(
        evst_st_ping,
        evst_monster_defeated
          .map(() => `Monster was defeated`)
      ),

    evst_st_send_to_presenters:
      Bacon.mergeAll(
        evst_st_ping,
        prop_monster_health
          .map((health) => `Monster has ${health} hit points`)
          .toEventStream(),
        evst_monster_defeated
          .map(() => `Monster was defeated`),
        prop_player_count
          .map((count) => `There are ${count} players`)
          .toEventStream()
      ),

    evst_st_send_to_gms:
      evst_st_ping
  };
};
