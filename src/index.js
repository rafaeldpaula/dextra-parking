import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import yawp from 'yawp';

try {
    window.login = JSON.parse(localStorage.getItem("login_data"));
} catch (e) {
    window.login = null;
    window.location.href="/Login";
}

if (window.login != null) {
    yawp.config(function(c) {
        // c.baseUrl("https://dextraparking.appspot.com/api");
        console.log(window.login);
        c.baseUrl("http://localhost:8080/api");
        c.defaultFetchOptions({ headers: {
            Authorization: "Beaerer " + window.login.stsTokenManager.accessToken,
        }});
    });
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
