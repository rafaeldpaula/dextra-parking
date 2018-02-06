import React, {
  Component
} from 'react';
import { withRouter } from 'react-router'

import '../styles/TopBar.css';
import { withReducer } from 'recompose';

class TopBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "João José",
      photo: "https://thearmitageeffect.files.wordpress.com/2012/04/funny-cat-pictures-with-captions-44.jpg?w=652"
    };
  }

  componentDidMount() {
    if (window.login != null)
      this.setState({
        name: window.login.name,
        photo: window.login.photoURL
      });
    // else
    //   window.location.reload();
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-light bg-faded">
          <img src={this.state.photo} />
          <div className="user-name">{this.state.name}</div>
          <div className="fas fa-search fa-1g btn search-thing" data-toggle="modal" data-target="#selecionar-modal"></div>
        </nav>
      </div>
    );
  }
}

export default TopBar;