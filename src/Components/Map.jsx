import React, { Component } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { compose, withProps } from "recompose";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import DevolverModal from './DevolverModal';
import { DrawingManager } from 'react-google-maps';

class MyMapComponent extends Component {  
  markerOnDragEnd (e, self) {
    //console.log("Toaqui");
    //console.log(e.latLng.lat() + "," + e.latLng.lng());
 
    window.updateLocation(1, e.latLng.lat(), e.latLng.lng());
  }

  getName(cars, carId){
    var name;
    cars.forEach(car => {
      if (car.id == carId){
        name = car.name;
      }
    });

    return name;
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
        {
          (() => {
            if (this.props.selectedCar === -1){
             return this.props.cars.map((car, i) => {

              var locacione = car.location.split(",");

              // return locacione;
              return (
                <MarkerWithLabel
                        key={i}
                        position={{lat: eval(locacione[0]), lng: eval(locacione[1])}} 
                        draggable={false}
                        onDragEnd={(e) => this.markerOnDragEnd(e, self)}
                        labelAnchor={window.getAnchor()}
                        labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}>
                  <div><h2>{this.getName(this.props.cars, car.id)}</h2></div>
                </MarkerWithLabel>);
              });
            }
            else{
              var car = this.props.cars[this.props.selectedCar];
              var locacione = car.location.split(",");
              console.log("carro seleiconado: "+car.id);
                  return (
                    <MarkerWithLabel
                            position={{lat: eval(locacione[0]), lng: eval(locacione[1])}} 
                            draggable={false}
                            onDragEnd={(e) => this.markerOnDragEnd(e, self)}
                            labelAnchor={window.getAnchor()}
                            labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}>
                      <div><h2>{this.getName(this.props.cars, car.id)}</h2></div>
                    </MarkerWithLabel>);
            }
        })()
        }

      </GoogleMap>
    ));
    return ret(props);
  }
} 

class Map extends Component {
    render() {
      return (
        <MyMapComponent location={{}} cars={this.props.cars} selectedCar={this.props.selectedCar} isMarkerShown/>
      );
    }
  }

export default Map;