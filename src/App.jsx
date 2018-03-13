import React, {
  Component
} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import './styles/App.css';
import Home from './Components/Home/Home.jsx';
import { isLoggedIn, Login } from './Components/Login/Login';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={(x) => (
            isLoggedIn() ? (<Home/>) : (<Redirect to="/Login" />))} />
          <Route path="/Login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
