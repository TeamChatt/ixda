'use strict';

const util = require('../util');


module.exports = function messagesReceived(roles){
  function messagesFromRole(evst_ws_role_join){
    return evst_ws_role_join
      .flatMap(util.messagesFromWebSocket);
  }

  return {
    //Players
    evst_wizard_messages:    messagesFromRole(roles.evst_ws_wizard_join),
    evst_fighter_messages:   messagesFromRole(roles.evst_ws_fighter_join),

    //Presenter
    evst_presenter_messages: messagesFromRole(roles.evst_ws_presenter_join),

    //Game Master
    evst_gm_messages:        messagesFromRole(roles.evst_ws_gm_join)
  };
};
