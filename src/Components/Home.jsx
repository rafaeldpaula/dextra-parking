import React, { Component } from 'react';
import Map from './Map.jsx';
import DevolverModal from './DevolverModal.jsx';
import SelecionarModal from './SelecionarModal.jsx';
import CadastrarModal from './CadastrarModal.jsx';
import AvisoPosicionadoModal from './AvisoPosicionadoModal.jsx';
import AvisoLimiteModal from './AvisoLimiteModal';

import TopBar from './TopBar.jsx';

import '../styles/FloatingButton.css';
import '../styles/Modal.css';

import yawp from 'yawp';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      selectedCar: -1,
      onDrag: undefined,
      pinPosition: [null, null]
    };
  }

  updateCars() {
    yawp('/cars').list(
      cars => this.setState({ cars: cars }));
  }

  signOut() {
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
    var lat = this.state.pinPosition[0];
    var lng = this.state.pinPosition[1];
    const car = this.state.cars[this.state.selectedCar];
    const latlng_old = car.location.split(",");

    if (lat > -22.814470 + 0.004500 ||
      lat < -22.814470 - 0.004500 ||
      lng > -47.044972 + 0.004500 ||
      lng < -47.044972 - 0.004500) {
      window.$('#aviso-limite-modal').modal('toggle');
      window.updateLocation(car.id, latlng_old[0], latlng_old[1], (car) => {
        this.setState({
          pinPosition: [latlng_old[0], latlng_old[1]]
        });
        this.updateCars();
      });

    } else {
      this.setState({
        onDrag: undefined
      });
      window.updateLocation(car.id, lat, lng, (car) => {
        window.$('#aviso-posicionado-modal').modal('toggle');
        this.setState({
          selectedCar: -1,
          pinPosition: [null, null]
        });
        this.updateCars();
      });
    }
  }

  render() {
    return (
      <div>
        <Map cars={this.state.cars}
          selectedCar={this.state.selectedCar}
          onDrag={this.state.onDrag}
        />

        <SelecionarModal items={this.state.cars}
          onSelection={(car, i) => {
            this.setState({ selectedCar: i });
          }} />
        {
          (() => {
            if (this.state.pinPosition[0] === null)
              return (
                <div>
                  <TopBar />
                  <button type="button"
                    className="btn floating-button bottom-floating-button"
                    data-toggle="modal" data-target="#devolver-modal">
                    DEVOLVER CARRO
                </button>

                </div>
              )
            else
              return (
                <div>
                <button type="button" 
                  className="btn floating-button top-floating-button info">
                    DEFINA A POSIÇÃO DO CARRO
                </button>  
                <button type="button"
                  className="btn floating-button bottom-floating-button"
                  onClick={() => this.sendLocationUpdate()}>
                  SALVAR
                </button>
                </div>
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
          }} />

        <CadastrarModal items={this.state.cars} updateCars={() => this.updateCars()} />

        <AvisoPosicionadoModal />
        <AvisoLimiteModal />

      </div>
    );
  }
}

export default Home;