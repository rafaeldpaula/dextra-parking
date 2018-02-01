import React, { Component } from 'react';
import firebase from 'firebase';
import { FirebaseAuth } from 'react-firebaseui';
import { Route, Redirect } from 'react-router-dom'
import '../styles/App.css';

var config = {
   apiKey: "AIzaSyB0y9BaknjjPi9NyAHwz7Q1d6IVnQuULKo",
   authDomain: "dextra-parking-dev.firebaseapp.com",
   databaseURL: "https://dextra-parking-dev.firebaseio.com",
   projectId: "dextra-parking-dev",
   storageBucket: "dextra-parking-dev.appspot.com",
   messagingSenderId: "144221729651"
};

const uiConfig = {
   signInFlow: "popup",
   signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
   callbacks: {
       signInSuccess: () => false
   }
};

firebase.initializeApp(config);

var loggedIn = false;

export function isLoggedIn () {
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

               user.getIdToken().then(idToken => {
                   const login = { email, name, idToken };
                   console.log('Logged in!', login);
                   localStorage.setItem('login_data', JSON.stringify(login));
                   this.setState({ login });
                   fetch('https://dextra-parking-dev.appspot.com/api/cars', {
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
                    style={{textAlign: "center"}}>
                    Dextra Park
                </h1>
           </header>
           <div className="App-intro">
               <p>Please sign in</p>
               <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
           </div>
       </div>
       );
   }
}
