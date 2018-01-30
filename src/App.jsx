import React, {
  Component
} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './styles/App.css';
import Home from './Components/Home.jsx';

class App extends Component {
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
