import React, {
    Component
  } from 'react';

import Map from './Map.jsx';
import DevolverModal from './DevolverModal.jsx';

import '../styles/FloatingButton.css';

import yawp from 'yawp';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {cars: []};
  }

  componentDidMount() {
    yawp('/cars').list(
      cars => this.setState({cars: cars}));
  }

  render() {
    return (
      <div>
        <Map cars={this.state.cars}/>
        <button type="button" 
                className="btn btn-outline-primary floating-button top-floating-button"
                data-toggle="modal" data-target="#selectionar-modal">
            Selecionar carro
        </button>
        <button type="button" 
                className="btn btn-outline-success floating-button bottom-floating-button"
                data-toggle="modal" data-target="#devolver-modal">
            Devolver carro
        </button>

        <DevolverModal items={this.state.cars}/>
      </div>
    );
  }
}

export default Home;