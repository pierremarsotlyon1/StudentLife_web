/**
 * Created by pierremarsot on 24/07/2017.
 */
export const SEND_MESSAGE_TOAST = 'SEND_MESSAGE_TOAST';

function sendMessage(message, typeMessage){
  return {
    type: SEND_MESSAGE_TOAST,
    typeMessage: typeMessage,
    message: message,
  };
}

export function sendMessageSuccess(message){
  return dispatch => {
    return dispatch(sendMessage(message, 1));
  }
}

export function sendMessageError(message){
  return dispatch => {
    return dispatch(sendMessage(message, 2));
  }
}