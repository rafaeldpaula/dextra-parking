import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, GroundOverlay, Marker } from "react-google-maps"
import { compose, withProps } from "recompose";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import DevolverModal from './DevolverModal';
import { DrawingManager } from 'react-google-maps';
import dextraparkingstyle from '../dextraParkingStyle.json';

const navigator = window.navigator;

class MyMapComponent extends Component {

  constructor(props) {
    super(props);
    this.center = { lat: -22.814470, lng: -47.044972 };
    this.state = { 
      locationAuth: false,
      you: { lat: 0, lng: 0 } 
    };


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.setState({
          locationAuth: true,
          you: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
        });
      });
    }
  }



  getName(cars, carId) {
    var name;
    cars.forEach(car => {
      if (car.id === carId) {
        name = car.name;
      }
    });

    return name;
  }

  carIcon() {
    return window.carIcon();
  }

  makeMarkers() {
    return this.props.cars.map((car, i) => {

      var locacione = car.location.split(",");

      // return locacione;
      return (
        <MarkerWithLabel
          icon={this.carIcon()}
          key={i}
          position={{ lat: eval(locacione[0]), lng: eval(locacione[1]) }}
          labelAnchor={window.getAnchor()}
          labelStyle={{ backgroundColor: "white", fontSize: "15px", padding: "10px" }}>
          <div>{this.getName(this.props.cars, car.id)}</div>
        </MarkerWithLabel>
      );
    });
  }

  handleMapDrag() {
    const map = this.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    const latlng = map.getCenter();
    const lat = latlng.lat();
    const lng = latlng.lng();

    if (lat > this.center.lat + 0.004500 ||
      lat < this.center.lat - 0.004500 ||
      lng > this.center.lng + 0.004500 ||
      lng < this.center.lng - 0.004500) {
      map.setCenter(this.center);
    }
  }

  drawOverlay() {
    <GroundOverlay
      defaultUrl="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
      defaultBounds={window.overlayBounds()}
      defaultOpacity={.5}>
    </GroundOverlay>
  }

  yourLocationPin() {
    return <Marker position={{ lat: this.state.you.lat, lng: this.state.you.lng }}/>;
  }

  render(props) {

    var center = this.center;
    var zoom = 18;

    if (this.props.selectedCar != -1) {
      const i = this.props.selectedCar;
      const car = this.props.cars[i];
      const location = car.location.split(",");
      center = { lat: parseFloat(location[0]), lng: parseFloat(location[1]) };
      zoom = 19;
    }

    var self = this;
    var ret = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBjP3oziR_ztTBkfgQFvXLBnp9w6n96mjE&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100vh` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,

      }),

      withScriptjs,
      withGoogleMap,
    )(props => (

      <GoogleMap ref={map => this.map = map}
        onDragEnd={() => this.handleMapDrag()}
        zIndex={-1}
        defaultZoom={zoom}
        defaultCenter={center}
        defaultOptions={{
          styles: dextraparkingstyle,
          streetViewControl: false,
          mapTypeControl: false,
          panControl: false,
          rotateControl: false,
          fullscreenControl: false,
          maxZoom: 25,
          minZoom: 17
        }}>
        <GroundOverlay
          defaultUrl={window.overlayUrl()}
          defaultBounds={window.overlayBounds()}

          defaultOpacity={5} />

        {this.makeMarkers()}

        {this.yourLocationPin()}

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
        isMarkerShown />
    );
  }
}

export default Map;