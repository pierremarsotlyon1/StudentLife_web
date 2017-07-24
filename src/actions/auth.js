/**
 * Created by pierremarsot on 24/07/2017.
 */
import {postApi} from '../tools/api';
import {sendMessageError, sendMessageSuccess} from './toast';

export const LOGIN_ENTREPRISE_SUCCESS = 'LOGIN_ENTREPRISE_SUCCESS';
export const LOGIN_ENTREPRISE_ERROR = 'LOGIN_ENTREPRISE_ERROR';

export const REGISTER_ENTREPRISE_SUCCESS = 'REGISTER_ENTREPRISE_SUCCESS';
export const REGISTER_ENTREPRISE_ERROR = 'REGISTER_ENTREPRISE_ERROR';

function loginEntrepriseSuccess(payload) {
  return {
    type: LOGIN_ENTREPRISE_SUCCESS,
    token: payload.token,
  };
}

function loginEntrepriseError() {
  return {
    type: LOGIN_ENTREPRISE_ERROR,
  };
}

export function loginEntreprise(email, password) {
  return dispatch => {
    if (!email || email.length === 0) {
      dispatch(sendMessageError('Vous devez saisir un email'));
      return dispatch(loginEntrepriseError());
    }

    if (!password || password.length === 0) {
      dispatch(sendMessageError('Vous devez saisir un mot de passe'));
      return dispatch(loginEntrepriseError());
    }

    postApi('/login', {
      email: email,
      password: password,
    })
      .then((response) => {
        return dispatch(loginEntrepriseSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }

        return dispatch(loginEntrepriseError());
      });
  }
}

function registerEntrepriseSuccess(payload) {
  return {
    type: REGISTER_ENTREPRISE_SUCCESS,
    token: payload.token,
  };
}

function registerEntrepriseError() {
  return {
    type: REGISTER_ENTREPRISE_ERROR,
  };
}

export function registerEntreprise(nomEntreprise, email, password, confirmPassword) {
  return dispatch => {
    if (!nomEntreprise || nomEntreprise.length === 0) {
      dispatch(sendMessageError('Vous devez saisir le nom de votre entreprise'));
      return dispatch(registerEntrepriseError());
    }

    if (!email || email.length === 0) {
      dispatch(sendMessageError('Vous devez saisir un email'));
      return dispatch(registerEntrepriseError());
    }

    if (!password || password.length === 0) {
      dispatch(sendMessageError('Vous devez saisir un mot de passe'));
      return dispatch(registerEntrepriseError());
    }

    if (!confirmPassword || confirmPassword.length === 0) {
      dispatch(sendMessageError('Vous devez confirmer votre mot de passe'));
      return dispatch(registerEntrepriseError());
    }

    if(password !== confirmPassword){
      dispatch(sendMessageError('Vos mots de passe ne sont pas identique'));
      return dispatch(registerEntrepriseError());
    }

    postApi('/register', {
      _source: {
        nom_entreprise: nomEntreprise,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      }
    })
      .then((response) => {
        return dispatch(registerEntrepriseSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(sendMessageError(response.error));
        }

        return dispatch(registerEntrepriseError());
      });
  }
}