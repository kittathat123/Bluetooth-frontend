// import React, { Component } from "react";
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from "react-google-maps";

// class outdoorMap extends Component {
//   render() {
//     return (
//       <Map>
//         google={this.props.google}
//         zoom={11}
//         {/* style={mapStyles} */}
//         initialCenter={{ lat: 40.7128, lng: -74.006 }}
//       </Map>

//       //   <div
//       //     styye={{ height: "200px", width: "100%", margin: "0", padding: "0" }}
//       //     id="map"
//       //   ></div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyDq0QmikhnR5WnGaijIX5Km-ABXyMyPrGs",
// })(outdoorMap);

import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDq0QmikhnR5WnGaijIX5Km-ABXyMyPrGs",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div
        style={{ "margin-top": "-100px", height: `700px`, width: "700px" }}
      />
    ),
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: 13.7299, lng: 100.7782 }}>
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 13.7299, lng: 100.7782 }}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));

export default class outdoorMap extends React.PureComponent {
  state = {
    isMarkerShown: false,
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}
