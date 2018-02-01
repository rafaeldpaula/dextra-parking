import React, {Component}  from 'react';
import Map from './Map.jsx';
import DevolverModal from './DevolverModal.jsx';
import SelecionarModal from './SelecionarModal.jsx';
import CadastrarModal from './CadastrarModal.jsx';

import '../styles/FloatingButton.css';
import '../styles/Modal.css';

import yawp from 'yawp';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {cars: [],
                  selectedCar: -1,
                  onDrag: undefined,
                  pinPosition: [null,null]};
  }

  updateCars() {
    yawp('/cars').list(
      cars => this.setState({cars: cars}));
  }

  signOut(){
    window.signOut();
  }
  componentDidMount() {
    this.updateCars();
  }

  handleDrag(e) {
    this.state.pinPosition[0] = e.latLng.lat();
    this.state.pinPosition[1] = e.latLng.lng();
  }

  sendLocationUpdate() {
    const lat = this.state.pinPosition[0];
    const lng = this.state.pinPosition[1];
    const car = this.state.cars[this.state.selectedCar];

    window.updateLocation(car.id, lat, lng, (car) => {
      this.setState({
        selectedCar: -1,
        pinPosition: [null, null]
      });
      window.alert("Yeay! Carro devolvido :)");
      this.updateCars();
    });
  }

  render() {
    return (
      <div>
        <Map  cars={this.state.cars} 
              selectedCar={this.state.selectedCar}
              onDrag={this.state.onDrag}
              />

        <SelecionarModal items={this.state.cars} 
          onSelection={(car, i) => {
            this.setState({selectedCar: i});
          }}/>

        {
        (() => {
          if (this.state.pinPosition[0] === null)
            return (
              <div>
                <button type="button" 
                  className="btn btn-outline-primary floating-button top-floating-button"
                  data-toggle="modal" data-target="#selecionar-modal">
                    Selecionar carro
                </button>
                <button type="button" 
                  className="btn btn-outline-success floating-button bottom-floating-button"
                  data-toggle="modal" data-target="#devolver-modal">
                    Devolver carro
                </button>
                <button type="button" 
                  className="btn btn-outline-info floating-button middle-floating-button"
                  data-toggle="modal" data-target="#cadastrar-modal">
                    Cadastrar carro
                </button>

              </div>
            )
          else
            return (
              <button type="button" 
                className="btn btn-outline-success floating-button bottom-floating-button"
                onClick={() => this.sendLocationUpdate()}>
                  CONFIRMAR
              </button>
            )
        })()
        }

        <DevolverModal 
          items={this.state.cars}
          onSelection={(car, i) => {
            this.setState({
              selectedCar: i,
              pinPosition: car.location.split(","),
              onDrag: e => this.handleDrag(e)
            });
          }}/>

        <nav className="navbar navbar-expand-md fixed-top whitebkg">
          <div className="navbar-brand">
            <div className="floating-button g-signin2" data-onsuccess="onSignIn" onClick={this.signIn}></div>
            <div className="user none"> <img className="rounded-circle" src=""/> <div className="userName"></div></div>
            <div className="floating-button g-signout2 none"> <a href="#" className="floating-button g-signout2" onClick={this.signOut}>Sign out</a> </div>
          </div>
        </nav>

        <CadastrarModal  items={this.state.cars} updateCars={() => this.updateCars()}/>

      </div>
    );
  }
}

export default Home;