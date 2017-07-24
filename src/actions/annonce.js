/**
 * Created by pierremarsot on 24/07/2017.
 */
import {get, postApi, putApi, removeApi} from '../tools/api';
import {sendMessageError, sendMessageSuccess} from './toast';
import moment from 'moment';

export const ADD_ANNONCE_SUCCESS = 'ADD_ANNONCE_SUCCESS';
export const ADD_ANNONCE_ERROR = 'ADD_ANNONCE_ERROR';

export const UPDATE_ANNONCE_SUCCESS = 'UPDATE_ANNONCE_SUCCESS';
export const UPDATE_ANNONCE_ERROR = 'UPDATE_ANNONCE_ERROR';

export const REMOVE_ANNONCE_SUCCESS = 'REMOVE_ANNONCE_SUCCESS';
export const REMOVE_ANNONCE_ERROR = 'REMOVE_ANNONCE_ERROR';

export const LOAD_ANNONCE_SUCCESS = 'LOAD_ANNONCE_SUCCESS';
export const LOAD_ANNONCE_ERROR = 'LOAD_ANNONCE_ERROR';

function loadAnnonceSuccess(payload) {
  return {
    type: LOAD_ANNONCE_SUCCESS,
    bons_plans: payload.bons_plans,
  };
}

function loadAnnonceError() {
  return {
    type: LOAD_ANNONCE_ERROR,
  };
}

export function loadAnnonce(offset) {
  return dispatch => {
    get('/api/entreprise/bonsplans', {
      offset: offset,
    })
      .then((response) => {
        if (response) {
          return dispatch(loadAnnonceSuccess(response));
        }
        else {
          dispatch(sendMessageError('Erreur lors de la récupération de vos annonces'));
          return dispatch(loadAnnonceError());
        }
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }
        return dispatch(loadAnnonceError());
      })
  }
}

function addAnnonceSuccess(payload) {
  return {
    type: ADD_ANNONCE_SUCCESS,
    bon_plan: payload.bon_plan,
  };
}

function addAnnonceError() {
  return {
    type: ADD_ANNONCE_ERROR,
  };
}

export function addAnnonce(titre, description, dateDebut, dateFin, reduction) {
  return dispatch => {
    if (!titre || titre.length === 0) {
      dispatch(sendMessageError('Vous devez saisir un titre'));
      return dispatch(addAnnonceError());
    }

    if (!dateDebut) {
      dispatch(sendMessageError('Vous devez saisir une date de début'));
      return dispatch(addAnnonceError());
    }

    if (!dateFin) {
      dispatch(sendMessageError('Vous devez saisir une date de fin'));
      return dispatch(addAnnonceError());
    }

    if (reduction !== undefined) {
      reduction = Number.parseInt(reduction);
    }

    const momentDateDebut = moment(dateDebut);
    const momentDateFin = moment(dateFin);

    if(momentDateDebut.isAfter(momentDateFin)){
      dispatch(sendMessageError('Vous devez saisir une date de début inférieur à celle de fin'));
      return dispatch(addAnnonceError());
    }

    postApi('/api/entreprise/bonsplans', {
      _source: {
        title: titre,
        description: description,
        date_debut: dateDebut,
        date_fin: dateFin,
        reduction: reduction,
      }
    })
      .then((response) => {
        if (response && response.bon_plan) {
          dispatch(sendMessageSuccess('Votre bon plan a été ajouté avec succés'));
          return dispatch(addAnnonceSuccess(response));
        }
        else {
          dispatch(sendMessageError('Votre bon plan a été ajouté avec succés mais nous n\'avons pas pu le récupérer'));
          return dispatch(addAnnonceError());
        }
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }
        return dispatch(addAnnonceError());
      });
  };
}

function removeAnnonceSuccess(id) {
  return {
    type: REMOVE_ANNONCE_SUCCESS,
    id: id,
  };
}

function removeAnnonceError() {
  return {
    type: REMOVE_ANNONCE_ERROR,
  };
}

export function removeAnnonce(id) {
  return dispatch => {
    removeApi('/api/entreprise/bonsplans/' + id)
      .then((response) => {
        dispatch(sendMessageSuccess('Annonce supprimée avec succés'));
        return dispatch(removeAnnonceSuccess(id));
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }
        return dispatch(removeAnnonceError());
      });
  };
}