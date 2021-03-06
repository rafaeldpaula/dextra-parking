import React, {
  Component
} from 'react';

import store from '../../store.js';
import '../../styles/TopBar.css';
import '../../styles/SidebarMenu.css';
import { signOut } from '../Login/Login.jsx';


class TopBar extends Component {

  constructor(props) {
    super(props);
    this.state = { hasData: false };
  }

  componentDidMount() {
    this.ids = [];
    this.ids.push(store.on('login', data => {
      if (!data) {
        this.setState({
          hasData: false,
        });
      } else {
        this.setState({
          hasData: true,
          name: data.name || data.email,
          email: data.email,
          photo: data.photo
        });
      }
    }));
  }

  componentWillUnmount() {
    store.clear(this.ids);
  }

  openSidebar() {
    window.$("#mySidenav").css("left", "0px");
  }

  closeSidebar() {
    window.$("#mySidenav").css("left", "-300px");
  }

  render() {
    if (!this.state.hasData) {
      return <div>Loading...</div>; // TODO proper loading
    }

    return (
      <div>
        <nav className="navbar navbar-light bg-faded">
          {[ ...this._avatar(), ...this._search() ]}
        </nav>
        <div id="mySidenav" className="sidenav">
          <img alt="Profile" src={this.state.photo} />
          <div className="user-name">{this.state.name}</div>
          <div className="user-email">{this.state.email}</div>
          <a className="closebtn" onClick={this.closeSidebar}>&times;</a>
          <a href="" onClick={signOut}>
            <i className="fas fa-sign-out-alt"></i>
            &nbsp; LOGOUT
          </a>
        </div>
      </div>
    );
  }

  _search() {
    return [
      <div key="search" className="fas fa-search fa-1g btn search-thing" data-toggle="modal" data-target="#selecionar-modal" />,
      <img key="logo" className="logo" alt="Logo" src="./images/logo.png" />,
    ];
  }

  _avatar() {
    if (!this.state.name) {
      return [];
    }
    return [
      <img key="user-image" className="user-image" alt="Profile" src={this.state.photo} onClick={this.openSidebar} />,
      <div key="user-name" className="user-name" onClick={this.openSidebar}>{this.state.name}</div>,
    ];
  }
}

export default TopBar;
