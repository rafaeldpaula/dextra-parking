import React, { Component } from 'react';
import Map from './Map.jsx';
import DevolverModal from './DevolverModal.jsx';
import SelecionarModal from './SelecionarModal.jsx';
import CadastrarModal from './CadastrarModal.jsx';
import AvisoPosicionadoModal from './AvisoPosicionadoModal.jsx';
import AvisoLimiteModal from './AvisoLimiteModal';
import CadastradoModal from './CadastradoModal.jsx';
import NaoCadastradoModal from './NaoCadastradoModal.jsx';

import TopBar from './TopBar.jsx';

import '../styles/FloatingButton.css';
import '../styles/Modal.css';

import yawp from 'yawp';

class Home extends Component {

  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      selectedCar: -1,
      onDrag: undefined,
      pinPosition: [null, null],
      center: null
    };
  }

  showCadastrado() {
    //window.$('#cadastrado-modal').modal('toggle');
    console.log('cadastrado');
    window.$('#cadastrado-modal').modal('toggle');
  }

  showNaoCadastrado() {
    //window.$('#nao-cadastrado-modal').modal('toggle');
    console.log('nao cadastrado');
    window.$('#nao-cadastrado-modal').modal('toggle');
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
          pinPosition: [latlng_old[0], latlng_old[1]],
          center: null
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
          pinPosition={this.state.pinPosition}
          onDrag={this.state.onDrag}
          center={this.state.center}
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
                  <TopBar></TopBar>
                  <button type="button"
                    className="btn floating-button bottom-floating-button"
                    data-toggle="modal" data-target="#devolver-modal">
                    DEVOLVER CARRO
                  </button>
                  <button type="button"
                    className="right-floating-button"
                    data-toggle="modal" data-target="#cadastrar-modal">
                    <i className="fa fa-plus-circle"></i>
                  </button>
                </div>
              )
            else
              return (
                <div>
                  <button type="button"
                    className="btn floating-button top-floating-button info">
                    ARRASTE O PIN PARA DEFINIR A POSIÇÃO DO CARRO
                  </button>
                  <button type="button"
                    className="btn floating-button bottom-floating-button"
                    onClick={() => this.sendLocationUpdate()}>
                    SALVAR
                  </button>
                  {/* <button type="button"
                    className="location-button"
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(pos => {
                          const lat = pos.coords.latitude;
                          const lng = pos.coords.longitude;
                          this.setState({
                            center: [lat, lng]
                          });
                        }, (e) => {
                        switch (e.code) {
                              case e.PERMISSION_DENIED:
                                alert("Permissão de acesso à localização negado");
                                break;
                              case e.POSITION_UNAVAILABLE:
                                alert("Acesso à localização indisponível.")
                                break;
                              case e.TIMEOUT:
                                alert("Não foi possível obter a localização: TIMEOUT")
                                break;
                              case e.UNKNOWN_ERROR:
                                alert("Não foi possível obter a localização")
                                break;
                            }
                          }
                        );
                      }
                    }}>
                    <i className="fas fa-crosshairs"></i>
                  </button>*/}
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

        <CadastrarModal items={this.state.cars} updateCars={() => this.updateCars()} showCadastrado={() => this.showCadastrado()}
          showNaoCadastrado={() => this.showNaoCadastrado()} />

        <button id="authorize-button" className="none">Authorize</button>
        <button id="signout-button" className="none">Sign Out</button>


        <AvisoPosicionadoModal />
        <AvisoLimiteModal />
        <CadastradoModal />
        <NaoCadastradoModal />

      </div>
    );
  }
}

export default Home;