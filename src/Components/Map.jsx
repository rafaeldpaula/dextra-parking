import React, { Component } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose";

const MyMapComponent = compose(
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
  <GoogleMap defaultZoom={17} defaultCenter={{ lat: -22.814470, lng: -47.044972 }}>
    <Marker position={{ lat: -22.814470, lng: -47.044972 }} />
  </GoogleMap>
));

class Map extends Component {
    render() {
      return (
        <div>
          <MyMapComponent isMarkerShown/>
        </div>
      );
    }
  }

export default Map;