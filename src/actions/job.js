import {get, postApi, putApi, removeApi} from '../tools/api';
import {sendMessageError, sendMessageSuccess} from './toast';
import moment from 'moment';

export const LOAD_JOBS_SUCCESS = 'LOAD_JOBS_SUCCESS';
export const LOAD_JOBS_ERROR = 'LOAD_JOBS_ERROR';

export const ADD_JOB_SUCCESS = 'ADD_JOB_SUCCESS';
export const ADD_JOB_ERROR = 'ADD_JOB_ERROR';

export const REMOVE_JOB_SUCCESS = 'REMOVE_JOB_SUCCESS';
export const REMOVE_JOB_ERROR = 'REMOVE_JOB_ERROR';

export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const UPDATE_JOB_ERROR = 'UPDATE_JOB_ERROR';

function loadJobsSuccess(payload) {
  return {
    type: LOAD_JOBS_SUCCESS,
    jobs: payload.jobs,
  };
}

function loadJobsError() {
  return {
    type: LOAD_JOBS_ERROR,
  };
}

export function loadJobs(offset) {
  return dispatch => {
    get('/api/jobs/entreprise', {
      offset: offset,
    })
      .then((response) => {
        if (response && response.jobs) {
          return dispatch(loadJobsSuccess(response));
        } else {
          return dispatch(loadJobsError());
        }
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }
        return dispatch(loadJobsError());
      });
  }
}

function addJobSuccess(payload) {
  return {
    type: ADD_JOB_SUCCESS,
    job: payload.job,
  };
}

function addJobError() {
  return {
    type: ADD_JOB_ERROR,
  };
}

export function addJob(titre,
                       description,
                       competences,
                       profil,
                       debut_contrat,
                       remuneration,
                       email_contact,
                       telephone_contact,
                       id_type_contrat,) {
  return dispatch => {
    if (!titre || titre.length === 0) {
      dispatch(sendMessageError('Vous devez saisir un titre'));
      return dispatch(addJobError());
    }

    if (!description || description.length === 0) {
      dispatch(sendMessageError('Vous devez saisir une description'));
      return dispatch(addJobError());
    }

    if (!debut_contrat || debut_contrat.length === 0) {
      dispatch(sendMessageError('Vous devez saisir une date de début de contrat'));
      return dispatch(addJobError());
    }

    const debutMoment = moment(debut_contrat);
    const momentNow = moment();

    if(debutMoment.isBefore(momentNow)){
      dispatch(sendMessageError('La date de début de contrat ne peut être inférieur à celle d\'aujourd\'hui'));
      return dispatch(addJobError());
    }

    if ( (!email_contact || email_contact.length === 0) && (!telephone_contact || telephone_contact.length === 0)) {
      dispatch(sendMessageError('Vous devez saisir une coordonée de contact'));
      return dispatch(addJobError());
    }

    postApi('/api/jobs', {
      _source: {
        titre: titre,
        description: description,
        competences: competences,
        profil: profil,
        debut_contrat: debut_contrat,
        remuneration: remuneration,
        email_contact: email_contact,
        telephone_contact: telephone_contact,
        id_type_contrat: id_type_contrat,
      }
    })
      .then((response) => {
        if (response && response.job) {
          dispatch(sendMessageSuccess('Votre offre d\'emploi a bien été ajoutée'));
          return dispatch(addJobSuccess(response));
        }
        else {
          dispatch(sendMessageError('Erreur lors de l\'ajout de votre offre d\'emploi'));
          return dispatch(addJobError());
        }
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }
        return dispatch(addJobError());
      });
  };
}

function removeJobSuccess(id) {
  return {
    type: REMOVE_JOB_SUCCESS,
    id: id,
  }
}

function removeJobError() {
  return {
    type: REMOVE_JOB_ERROR,
  };
}

export function removeJob(id) {
  return dispatch => {
    removeApi('/api/jobs/' + id)
      .then(() => {
        dispatch(sendMessageSuccess('Votre offre d\'emploi a bien été supprimée'));
        return dispatch(removeJobSuccess(id));
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }
        return dispatch(removeJobError());
      });
  };
}