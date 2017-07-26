/**
 * Created by pierremarsot on 24/07/2017.
 */
import {get, putApi} from '../tools/api';
import {sendMessageError, sendMessageSuccess} from './toast';
import superagent from 'superagent';

export const LOAD_PROFIL_ENTREPRISE_SUCCESS = 'LOAD_PROFIL_ENTREPRISE_SUCCESS';
export const LOAD_PROFIL_ENTREPRISE_ERROR = 'LOAD_PROFIL_ENTREPRISE_ERROR';

export const UPDATE_PROFIL_ENTREPRISE_SUCCESS = 'UPDATE_PROFIL_ENTREPRISE_SUCCESS';
export const UPDATE_PROFIL_ENTREPRISE_ERROR = 'UPDATE_PROFIL_ENTREPRISE_ERROR';

const CLOUDINARY_UPLOAD_PRESET = 'jvntjfdj';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dqtpozr8w/upload';

export const UPLOAD_LOGO_SUCCESS = 'UPLOAD_LOGO_SUCCESS';
export const UPLOAD_LOGO_ERROR = 'UPLOAD_LOGO_ERROR';

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

function uploadLogoSuccess(urlLogo){
  return {
    type: UPLOAD_LOGO_SUCCESS,
    urlLogo: urlLogo,
  };
}

function uploadLogoError(){
  return {
    type: UPLOAD_LOGO_ERROR,
  };
}

export function uploadLogo(file) {
  return dispatch => {
    let upload =
      superagent.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        dispatch(sendMessageSuccess('Erreur lors de la sauvegarde de votre logo'));
        return dispatch(uploadLogoError());
      }

      if (response.body.secure_url !== '') {
        putApi('/api/entreprise/logo', {
          _source: {
            logo_entreprise: response.body.secure_url,
          }
        })
          .then(() => {
            dispatch(sendMessageSuccess('Votre logo a été sauvegardé avec succès'));
            return dispatch(uploadLogoSuccess(response.body.secure_url));
          })
          .catch((response) => {
            if (response && response.error) {
              dispatch(sendMessageError(response.error));
            }

            return dispatch(uploadLogoError());
          });
      }
      else{
        dispatch(sendMessageSuccess('Erreur lors de la sauvegarde de votre logo'));
        return dispatch(uploadLogoError());
      }
    });

  };
}