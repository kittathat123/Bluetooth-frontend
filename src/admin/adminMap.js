import React, {useEffect, useState} from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

export default function OutdoorMapAdmin() {
  // DECLARE ALL USED VARIABLE
  const hostnameProduction = "http://127.0.0.1:8080/userAndAdminInformation/";
  const hostnameHeroku = "https://protected-brook-89084.herokuapp.com/userAndAdminInformation/";
  var [isMarkerShown, setIsMarkerShown] = useState(false);
  var [locationList, setLocationList] = useState([]);
  var [selectedUsername, setSelectedUsername] = useState('');

  function delayedShowMarker(){
    setTimeout(() => {
      setIsMarkerShown(true);
    }, 3000);
  };

  function handleMarkerClick() {
    setIsMarkerShown(false);
    delayedShowMarker();
  };

  const MyMapComponent = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDq0QmikhnR5WnGaijIX5Km-ABXyMyPrGs",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: (
        <div style={{ "marginTop": "-100px", height: `70vh`, width: "70vw" }} />
      ),
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 13.7299, lng: 100.7782 }}>
      {props.isMarkerShown &&
        locationList.map((marker, index) => {
          // const onClick = props.onClick.bind(this, marker)
          const informationWindow = 
            <div>
              <b>{marker.timestamp}</b>
                <br></br> 
              <b>{marker.location} </b>
                <br></br> 
              <b>{marker.user_name}</b>
            </div>;
          return (
            <Marker
              key={index}
              position={{ lat: JSON.parse(marker.latitude_longtitude).coordinates[1], lng: JSON.parse(marker.latitude_longtitude).coordinates[0] }}
            >
              <InfoWindow>
                {informationWindow}
              </InfoWindow>
            </Marker>
          );
          
        })}
    </GoogleMap>
  ));
  
  useEffect(() => {
    console.log("[adminMap.js] GET_USERNAME : ", selectedUsername);
    
    async function getLocationList() {
      try {
        const response = await fetch(hostnameHeroku, {
          method: 'GET',
          headers : {
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
          }
        });
        const dataFromServer = await response.json();
        console.log("[adminMap.js] DATA : ", dataFromServer);
        setLocationList(dataFromServer.message);
      } catch (err) {
        console.log(err);
      }
    }

    getLocationList();
    delayedShowMarker();
  }, [selectedUsername]);

  return(
    <MyMapComponent 
      isMarkerShown={isMarkerShown}
      onMarkerClick={handleMarkerClick}
    />
  );
}
