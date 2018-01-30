import React, {
    Component
  } from 'react';

import Map from './Map.jsx';
import {
  TopFloatingButton, 
  BottomFloatingButton
} from './FloatingButton';

class Home extends Component {
  render() {
    return (
      <div>
        <Map/>
        <TopFloatingButton 
            className="btn-outline-primary"
            label="Selectionar carro"/>
        <BottomFloatingButton 
            className="btn-outline-success"
            label="Devolver carro"/>
      </div>
    );
  }
}

export default Home;