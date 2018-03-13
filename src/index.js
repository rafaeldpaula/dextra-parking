import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import yawp from 'yawp';

let login;
try {
    login = JSON.parse(localStorage.getItem("login_data"));
} catch (e) {
    login = null;
}

if (login != null) {
    yawp.config(function(c) {
        // c.baseUrl("https://dextraparking.appspot.com/api");
        console.log('----------');
        c.baseUrl("localhost:8080/api");
        c.defaultFetchOptions({ headers: {
            Authorization: "Beaerer " + login.idToken
        }});
    });
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
