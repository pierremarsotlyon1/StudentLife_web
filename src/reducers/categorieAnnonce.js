/**
 * Created by pierremarsot on 25/07/2017.
 */
import {
  LOAD_CATEGORIE_ANNONCE_ERROR,
  LOAD_CATEGORIE_ANNONCE_SUCCESS,
} from  '../actions/categorieAnnonce';

const initialState = {
  categoriesAnnonce: [],
};

export default function categorieAnnonce(state = initialState, action = {}){
  switch(action.type){
    case LOAD_CATEGORIE_ANNONCE_ERROR:
      return state;

    case LOAD_CATEGORIE_ANNONCE_SUCCESS:
      if(!action.categoriesAnnonce){
        return {
          ...state,
          categoriesAnnonce: [],
        };
      }

      return {
        ...state,
        categoriesAnnonce: action.categoriesAnnonce,
      };

    default:
      return state;
  }
}