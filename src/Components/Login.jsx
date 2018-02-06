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

firebase.initializeApp(config);

var loggedIn = false;

export function isLoggedIn() {
    return loggedIn;
}

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const email = user.email;
                const name = user.displayName || email;
                const photoURL = user.photoURL;

                user.getIdToken().then(idToken => {
                    const login = { email, name, idToken, photoURL };
                    console.log('Logged in!', login);
                    localStorage.setItem('login_data', JSON.stringify(login));
                    this.setState({ login });
                    fetch('https://1-dot-dextraparking.appspot.com/api/cars', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + login.idToken
                        }
                    }).then(c => {
                        console.log(c);
                        loggedIn = true;
                        this.props.history.push("/");
                    });
                });
            } else {
                console.error('Couldn\'t login!');
            }
        });
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
                        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    </div>
                </header>
            </div>
        );
    }
}
