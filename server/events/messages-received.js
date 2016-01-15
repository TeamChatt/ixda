'use strict';

const util = require('../util');

function logMessageReceipt(message)
{
  var ws = message.ws_sender;
  var st = message.st_content;
  console.log('rcvd(' + ws.upgradeReq.headers['sec-websocket-key'] + '): \"' + st + '\"');
}

module.exports = function messagesReceived(roles){
  const evst_player_messages    = roles.evst_ws_player_join
    .flatMap(util.messagesFromWebSocket);
  const evst_presenter_messages = roles.evst_ws_presenter_join
    .flatMap(util.messagesFromWebSocket);
  const evst_gm_messages        = roles.evst_ws_gm_join
    .flatMap(util.messagesFromWebSocket);

  evst_player_messages.onValue(logMessageReceipt);
  evst_presenter_messages.onValue(logMessageReceipt);
  evst_gm_messages.onValue(logMessageReceipt);

  return {
    evst_player_messages:    evst_player_messages,
    evst_presenter_messages: evst_presenter_messages,
    evst_gm_messages:        evst_gm_messages
  };
};
