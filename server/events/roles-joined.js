'use strict';

module.exports = function rolesJoinedEvents(server_events){
  const evst_ws_player_join     = server_events.evst_message
    .filter((message) => message.st_content === 'player')      // message: {ws_sender, st_content}
    .map((message)    => message.ws_sender);
  const evst_ws_presenter_join  = server_events.evst_message
    .filter((message) => message.st_content === 'presenter')
    .map((message)    => message.ws_sender);
  const evst_ws_gm_join         = server_events.evst_message
    .filter((message) => message.st_content === 'game master')
    .map((message)    => message.ws_sender);

  return {
    evst_ws_player_join:    evst_ws_player_join,
    evst_ws_presenter_join: evst_ws_presenter_join,
    evst_ws_gm_join:        evst_ws_gm_join
  };
};
