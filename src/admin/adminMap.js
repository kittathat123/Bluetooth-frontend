import React, { useEffect, useState } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline,
} from "react-google-maps";

import { createNewPathList } from "../MyLocation/outdoorMapUser";

const AdminMap = ({ selectedUsername }) => {
  // DECLARE ALL USED VARIABLE
  const hostnameProduction = "http://127.0.0.1:8080/userOutdoor/";
  const hostnameHeroku =
    "https://protected-brook-89084.herokuapp.com/userOutdoor/";
  var [isMarkerShown, setIsMarkerShown] = useState(false);
  var [locationList, setLocationList] = useState([]);
  var [pathList, setPathList] = useState([]);
  // var [username, setUsername] = useState(selectedUsername);

  function delayedShowMarker() {
    setIsMarkerShown(true);
  }

  function handleMarkerClick() {
    setIsMarkerShown(false);
    delayedShowMarker();
  }

  const MyMapComponent = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDq0QmikhnR5WnGaijIX5Km-ABXyMyPrGs",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `70vh`, width: "100%" }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 13.7299, lng: 100.7782 }}>
      {props.isMarkerShown &&
        locationList
          .slice(0, 50)
          .reverse()
          .map((marker, index) => {
            const informationWindow = (
              <div>
                <b>{marker.timestamp}</b>
                <br></br>
                <b>{marker.location} </b>
                <br></br>
                {/* <b>{marker.user_name}</b> */}
              </div>
            );
            return (
              <Marker
                key={index}
                position={{
                  lat: JSON.parse(marker.latitude_longtitude).coordinates[1],
                  lng: JSON.parse(marker.latitude_longtitude).coordinates[0],
                }}
              >
                <InfoWindow>{informationWindow}</InfoWindow>
              </Marker>
            );
          })}

      <Polyline
        path={pathList}
        options={{
          strokeColor: "#120204",
          strokeOpacity: "1.0",
          strokeWeight: 3,
          icons: [
            {
              icon: { path: window.google.maps.SymbolPath.FORWARD_OPEN_ARROW },
              offset: "20%",
              repeat: "500px",
            },
          ],
        }}
      />
    </GoogleMap>
  ));

  useEffect(() => {
    async function getLocationAdminMap() {
      try {
        const response = await fetch(hostnameHeroku, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ username: selectedUsername }),
        });
        const dataFromServer = await response.json();
        console.log("[adminMap.js] JSON : ", dataFromServer);
        setLocationList(dataFromServer.message);
        setPathList(createNewPathList(dataFromServer.message));
      } catch (err) {
        console.log(err);
      }
    }

    console.log("(adminMap.js) SELECTED_USERNAME : ", selectedUsername);
    getLocationAdminMap();
    delayedShowMarker();
  }, [selectedUsername]);

  return (
    <MyMapComponent
      isMarkerShown={isMarkerShown}
      onMarkerClick={handleMarkerClick}
    />
  );
};

export default AdminMap;
