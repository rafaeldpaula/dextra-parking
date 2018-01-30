import React, { Component } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

class MyMapComponent extends Component {  
  markerOnDragEnd (e, self) {
    console.log("Toaqui");
    console.log(e.latLng.lat() + "," + e.latLng.lng());
 
    window.updateLocation(1, e.latLng.lat(), e.latLng.lng());
  }

  getName(carId){
    return window.getCarName(carId);
  }
  
  render(props) {
    var self = this;
    
    var ret = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAzqXIMAGTfkI1FriE3eQ75HsbeuQv1hE8&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `88.5vh` }} />,
        containerElement: <div style={{ height: `88.5vh` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }), 

      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap defaultZoom={17} defaultCenter={{ lat: -22.814470, lng: -47.044972 }} mapTypeId='satellite'>
        <MarkerWithLabel position={{ lat: -22.814470, lng: -47.044972 }} 
                         draggable={true}
                         onDragEnd={(e) => this.markerOnDragEnd(e, self)}
                         labelAnchor={window.getAnchor()}
                         labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}>
          <div><h2>{this.getName(1)}</h2></div>
        </MarkerWithLabel>
      </GoogleMap>
    ));
    return ret(props);
  }
} 

class Map extends Component {
    render() {
      return (
        <MyMapComponent location={{}} isMarkerShown/>
      );
    }
  }

export default Map;