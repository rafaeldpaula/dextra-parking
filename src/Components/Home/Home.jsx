import React, { Component } from 'react';
import Map from './Map.jsx';
import DevolverModal from '../DevolverCarro/DevolverModal.jsx';
import SelecionarModal from '../FiltrarCarro/SelecionarModal.jsx';
import CadastrarModal from '../CadastrarCarro/CadastrarModal.jsx';
import AvisoPosicionadoModal from '../DevolverCarro/AvisoPosicionadoModal.jsx';
import AvisoLimiteModal from '../DevolverCarro/AvisoLimiteModal';
import CadastradoModal from '../CadastrarCarro/CadastradoModal.jsx';
import NaoCadastradoModal from '../CadastrarCarro/NaoCadastradoModal.jsx';
import TopBar from './TopBar.jsx';
import '../../styles/Modal.css';
import '../../styles/FloatingButton.css';
import yawp from 'yawp';

class Home extends Component {

  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      selectedCarIndex: -1,
      onDrag: undefined,
      pinPosition: {
        lat: null,
        lng: null
      },
      center: null
    };
  }

  componentWillMount() {
    window.$(".modal-backdrop").remove();
  }

  showCadastrado() {
    //window.$('#cadastrado-modal').modal('toggle');
    window.$('#cadastrado-modal').modal('toggle');
  }

  showNaoCadastrado() {
    //window.$('#nao-cadastrado-modal').modal('toggle');
    window.$('#nao-cadastrado-modal').modal('toggle');
  }

  updateCars() {
    yawp('/cars').list(
      cars => this.setState({ cars: cars }));
  }

  componentDidMount() {
    this.updateCars();
  }

  handleDrag(e) {
    let { pinPosition } = this.state;
    
    pinPosition.lat = e.latLng.lat();
    pinPosition.lng = e.latLng.lng();

    /*this.setState({
      pinPosition: [e.latLng.lat(), e.latLng.lng()],
    });*/
  }
 
  boundIsExceeded(location) {
    let {lat, lng} = location;
    return lat > -22.814470 + 0.004500 ||
      lat < -22.814470 - 0.004500 ||
      lng > -47.044972 + 0.004500 ||
      lng < -47.044972 - 0.004500;
  }

  resetToInitialLocation(car) {
    const oldLocation = car.location.split(",");
    window.updateLocation(car.id, oldLocation[0], oldLocation[1], (car) => {
      this.setState({
        pinPosition: {
          lat: oldLocation[0], 
          lng: oldLocation[1]
        },
      });
      this.updateCars();
    });
  }

  showBoundError() {
    window.$('#aviso-limite-modal').modal('toggle');
  }

  checkCarBeenGiveBack(){
    let {lat, lng} = this.state.pinPosition;
    return lat === null && lng === null;
  }

  updateCarLocation(car, location) {
    this.setState({
      selectedCarIndex: -1,
      pinPosition: { lat: null, lng: null },
      center: null,
      onDrag: undefined
    });
    window.updateLocation(car.id, location.lat, location.lng, (car) => {
      window.$('#aviso-posicionado-modal').modal('toggle');
      this.updateCars();
    });
  }

  sendLocationUpdate() {
    let { pinPosition, cars, selectedCarIndex } = this.state;
    const selectedCar = cars[selectedCarIndex];

    if (this.boundIsExceeded(pinPosition)) {
      this.showBoundError();
      this.resetToInitialLocation(selectedCar);
    } else {
      this.updateCarLocation(selectedCar, pinPosition);
    }
  }

  renderBottomButton(){
     if (this.checkCarBeenGiveBack())
        return <div>
            <TopBar></TopBar>
            <button type="button"
              className="btn floating-button bottom-floating-button"
              data-toggle="modal" data-target="#devolver-modal">
              DEVOLVER CARRO
            </button>
          </div>
      else
        return <div>
            <button type="button"
              className="btn floating-button top-floating-button info">
              ARRASTE O PIN PARA DEFINIR A POSIÇÃO DO CARRO
            </button>
            <button type="button"
              className="btn floating-button bottom-floating-button"
              onClick={() => this.sendLocationUpdate()}>
              SALVAR
            </button>
          </div>
      
  }

  render() {
    return (
      <div>
        <Map cars={this.state.cars}
          selectedCar={this.state.selectedCarIndex}
          pinPosition={this.state.pinPosition}
          onDrag={this.state.onDrag}
          center={this.state.center}
        />

        <SelecionarModal 
          items={this.state.cars}
          onSelection={(car, i) => {
            this.setState({ selectedCarIndex: i });
          }} />

          {this.renderBottomButton()}
        
          <DevolverModal
          items={this.state.cars}
          onSelection={(car, i) => {
            this.setState({
              selectedCarIndex: i,
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