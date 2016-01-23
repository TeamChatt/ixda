'use strict';

const Bacon           = require('baconjs');
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
  roles_joined.evst_ws_wizard_join
    .onValue(util.sendMessages(messages_out.evst_st_send_to_wizards));
  roles_joined.evst_ws_fighter_join
    .onValue(util.sendMessages(messages_out.evst_st_send_to_fighters));
  roles_joined.evst_ws_presenter_join
    .onValue(util.sendMessages(messages_out.evst_st_send_to_presenters));
  roles_joined.evst_ws_gm_join
    .onValue(util.sendMessages(messages_out.evst_st_send_to_gms));

  //Log stuff
  Bacon.mergeAll(
      messages_in.evst_wizard_messages,
      messages_in.evst_fighter_messages,
      messages_in.evst_presenter_messages,
      messages_in.evst_gm_messages
    )
    .onValue((message) => {
      const sender = message.ws_sender
        .upgradeReq
        .headers['sec-websocket-key'];
      const st_content = JSON.stringify(message.content);
      console.log(`rcvd(${sender}): "${st_content}"`);
    });

  console.log('Server Initialized');
}

const wss = new WebSocketServer({port: 5555});
initServer(wss);
