'use strict';

const WebSocketServer = require('ws').Server;

const util              = require('./util');
const connectionEvents  = require('./events/connections');
const rolesJoinedEvents = require('./events/roles-joined');
const messagesReceived  = require('./events/messages-received');
const messagesToSend    = require('./logic/messages-to-send');


function initServer(wss){
  const connection_events = connectionEvents(wss);
  const roles_joined      = rolesJoinedEvents(connection_events);
  const messages_in       = messagesReceived(roles_joined);
  const messages_out      = messagesToSend(roles_joined, messages_in);

  //Send messages to clients
  roles_joined.evst_ws_player_join
    .onValue(util.sendMessages(messages_out.evst_st_send_to_players));
  roles_joined.evst_ws_presenter_join
    .onValue(util.sendMessages(messages_out.evst_st_send_to_presenters));
  roles_joined.evst_ws_gm_join
    .onValue(util.sendMessages(messages_out.evst_st_send_to_gms));

  console.log("Server Initialized");
}

const wss = new WebSocketServer({port: 5555});
initServer(wss);