/**
 * Created by pierremarsot on 24/07/2017.
 */
import {
  ADD_ANNONCE_ERROR,
  ADD_ANNONCE_SUCCESS,
  REMOVE_ANNONCE_ERROR,
  REMOVE_ANNONCE_SUCCESS,
  UPDATE_ANNONCE_ERROR,
  UPDATE_ANNONCE_SUCCESS,
  LOAD_ANNONCE_SUCCESS,
  LOAD_ANNONCE_ERROR,
} from '../actions/annonce';

const initialState = {
  annonces: [],
};

export default function annonce(state = initialState, action = {}){
  switch(action.type){
    case ADD_ANNONCE_SUCCESS:
      if(!action.bon_plan){
        return state;
      }

      return {
        ...state,
        annonces: state.annonces.concat(action.bon_plan),
      };

    case REMOVE_ANNONCE_SUCCESS:
      if(!action.id){
        return state;
      }

      return {
        ...state,
        annonces: state.annonces.filter((a) => {
          return a._id !== action.id;
        }),
      };

    case UPDATE_ANNONCE_SUCCESS:
      if(!action.id){
        return state;
      }

      return {
        ...state,
        annonces: state.annonces.map((a) => {
          if(a._id === action.id){
            return Object.assign({}, a.bon_plan);
          }

          return a;
        }),
      };

    case LOAD_ANNONCE_SUCCESS:
      if(!action.bons_plans){
        return {
          ...state,
          annonces: [],
        };
      }

      return {
        ...state,
        annonces: action.bons_plans,
      };

    default:
      return state;
  }
}