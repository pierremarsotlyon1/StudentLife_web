/**
 * Created by pierremarsot on 24/07/2017.
 */
import {get, putApi} from '../tools/api';
import {sendMessageError, sendMessageSuccess} from './toast';

export const LOAD_PROFIL_ENTREPRISE_SUCCESS = 'LOAD_PROFIL_ENTREPRISE_SUCCESS';
export const LOAD_PROFIL_ENTREPRISE_ERROR = 'LOAD_PROFIL_ENTREPRISE_ERROR';

export const UPDATE_PROFIL_ENTREPRISE_SUCCESS = 'UPDATE_PROFIL_ENTREPRISE_SUCCESS';
export const UPDATE_PROFIL_ENTREPRISE_ERROR = 'UPDATE_PROFIL_ENTREPRISE_ERROR';

function loadProfilEntrepriseSuccess(payload) {
  return {
    type: LOAD_PROFIL_ENTREPRISE_SUCCESS,
    entreprise: payload.entreprise,
  };
}

function loadProfilEntrepriseError() {
  return {
    type: LOAD_PROFIL_ENTREPRISE_ERROR,
  };
}

export function loadProfilEntreprise() {
  return dispatch => {
    get('/api/entreprise')
      .then((response) => {
        return dispatch(loadProfilEntrepriseSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }

        return dispatch(loadProfilEntrepriseError());
      })
  };
}

function updateProfilEntrepriseSuccess(payload) {
  return {
    type: UPDATE_PROFIL_ENTREPRISE_SUCCESS,
    entreprise: payload.entreprise,
  };
}

function updateProfilEntrepriseError() {
  return {
    type: UPDATE_PROFIL_ENTREPRISE_ERROR,
  };
}

export function updateProfilEntreprise(nomEntreprise) {
  return dispatch => {
    if (!nomEntreprise || nomEntreprise.length === 0) {
      dispatch(sendMessageError('Vous devez saisir le nom de votre entreprise'));
      return dispatch(loadProfilEntrepriseError());
    }

    putApi('/api/entreprise', {
      _source: {
        nom_entreprise: nomEntreprise,
      }
    })
      .then((response) => {
        dispatch(sendMessageSuccess('Vos informations ont bien été mises à jour'));
        return dispatch(updateProfilEntrepriseSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }

        return dispatch(updateProfilEntrepriseError());
      })
  };
}