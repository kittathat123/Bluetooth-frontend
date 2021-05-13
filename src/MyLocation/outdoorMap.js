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

import React, {useState, useEffect} from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { useHistory } from "react-router";

let markers = [
  {
    id: 1,
    latitude: 13.7299,
    longitude: 100.7782,
    shelter: "marker 1",
  },
  {
    id: 2,
    latitude: 13.7599,
    longitude: 100.6782,
    shelter: "marker 2",
  },
  {
    id: 3,
    latitude: 13.7499,
    longitude: 100.525,
    shelter: "marker 3",
  },
];


export default function OutdoorMap() {

    // DECLARE ALL USED VARIABLE
    const history = useHistory();
    var [token, setToken] = useState('');
    var [isMarkerShown, setIsMarkerShown] = useState(false);
    var [locationList, setLocationList] = useState([]);
    var localStorageString = localStorage.getItem('user_info');

    // GET USERNAME FROM LOCALSTORAGE
    if(localStorage.getItem('user_info') === null){
        alert("!!! Please Log-in to the system first !!!");
        history.push("/"); 
    } else if(localStorage.getItem('user_info') !== null) {
        // console.log("[Profile] token : ", JSON.parse(localStorageString).token);
        // username = JSON.parse(localStorageString).username;
        token = JSON.parse(localStorageString).token;
        
    }  

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
          // <Marker
          //   position={{ lat: 13.7299, lng: 100.7782 }}
          //   onClick={props.onMarkerClick}
          // />
          
          locationList.map((marker) => {
            // const onClick = props.onClick.bind(this, marker)
            return (
              <Marker
                key={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
              >
                <InfoWindow>
                  <div>{marker.location}</div>
                  <div>{marker.shelter}</div>
                </InfoWindow>
              </Marker>
            );
            // console.log(marker);
          })}
      </GoogleMap>
    ));

    const hostnameProduction = "http://127.0.0.1:8080/outDoorlocationService/";
    const hostnameHeroku = "https://protected-brook-89084.herokuapp.com/outDoorlocationService/";
    
    useEffect(() => {
        fetch(hostnameProduction, {
            method: 'POST',
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }, 
            body: JSON.stringify({'token': token})
        })
            .then(response => response.json())
            .then(dataFromServer => {
              console.log("[outdoorMap] DATA : " , (dataFromServer.message));
              setLocationList(dataFromServer.message);
            })
        delayedShowMarker();
    }, [token]);


    return(
        <MyMapComponent 
          isMarkerShown={isMarkerShown}
          onMarkerClick={handleMarkerClick}
        />
    );
}

// export default class outdoorMap extends React.Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {
//       isMarkerShown: false,
//       locationList : [],
//       token : "",
//     };

//     this.delayedShowMarker = this.delayedShowMarker.bind(this);
//     this.postUsername = this.postUsername.bind(this);
    
//   }

//   componentDidMount() {
//     // GET TOKEN FROM LOCALSTORAGE
//     if(localStorage.getItem('user_info') === null){
//         alert("!!! Please Log-in to the system first !!!");
//         this.props.history.push("/"); 
//     } else if(localStorage.getItem('user_info') !== null) {
//         console.log("token : " ,JSON.parse(localStorage.getItem('user_info')).token);
//         this.setState({
//           token: JSON.parse(localStorage.getItem('user_info')).token
//         })
//     } 
//     this.delayedShowMarker();
//     this.postUsername(this.state.token);

    
//     // this.fetchLocationFromAPI();
//     // this.manageData(this.state.locationList);
//   }

//   async postUsername(credentials) {
//     console.log("CREDITIALS : ", credentials)
//     return await fetch(this.hostnameProduction, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     })
//       .then(data => data.json())
//       .then(result => {
//         console.log("RESULT : ", result)
//       })
//       .catch(e => {
//         console.log("e : ",e)
//       })
//   }

//   manageData(locationList) {
//     console.log("manage :" ,locationList)
//   }


//   delayedShowMarker = () => {
//     setTimeout(() => {
//       this.setState({ isMarkerShown: true });
//     }, 3000);
//   };

//   handleMarkerClick = () => {
//     this.setState({ isMarkerShown: false });
//     this.delayedShowMarker();
//   };

//   render() {
//     return (
//       <MyMapComponent
//         isMarkerShown={this.state.isMarkerShown}
//         onMarkerClick={this.handleMarkerClick}
//       />
//     );
//   }
// }
