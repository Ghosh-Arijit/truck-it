import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-fancybox/lib/fancybox.css';
import "react-datepicker/dist/react-datepicker.css";
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { saveUserOnLoad, removeUser } from './actions/user'
import * as serviceWorker from './serviceWorker';
import './css/style.css'

const store= configureStore()

store.subscribe(()=> {
    console.log(store.getState())
})

localStorage.getItem('token') ? store.dispatch(saveUserOnLoad(JSON.parse(localStorage.getItem('token')))) : store.dispatch(removeUser())

const app= (
    <Provider store= {store}>
        <App />
    </Provider>
)

//store.dispatch(setUser())


ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
