import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
//import { setUser } from './actions/user'
import * as serviceWorker from './serviceWorker';

const store= configureStore()

store.subscribe(()=> {
    console.log(store.getState())
})

const app= (
    <Provider store= {store}>
        <App />
    </Provider>
)

//store.dispatch(setUser())


ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
