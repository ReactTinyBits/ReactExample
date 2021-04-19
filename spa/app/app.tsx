import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import FontFaceObserver from 'fontfaceobserver';
import 'sanitize.css/sanitize.css';
import throttle from 'lodash/throttle';
import history from './apphistory';
import App from './containers/App';
import configureStore from './configureStore';
import { loadState, saveState } from './utils/localStorage'
import _ from 'lodash';

const openSansObserver = new FontFaceObserver('Open Sans', {});

openSansObserver.load().then(() => {
    document.body.classList.add('fontLoaded');
});

const initialState = loadState();
const store = configureStore(initialState, history);

store.subscribe(
    throttle(() => {
        store.getState();
        const result = {};

        saveState(result);
    }, 1000),
);

const MOUNT_NODE = document.getElementById('app');

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        MOUNT_NODE,
    );
};

render();
