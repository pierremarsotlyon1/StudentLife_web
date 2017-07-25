/**
 * Created by pierremarsot on 25/07/2017.
 */
import {get} from '../tools/api';
import {sendMessageError} from './toast';

export const LOAD_CATEGORIE_ANNONCE_SUCCESS = 'LOAD_CATEGORIE_ANNONCE_SUCCESS';
export const LOAD_CATEGORIE_ANNONCE_ERROR = 'LOAD_CATEGORIE_ANNONCE_ERROR';

function loadCategorieAnnonceSuccess(payload) {
  return {
    type: LOAD_CATEGORIE_ANNONCE_SUCCESS,
    categoriesAnnonce: payload.categories_annonce,
  };
}

function loadCategorieAnnonceError() {
  return {
    type: LOAD_CATEGORIE_ANNONCE_ERROR,
  };
}

export function loadCategorieAnnonce() {
  return dispatch => {
    get('/categorie_annonce')
      .then((response) => {
        return dispatch(loadCategorieAnnonceSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }

        return dispatch(loadCategorieAnnonceError());
      });
  }
}