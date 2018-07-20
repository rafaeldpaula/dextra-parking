import React, { Component } from 'react';
import firebase from 'firebase';

import store from  '../../store';
import '../../styles/App.css';
import '../../styles/Login.css';

var config = {
    apiKey: "AIzaSyC3sWq8Efvd0k6ETKBUfY1BgARIpf5igtc",
    authDomain: "dextra-parking.firebaseapp.com",
    databaseURL: "https://dextra-parking.firebaseio.com",
    projectId: "dextra-parking",
    storageBucket: "dextra-parking.appspot.com",
    messagingSenderId: "164824251074"
};

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar.readonly');
provider.setCustomParameters({
    prompt: 'select_account',
    hd: "dextra-sw.com"
});

firebase.initializeApp(config);

export function signOut() {
    firebase.auth().signOut().then(function () {
        localStorage.removeItem('login_data');
        window.location.reload();
    });
}

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async loginButtonClick() {
        const result = await firebase.auth().signInWithPopup(provider);
        const token = await result.user.getIdToken();
        const data = {
            token,
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
        };
        localStorage.setItem('login_data', JSON.stringify(data));
        store.emit('login', data);
        store.emit('route', '/');
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <center>
                        <img alt="Logo" src="./images/logo.png" />
                    </center>
                    <img alt="Google Sign In" className="signin" src="./images/signin.png" onClick={this.loginButtonClick} />
                </header>
            </div>
        );
    }
}
