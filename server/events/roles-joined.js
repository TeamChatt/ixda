'use strict';

module.exports = function rolesJoinedEvents(server_events){
  const evst_message_role_join = server_events.evst_message
    .filter((message) => message.content.type === 'role');

  const evst_ws_player_join     = evst_message_role_join
    .filter((message) => message.content.value === 'player')      // message: {ws_sender, content: {type, value}}
    .map((message)    => message.ws_sender);
  const evst_ws_presenter_join  = evst_message_role_join
    .filter((message) => message.content.value === 'presenter')
    .map((message)    => message.ws_sender);
  const evst_ws_gm_join         = evst_message_role_join
    .filter((message) => message.content.value === 'game master')
    .map((message)    => message.ws_sender);

  return {
    evst_ws_player_join:    evst_ws_player_join,
    evst_ws_presenter_join: evst_ws_presenter_join,
    evst_ws_gm_join:        evst_ws_gm_join
  };
};
