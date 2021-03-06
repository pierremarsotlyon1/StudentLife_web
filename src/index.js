import React from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router'
import {Provider} from 'react-redux';

import routes from './routes';
import configureStore from './store/configStore';

const store = configureStore();
//Polices
import 'typeface-roboto'

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);