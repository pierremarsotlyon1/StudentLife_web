import {get} from '../tools/api';
import {sendMessageError} from './toast';

export const LOAD_CONTRAT_TRAVAIL_SUCCESS = 'LOAD_CONTRAT_TRAVAIL_SUCCESS';
export const LOAD_CONTRAT_TRAVAIL_ERROR = 'LOAD_CONTRAT_TRAVAIL_ERROR';

function loadContratTravailSuccess(payload) {
  return {
    type: LOAD_CONTRAT_TRAVAIL_SUCCESS,
    contratsTravail: payload.contrats_travail,
  };
}

function loadContratTravailError() {
  return {
    type: LOAD_CONTRAT_TRAVAIL_ERROR,
  };
}

export function loadContratTravail() {
  return dispatch => {
    get('/contrat_travail')
      .then((response) => {
        if (response && response.contrats_travail) {
          return dispatch(loadContratTravailSuccess(response));
        }
        else {
          return dispatch(loadContratTravailError());
        }
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }

        return dispatch(loadContratTravailError());
      });
  };
}