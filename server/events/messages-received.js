'use strict';

const util = require('../util');


module.exports = function messagesReceived(roles){
  const evst_player_messages    = roles.evst_ws_player_join
    .flatMap(util.messagesFromWebSocket);
  const evst_presenter_messages = roles.evst_ws_presenter_join
    .flatMap(util.messagesFromWebSocket);
  const evst_gm_messages        = roles.evst_ws_gm_join
    .flatMap(util.messagesFromWebSocket);

  return {
    evst_player_messages:    evst_player_messages,
    evst_presenter_messages: evst_presenter_messages,
    evst_gm_messages:        evst_gm_messages
  };
};
