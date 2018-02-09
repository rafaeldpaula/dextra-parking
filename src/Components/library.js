window.gapi.client.init({
    apiKey: config.apiKey,
    clientId: config.clientId,
    discoveryDocs: config.discoveryDocs,
    scope: config.scopes
}).then(function() {
    if (window. gapi.auth2.getAuthInstance().isSignedIn.get()) {
        getEvents((events) => {
            this.setState({events})
        }, );  
    } else {
        firebase.auth().signOut();
    }
});