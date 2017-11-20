import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

import App from './router';
import './main.css';

const store = configureStore(window.__initState__);

render (
	<Provider store={store}>
  	   {App}
    </Provider>, 
    document.getElementById('app')
);