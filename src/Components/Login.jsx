import React, { Component } from 'react';
import firebase from 'firebase';
import { FirebaseAuth } from 'react-firebaseui';
import { Route, Redirect } from 'react-router-dom'
import '../styles/App.css';

var config = {
    apiKey: "AIzaSyBjP3oziR_ztTBkfgQFvXLBnp9w6n96mjE",
    authDomain: "dextraparking.firebaseapp.com",
    databaseURL: "https://dextraparking.firebaseio.com",
    projectId: "dextraparking",
    storageBucket: "dextraparking.appspot.com",
    messagingSenderId: "799965557830"
};

const uiConfig = {
    // signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
        signInSuccess: () => false
    }
};

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar.readonly');

firebase.initializeApp(config);

var loggedIn = false;

export function isLoggedIn() {
    return loggedIn;
}

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...

                // The signed-in user info.
                var user = result.user;

                const email = user.email;
                const name = user.displayName || email;
                const photoURL = user.photoURL;
                const access_token = user.access_token;

                // console.log(user);

                user.getIdToken().then(idToken => {
                    const login = { email, name, idToken, photoURL };
                    console.log('Logged in!', login);
                    localStorage.setItem('login_data', JSON.stringify(login));

                    loggedIn = true;
                    window.login = login;

                    if (email.split("@")[1] != "dextra-sw.com") {
                        loggedIn = false
                        alert("Só dextra aqui, otário");
                        firebase.auth().signOut().then(function () {
                            alert("yeah");
                            window.login = null;
                            localStorage.removeItem('login_data');
                        }, function (error) {
                        });
                    }
                    else {
                        fetch('https://1-dot-dextraparking.appspot.com/api/cars', {
                            method: 'GET',
                            headers: {
                                'Authorization': 'Bearer ' + login.idToken
                            }
                        }).then(c => {
                            props.history.push("/");
                        });
                    }
                });

            }

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    onclick() {
        firebase.auth().signInWithRedirect(provider);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title"
                        style={{ textAlign: "center" }}>
                        Dextra Parking!
                    </h1>
                    <div className="App-intro">
                        <input type="button" value='TEY' onClick={this.onclick} />
                    </div>
                </header>
            </div>
        );
    }
}
