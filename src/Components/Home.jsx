import React, {
    Component
  } from 'react';

import Map from './Map.jsx';
import DevolverModal from './DevolverModal.jsx';
import SelecionarModal from './SelecionarModal.jsx';
import CadastrarModal from './CadastrarModal.jsx';

import '../styles/FloatingButton.css';

import yawp from 'yawp';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {cars: [],
                  selectedCar: -1};
  }

  componentDidMount() {
    yawp('/cars').list(
      cars => this.setState({cars: cars}));
  }

  render() {
    return (
      <div>
        <Map cars={this.state.cars} selectedCar={this.state.selectedCar}/>
        <button type="button" 
                className="btn btn-outline-primary floating-button top-floating-button"
                data-toggle="modal" data-target="#selecionar-modal">
            Selecionar carro
        </button>

        <SelecionarModal items={this.state.cars} 
          onSelection={(car, i) => {
            this.setState({selectedCar: i});
            //console.log("Você selecionou " + car.name)
          }}/>

        <button type="button" 
                className="btn btn-outline-success floating-button bottom-floating-button"
                data-toggle="modal" data-target="#devolver-modal">
            Devolver carro
        </button>

        <DevolverModal 
          items={this.state.cars}
          onSelection={(car, i) => console.log("Você selecionou " + car.name)}/>

        <button type="button" 
                className="btn btn-outline-info floating-button middle-floating-button"
                data-toggle="modal" data-target="#cadastrar-modal">
            Cadastrar carro
        </button>

        <CadastrarModal/>
      </div>
    );
  }
}

export default Home;