import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
