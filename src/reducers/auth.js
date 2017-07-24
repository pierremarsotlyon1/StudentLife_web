/**
 * Created by pierremarsot on 24/07/2017.
 */
import {
  REGISTER_ENTREPRISE_ERROR,
  REGISTER_ENTREPRISE_SUCCESS,
  LOGIN_ENTREPRISE_ERROR,
  LOGIN_ENTREPRISE_SUCCESS,
  LOG_OUT,
} from '../actions/auth';
import {getToken} from '../tools/localStorage';

const initialState = {
  token: getToken(),
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_ENTREPRISE_ERROR:
    case LOGIN_ENTREPRISE_ERROR:
    case LOG_OUT:
      return {
        ...state,
        token: '',
      };

    case REGISTER_ENTREPRISE_SUCCESS:
    case LOGIN_ENTREPRISE_SUCCESS:
      if (!action.token || action.token.length === 0) {
        return {
          ...state,
          token: '',
        };
      }

      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
}