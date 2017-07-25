import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import auth from '../reducers/auth';
import toast from '../reducers/toast';
import entreprise from '../reducers/entreprise';
import annonce from '../reducers/annonce';
import categorieAnnonce from '../reducers/categorieAnnonce';

import reduxReset from 'redux-reset'

const logger = createLogger();
const rootReducer = combineReducers(
  {
    auth,
    toast,
    entreprise,
    annonce,
    categorieAnnonce,
  }
);

const initialState = {};

export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, logger),
      reduxReset(),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware),
      reduxReset(),
      f=>f
    ));
  }

  return store;
}
