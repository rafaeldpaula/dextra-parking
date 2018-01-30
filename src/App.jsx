import React, {
  Component
} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './styles/App.css';
import Home from './Components/Home.jsx';
import yawp from 'yawp';

class App extends Component {

  componentWillMount() {
    yawp.config(function (c) {
      c.baseUrl('http://172.16.120.145:8080/api');
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home}/>
        </div>
      </Router>
    );
  }
}

export default App;
