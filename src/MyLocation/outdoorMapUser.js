import React, { useState, useEffect } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline,
} from "react-google-maps";
import { useHistory } from "react-router";

export const createNewPathList = (dataLocation) => {
  // SORT DATA LIST BY USING DATE_TIME
  dataLocation.sort(function (a, b) {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
  // console.log("NEW DATA LOCATION : ", dataLocation);
  var pathListInFunction = [];
  var i;
  for (i = 0; i < dataLocation.length; i++) {
    // console.log(JSON.parse(dataLocation[i]));
    pathListInFunction.push({
      lat: JSON.parse(dataLocation[i].latitude_longtitude).coordinates[1],
      lng: JSON.parse(dataLocation[i].latitude_longtitude).coordinates[0],
    });
  }
  // console.log(pathListInFunction);
  return pathListInFunction;
  // setPathList(pathListInFunction);
};

export default function OutdoorMapUser() {
  // DECLARE ALL USED VARIABLE
  const hostnameProduction = "http://127.0.0.1:8080/userOutdoor/";
  const hostnameHeroku =
    "https://protected-brook-89084.herokuapp.com/userOutdoor/";
  const history = useHistory();
  var [token] = useState("");
  var [isMarkerShown, setIsMarkerShown] = useState(false);
  var [locationList, setLocationList] = useState([]);
  var [pathList, setPathList] = useState([]);
  var localStorageString = localStorage.getItem("user_info");

  // GET USERNAME FROM LOCALSTORAGE
  if (localStorage.getItem("user_info") === null) {
    alert("!!! Please Log-in to the system first !!!");
    history.push("/");
  } else if (localStorage.getItem("user_info") !== null) {
    token = JSON.parse(localStorageString).token;
  }

  function delayedShowMarker() {
    setIsMarkerShown(true);
  }

  function handleMarkerClick() {
    setIsMarkerShown(false);
    delayedShowMarker();
  }

  function initMap() {
    var map = new GoogleMap.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: {
        lat: -8.0433112,
        lng: -34.934217,
      },
      mapTypeId: GoogleMap.maps.MapTypeId.TERRAIN,
    });

    //  desenha a linha
    var lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      strokeColor: "red",
      scale: 4,
    };

    var line = new GoogleMap.maps.Polyline({
      path: [
        {
          lat: 12.2686734,
          lng: -75.6664327,
        }, // ponto inicial
        {
          lat: -6.0464433,
          lng: -35.0025289,
        }, // ponto final
      ],
      geodesic: true, // segue a curvatura da terra
      strokeOpacity: 0, // opacidade da linha
      icons: [
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "20px",
        },
      ], // cria o efeito dashed
      map: map, // aplica ao mapa
    });
  }

  const MyMapComponent = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDq0QmikhnR5WnGaijIX5Km-ABXyMyPrGs",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `70vh`, width: "70vw" }} />,
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
                <b>{marker.location}</b>
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
    async function getLocation() {
      try {
        const response = await fetch(hostnameHeroku, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ token: token }),
        });
        const dataFromServer = await response.json();
        console.log("[outdoorMapUser.js] JSON : ", dataFromServer);
        setLocationList(dataFromServer.message);
      } catch (err) {
        console.log(err);
      }
    }
    getLocation();
    delayedShowMarker();
  }, [token]);

  return (
    <MyMapComponent
      isMarkerShown={isMarkerShown}
      onMarkerClick={handleMarkerClick}
    />
  );
}
