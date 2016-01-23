'use strict';

const Bacon = require('baconjs');


function messagesFromWebSocket(ws){
  //evst_message
  return Bacon.fromEvent(ws, 'message')
    .map(JSON.parse)
    .map(content => makeMessage(ws, content));
}
function makeMessage(ws_sender, content){
  //message
  return {
    ws_sender: ws_sender,
    content:   content
  };
}
const sendMessages = (evst_message) => (ws) => {
  evst_message
    .takeUntil(Bacon.fromEvent(ws, 'close'))
    .map(JSON.stringify)
    .onValue((st_content) => {
      const recipient = ws.upgradeReq.headers['sec-websocket-key'];
      console.log(`sent(${recipient}): "${st_content}"`);
      ws.send(st_content);
    });
};

module.exports = {
  messagesFromWebSocket: messagesFromWebSocket,
  sendMessages:          sendMessages
};
