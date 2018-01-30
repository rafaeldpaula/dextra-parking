import React, { Component } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose";

class MyMapComponent extends Component {  
  markerOnDragEnd (e, self) {
    console.log("Toaqui");
    console.log(e.latLng.lat() + "," + e.latLng.lng());
 
    window.updateLocation(1, e.latLng.lat(), e.latLng.lng());
  }

  //ISSO AQUI: https://stackoverflow.com/questions/38414139/how-to-call-and-form-a-react-js-function-from-html
  
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
        <Marker position={{ lat: -22.814470, lng: -47.044972 }} 
                draggable={true}
                onDragEnd={(e) => this.markerOnDragEnd(e, self)}/>
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