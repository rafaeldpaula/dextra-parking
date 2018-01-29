import React, {
  Component
} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './styles/App.css';
import Menu from './Components/Menu.jsx';
import Map from './Components/Map.jsx';
import Cars from './Components/Cars.jsx';
import About from './Components/About.jsx';
import Home from './Components/Home.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Menu/>
          <Route exact path="/" component={Home}/>
          <Route path="/Map" component={Map}/>
          <Route path="/Cars" component={Cars}/>
          <Route path="/About" component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;
