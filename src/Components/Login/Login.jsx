import React, { Component } from 'react';
import firebase from 'firebase';
import yawp from 'yawp';

import '../../styles/App.css';
import '../../styles/Login.css';

var config = {
    apiKey: "AIzaSyBjP3oziR_ztTBkfgQFvXLBnp9w6n96mjE",
    authDomain: "dextraparking.firebaseapp.com",
    databaseURL: "https://dextraparking.firebaseio.com",
    projectId: "dextraparking",
    storageBucket: "dextraparking.appspot.com",
    messagingSenderId: "799965557830"
};

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar.readonly');
provider.setCustomParameters({
    prompt: 'select_account',
    hd: "dextra-sw.com"
});

firebase.initializeApp(config);

var loggedIn = false;

export function isLoggedIn() {
    console.log(loggedIn);
    return loggedIn;
}

export function signOut() {
    firebase.auth().signOut().then(function () {
        loggedIn = false;
        localStorage.removeItem('login_data');
        window.location.reload();
    }).catch(console.error);
}

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        console.log("herea");
        if (window.login === null) {
            firebase.auth().getRedirectResult().then(function (result) {
                console.log(result);
                if (result.credential) {
                    var user = result.user;
                    user.getIdToken().then(idToken => {
                        localStorage.setItem('login_data', JSON.stringify(user));
                        loggedIn = true;
                        window.login = user;
                        yawp.config(function(c) {
                            console.log(user);
                            // c.baseUrl("https://dextraparking.appspot.com/api");
                            c.baseUrl("http://localhost:8080/api");
                            c.defaultFetchOptions({ headers: {
                                Authorization: `Beaerer ${user.login.stsTokenManager.accessToken}`,
                            }});
                        });

                        props.history.push("/");
                    });
                }
            }).catch(console.error);
        } else {
            loggedIn = true;
            props.history.push("/");
        }
    }

    onclick() {
        firebase.auth().signInWithRedirect(provider);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <center>
                        <img alt="Logo" src="./images/logo.png" />
                    </center>
                    <img alt="Google Sign In" className="signin" src="./images/signin.png" onClick={this.onclick} />
                </header>
            </div>
        );
    }
}
