import React, { Component } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { compose, withProps } from "recompose";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import DevolverModal from './DevolverModal';
import { DrawingManager } from 'react-google-maps';

class MyMapComponent extends Component {  

  getName(cars, carId){
    var name;
    cars.forEach(car => {
      if (car.id === carId){
        name = car.name;
      }
    });

    return name;
  }

  icon(){
    return window.icon();
  }

  makeMarkers() {
    if (this.props.selectedCar === -1){
      return this.props.cars.map((car, i) => {

      var locacione = car.location.split(",");

      // return locacione;
      return (
        <MarkerWithLabel
                icon={this.icon()}
                key={i}
                position={{lat: eval(locacione[0]), lng: eval(locacione[1])}} 
                labelAnchor={window.getAnchor()}
                labelStyle={{backgroundColor: "white", fontSize: "15px", padding: "10px"}}>
          <div>{this.getName(this.props.cars, car.id)}</div>
        </MarkerWithLabel>);
      });
    }
    else{
      var car = this.props.cars[this.props.selectedCar];
      var locacione = car.location.split(",");
      console.log("carro seleiconado: "+car.id);
          return (
            <MarkerWithLabel
                    icon={this.icon()}
                    position={{lat: eval(locacione[0]), lng: eval(locacione[1])}} 
                    draggable={this.props.onDrag !== undefined}
                    onDragEnd={this.props.onDrag}    
                    labelAnchor={window.getAnchor()}
                    labelStyle={{backgroundColor: "white", fontSize: "15px", padding: "10px"}}>
              <div>{this.getName(this.props.cars, car.id)}</div>
            </MarkerWithLabel>);
    }
  }
  
  render(props) {    
    var self = this;
    var ret = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAzqXIMAGTfkI1FriE3eQ75HsbeuQv1hE8&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100vh` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }), 

      withScriptjs,
      withGoogleMap,
    )(props => (
      <GoogleMap  zIndex={-1}
                  defaultZoom={18}
                  defaultCenter={{ lat: -22.814470, lng: -47.044972 }} 
                  defaultOptions={{
                    disableDefaultUI: true,
                    maxZoom: 25,
                    minZoom: 17
                  }}>
        {this.makeMarkers()}

      </GoogleMap>
    ));
    return ret(props);
  }
} 

class Map extends Component {
    render() {
      return (
        <MyMapComponent markerLocation={{}} 
                        cars={this.props.cars} 
                        selectedCar={this.props.selectedCar} 
                        onDrag={this.props.onDrag}
                        isMarkerShown/>
      );
    }
  }

export default Map;