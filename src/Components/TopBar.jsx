import React, {
  Component
} from 'react';

import '../styles/TopBar.css';
import '../styles/SidebarMenu.css';
import {signOut} from './Login.jsx';

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
    if (window.login != null)
      this.setState({
        name: window.login.displayName || window.login.email,
        email: window.login.email,
        photo: window.login.photoURL
      });
    // else
    //   window.location.reload();
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
          <img src={this.state.photo} onClick={this.openSidebar} />
          <div className="user-name" onClick={this.openSidebar}>{this.state.name}</div>
          <div className="fas fa-search fa-1g btn search-thing" data-toggle="modal" data-target="#selecionar-modal"></div>
        </nav>
        <div id="mySidenav" className="sidenav">
          <img src={this.state.photo} />
          <div className="user-name">{this.state.name}</div>
          <div className="user-email">{this.state.email}</div>
          <a className="closebtn" onClick={this.closeSidebar}>&times;</a>
          {/* <a href="#">ÚLTIMAS RESERVAS</a>
          <a href="#">ADICIONAR CARRO</a>
          <a href="#">CONFIGURAÇÕES</a> */}
          <a   onClick={signOut}>
            <i className="fas fa-sign-out-alt"></i>
            &nbsp; LOGOUT
          </a>
        </div>
      </div>
    );
  }
}

export default TopBar;