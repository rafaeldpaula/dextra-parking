import React, {
  Component
} from 'react';

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
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
