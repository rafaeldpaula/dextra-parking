import React, {
    Component
  } from 'react';

import Map from './Map.jsx';
import {
  TopFloatingButton, 
  BottomFloatingButton
} from './FloatingButton';

import yawp from 'yawp';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {cars: []};
  }

  componentDidMount() {
    yawp('/cars').list(
      cars => {

        this.setState({cars: cars});

        // cars.forEach(car => {
          /*console.log('id: ' + car.id);
          console.log('e-mal: ' + car.email);
          console.log('name: ' + car.name);

          carLocation = car.location.split(',');
          console.log('lat: ' + carLocation[0]);
          console.log('lon: ' + carLocation[1]);*/

          
        });
  }

  openDevolverModal() {
    this.state.cars.forEach(car => {
      console.log('id: ' + car.id);
      console.log('e-mal: ' + car.email);
      console.log('name: ' + car.name);

      var carLocation = car.location.split(',');
      console.log('lat: ' + carLocation[0]);
      console.log('lon: ' + carLocation[1]);
    });
  }

  render() {
    return (
      <div>
        <Map/>
        <TopFloatingButton 
            className="btn-outline-primary"
            label="Selectionar carro"
            onClick={() => null}/>
        <BottomFloatingButton 
            className="btn-outline-success"
            label="Devolver carro"
            onClick={() => this.openDevolverModal()}/>
      </div>
    );
  }
}

export default Home;