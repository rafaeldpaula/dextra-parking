import React, { Component } from 'react';
import firebase from 'firebase';
import { FirebaseAuth } from 'react-firebaseui';
import { Route, Redirect } from 'react-router-dom'
import '../styles/App.css';
import '../styles/Login.css';

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
provider.setCustomParameters({
    prompt: 'select_account'
});

firebase.initializeApp(config);

var loggedIn = false;

export function isLoggedIn() {
    return loggedIn;
}

export function signOut() {
    firebase.auth().signOut().then(function () {
        loggedIn = false;
        localStorage.removeItem('login_data');
        window.location.reload();
    }).catch(function (error) {
        // An error happened.
    });
}

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};



        if (window.login === null) {
            firebase.auth().getRedirectResult().then(function (result) {
                if (result.credential) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // ...

                    // The signed-in user info.
                    var user = result.user;
                    
                    user.getIdToken().then(idToken => {
                        console.log('Logged in!', user);
                        localStorage.setItem('login_data', JSON.stringify(user));

                        loggedIn = true;
                        window.login = user;

                        if (user.email.split("@")[1] != "dextra-sw.com") {
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
                            props.history.push("/");
                            /*fetch('https://1-dot-dextraparking.appspot.com/api/cars', {
                                method: 'GET',
                                headers: {
                                    'Authorization': 'Bearer ' + user.idToken
                                }
                            }).then(c => {
                                props.history.push("/");
                            });*/
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
        else {
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
                        <img src="./images/logo.png"/>
                    </center>
                    <div className="App-intro">
                    <div id="customBtn" class="customGPlusSignIn" onClick={this.onclick} >
                        <span class="icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48">
                                <g>
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                    <path fill="none" d="M0 0h48v48H0z"></path>
                                </g>
                            </svg>
                        </span>
                        <span class="buttonText">Entrar com Google</span>
                    </div>
                        <input type="button" value='Login' onClick={this.onclick} />
                    </div>
                </header>
            </div>
        );
    }
}
