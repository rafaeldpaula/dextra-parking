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
                  options={{maxZoom: 25,minZoom: 17}}
                  defaultCenter={{ lat: -22.814470, lng: -47.044972 }} 
                  defaultOptions={{disableDefaultUI: true}}>
        {
          (() => {
            var hue = this.props.cars.map( (car) => {

            var locacione = car.location.split(",");

            // return locacione;

            return (
              <MarkerWithLabel
                      key={car.id}
                      position={{lat: eval(locacione[0]), lng: eval(locacione[1])}} 
                      draggable={false}
                      onDragEnd={(e) => this.markerOnDragEnd(e, self)}
                      labelAnchor={window.getAnchor()}
                      labelStyle={{backgroundColor: "white", fontSize: "8px", padding: "4px"}}>
                <div><h2>{this.getName(this.props.cars, car.id)}</h2></div>
              </MarkerWithLabel>);
            }
          )
          console.log(hue);
          return hue;
        })()}

      </GoogleMap>
    ));
    return ret(props);
  }
} 

class Map extends Component {
    render() {
      return (
        <MyMapComponent location={{}} cars={this.props.cars} isMarkerShown/>
      );
    }
  }

export default Map;