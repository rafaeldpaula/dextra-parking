import React, {
  Component
} from 'react';

import yawp from 'yawp';

import './styles/App.css';
import store from './store.js';

import Home from './Components/Home/Home.jsx';
import { Login } from './Components/Login/Login.jsx';

// TODO better way to handle this
// const BASE_URL = 'http://localhost:8080';
const BASE_URL = 'https://dextra-parking.appspot.com';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { path: '/loading' };
  }

  componentWillMount() {
    this.ids = [];
    this.ids.push(store.on('login', data => {
      if (!data) {
        localStorage.removeItem('login_data');
        return;
      }
      localStorage.setItem('login_data', JSON.stringify(data));
      yawp.config(function(c) {
          c.baseUrl(`${BASE_URL}/api`);
          c.defaultFetchOptions({ headers: {
              Authorization: data.plain ? `Plain ${data.token}` : `Bearer ${data.token}`,
          }});
      });
    }));
    this.ids.push(store.on('route', path => this.setState({ path })));

    const loginData = localStorage.getItem('login_data');
    if (loginData) {
      store.emit('login', JSON.parse(loginData))
      store.emit('route', '/');
    } else {
      store.emit('login', null);
      store.emit('route', '/login');
    }
  }

  componentWillUnmount() {
    store.clear(this.ids);
  }

  render() {
    if (this.state.path === '/loading') {
      return <div>Loading...</div>; // TODO prettier loading
    } else if (this.state.path === '/login') {
      return <Login />;
    } else {
      return <Home />;
    }
  }
}

export default App;
