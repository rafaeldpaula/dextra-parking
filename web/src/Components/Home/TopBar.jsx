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
    this.state = {
      name: "João José",
      email: "jj@dextra-sw.com",
      photo: "https://thearmitageeffect.files.wordpress.com/2012/04/funny-cat-pictures-with-captions-44.jpg?w=652"
    };
  }

  componentDidMount() {
    this.ids = [];
    this.ids.push(store.on('login', data => {
      this.setState({
        name: data.name || data.email,
        email: data.email,
        photo: data.photo
      });
    }));
  }

  componentWillUnmount() {
    store.clearAll(this.ids);
  }

  openSidebar() {
    window.$("#mySidenav").css("left", "0px");
  }

  closeSidebar() {
    window.$("#mySidenav").css("left", "-300px");
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-faded">
          <img className="user-image" alt="Profile" src={this.state.photo} onClick={this.openSidebar} />
          <img className="logo" alt="Logo" src="./images/logo.png" />
          <div className="user-name" onClick={this.openSidebar}>{this.state.name}</div>
          <div className="fas fa-search fa-1g btn search-thing" data-toggle="modal" data-target="#selecionar-modal"></div>
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
}

export default TopBar;