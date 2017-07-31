import {
  LOAD_CONTRAT_TRAVAIL_ERROR,
  LOAD_CONTRAT_TRAVAIL_SUCCESS,
} from '../actions/contratTravail';

const initialState = {
  contratsTravail: [],
};

export default function contratTravail(state = initialState, action = {}){
  switch(action.type){
    case LOAD_CONTRAT_TRAVAIL_SUCCESS:
      if(!action || !action.contratsTravail){
        return {
          ...state,
          contratsTravail: [],
        };
      }

      return {
        ...state,
        contratsTravail: action.contratsTravail,
      };

    case LOAD_CONTRAT_TRAVAIL_ERROR:
      return {
        ...state,
        contratsTravail: [],
      };

    default:
      return state;
  }
}