'use strict';

const resetHP     = ()  => 10;
const decrementHP = (c) => c-1;

module.exports = function monster(roles_joined, messages_in){
  //Reset the monster when the gm clicks "reset"
  const evst_reset_monster = messages_in
    .evst_gm_messages
    .filter((message) => message.st_content === 'reset')
    .map(() => resetHP);
  //Decrement the monsters health when a player attacks
  const evst_attack_monster = messages_in
    .evst_player_messages
    .filter((message) => message.st_content === 'attack')
    .map(() => decrementHP);

  //prop number
  return evst_reset_monster
    .merge(evst_attack_monster)
    .scan(10, (c,f) => f(c));
};
