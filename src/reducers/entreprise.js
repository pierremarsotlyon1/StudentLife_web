/**
 * Created by pierremarsot on 24/07/2017.
 */
import {
  LOAD_PROFIL_ENTREPRISE_ERROR,
  LOAD_PROFIL_ENTREPRISE_SUCCESS,
  UPDATE_PROFIL_ENTREPRISE_ERROR,
  UPDATE_PROFIL_ENTREPRISE_SUCCESS,
  UPLOAD_LOGO_SUCCESS,
  UPLOAD_LOGO_ERROR,
} from '../actions/entreprise';

const initialState = {
  entreprise: undefined,
};

export default function entreprise(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PROFIL_ENTREPRISE_ERROR:
    case UPDATE_PROFIL_ENTREPRISE_ERROR:
      return {
        ...state,
        entreprise: undefined,
      };

    case LOAD_PROFIL_ENTREPRISE_SUCCESS:
    case UPDATE_PROFIL_ENTREPRISE_SUCCESS:
      if (!action.entreprise) {
        return {
          ...state,
          entreprise: undefined,
        };
      }

      return {
        ...state,
        entreprise: action.entreprise,
      };

    case UPLOAD_LOGO_SUCCESS:
      if (!action.urlLogo) {
        return state;
      }

      const entreprise = Object.assign({}, state.entreprise);
      entreprise._source.logo_entreprise = action.urlLogo;

      return {
        ...state,
        entreprise: entreprise,
      };

    default:
      return state;
  }
}