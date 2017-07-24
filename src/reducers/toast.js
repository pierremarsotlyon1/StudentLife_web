/**
 * Created by pierremarsot on 24/07/2017.
 */
import {
  SEND_MESSAGE_TOAST
} from '../actions/toast';

const initialState = {
  type: 0,
  message: '',
};

export default function toast(state = initialState, action = {}){
  switch(action.type){
    case SEND_MESSAGE_TOAST:
      if(!action.message || action.typeMessage === undefined){
        return {
          ...state,
          type: 0,
          message: '',
        };
      }

      return {
        ...state,
        type: action.typeMessage,
        message: action.message,
      };
    default:
      return state;
  }
}