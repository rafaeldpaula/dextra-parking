import React, {
  Component
} from 'react';

import '../styles/TopBar.css';

class TopBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <img src={window.login.photoURL} alt={window.login.name}/>
        <div className="user-name">{window.login.name}</div>
        <div className="fas fa-search fa-1g btn search-thing" data-toggle="modal" data-target="#selecionar-modal"></div>
      </nav>
    );
  }
}

export default TopBar;
