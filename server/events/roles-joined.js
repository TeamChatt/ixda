'use strict';


module.exports = function rolesJoinedEvents(server_events){
  function roleJoined(role){
    return server_events.evst_message
      .filter((message) => message.content.type === 'role') // message: {ws_sender, content: {type, value}}
      .filter((message) => message.content.value === role)
      .map((message) => message.ws_sender);
  }

  return {
    //Players
    evst_ws_wizard_join:    roleJoined('wizard'),
    evst_ws_fighter_join:   roleJoined('fighter'),
    //Presenter
    evst_ws_presenter_join: roleJoined('presenter'),
    //Game Master
    evst_ws_gm_join:        roleJoined('game master')
  };
};
