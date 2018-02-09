import React, { Component } from 'react';
import firebase from 'firebase';
import { FirebaseAuth } from 'react-firebaseui';
import { Route, Redirect } from 'react-router-dom'
import '../styles/App.css';
import { getEvents } from './gcal';

var config = {
    apiKey: "AIzaSyBjP3oziR_ztTBkfgQFvXLBnp9w6n96mjE",
    authDomain: "dextraparking.firebaseapp.com",
    databaseURL: "https://dextraparking.firebaseio.com",
    projectId: "dextraparking",
    storageBucket: "dextraparking.appspot.com",
    messagingSenderId: "799965557830",

    clientId: "799965557830-ted83n2lutr3uagsl89tc3npv4vkdrm5.apps.googleusercontent.com",
    scopes: "https://www.googleapis.com/auth/calendar.readonly",
    discoveryDocs: "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
};

const uiConfig = {
    // signInFlow: "popup",
    signInOptions: [{
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: config.scopes
    }],
    callbacks: {
        signInSuccess: () => false
    }
};

var provider = new firebase.auth.GoogleAuthProvider();

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
                            firebase.auth().onAuthStateChanged(function(user){
                                console.log(user);
                                if (user){
                                    var script = document.createElement("script");
                                    script.type = "text/javascript";
                                    script.src = "https://apis.google.com/js/api.js";
                                    script.onload = function(e){
                                        gapi.client.init({
                                            apiKey: config.apiKey,
                                            clientId: config.clientId,
                                            discoveryDocs: config.discoveryDocs,
                                            scope: config.scopes
                                        }).then(function() {
                                            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                                                getEvents((events) => {
                                                    this.setState({events})
                                                  }, );  
                                            } else {
                                                firebase.auth().signOut();
                                            }
                                        });
                                    };
                                    document.getElementsByTagName("head")[0].appendChild(script);
                                }
                            });
                            fetch('https://1-dot-dextraparking.appspot.com/api/cars', {
                                method: 'GET',
                                //headers: {
                               //     'Authorization': 'Bearer ' + user.idToken
                               // }
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
                    <h1 className="App-title"
                        style={{ textAlign: "center" }}>
                        Dextra Parking!
                    </h1>
                    <div className="App-intro">
                        <input type="button" value='Login' onClick={this.onclick} />
                    </div>
                </header>
            </div>
        );
    }
}
