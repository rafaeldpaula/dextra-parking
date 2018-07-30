import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, GroundOverlay, Marker } from "react-google-maps"
import { compose, withProps } from "recompose";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import dextraparkingstyle from './dextraParkingStyle.json';

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
    return cars.find(car => car.id === carId).name;
  }

  carIcon() {
    return window.carIcon();
  }

  locationIcon() {
    return window.locationIcon();
  }

  makeMarkers() {
    if (this.props.onDrag === undefined) {
      return this.props.cars.map((car, i) => {
        const locacione = car.location.split(",");
        return (
          <MarkerWithLabel
            icon={this.carIcon()}
            key={i}
            position={{ lat: parseFloat(locacione[0]), lng: parseFloat(locacione[1]) }}
            labelAnchor={window.getAnchor()}
            labelStyle={{ backgroundColor: "white", fontSize: "15px", padding: "10px" }}
          >
            <div>{this.getName(this.props.cars, car.id)}</div>
          </MarkerWithLabel>
        );
      });
    } else {
      const car = this.props.cars[this.props.selectedCar];
      const locacione = this.props.pinPosition;
      return (
        <MarkerWithLabel
          icon={this.carIcon()}
          position={{ lat: parseFloat(locacione.lat), lng: parseFloat(locacione.lng) }}
          draggable={this.props.onDrag !== undefined}
          onDragEnd={this.props.onDrag}
          labelAnchor={window.getAnchor()}
          labelStyle={{ backgroundColor: "white", fontSize: "15px", padding: "10px" }}
        >
          <div>{this.getName(this.props.cars, car.id)}</div>
        </MarkerWithLabel>);
    }
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

  yourLocationPin() {
    return <Marker
      position={{ lat: this.state.you.lat, lng: this.state.you.lng }}
      icon={this.locationIcon()}
    />;
  }

  render(props) {
    let center = this.center;
    let zoom = 18;

    if (this.props.selectedCar !== -1) {
      const i = this.props.selectedCar;
      const car = this.props.cars[i];
      const location = car.location.split(",");
      center = { lat: parseFloat(location[0]), lng: parseFloat(location[1]) };

      if (this.props.center != null){
        center = {
          lat: this.props.center[0],
          lng: this.props.center[1]
        };
      }

      zoom = 19;
    }

    const ret = compose(
      withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC3sWq8Efvd0k6ETKBUfY1BgARIpf5igtc&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: '100vh' }} />,
        containerElement: <div style={{ height: '100vh' }} />,
        mapElement: <div style={{ height: '100%' }} />,

      }),
      withScriptjs,
      withGoogleMap,
    )(() => <GoogleMap ref={map => this.map = map}
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
          defaultOpacity={5}
        />
        {this.makeMarkers()}
        {this.yourLocationPin()}
      </GoogleMap>
    );
    return ret(props);
  }
}

class Map extends Component {
  render() {
    return <MyMapComponent markerLocation={{}}
      cars={this.props.cars}
      selectedCar={this.props.selectedCar}
      pinPosition={this.props.pinPosition}
      onDrag={this.props.onDrag}
      center={this.props.center}
      isMarkerShown
    />;
  }
}

export default Map;
