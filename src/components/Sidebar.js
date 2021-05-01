import logo from "../assets/IPSlogo.png";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import {
  faMapMarkedAlt,
  faHistory,
  faBell,
  faHouseUser,
  faIdCard,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";


async function logoutUser(credentials) {
  // console.log("CREDITIALS : ", credentials)
  const hostnameProduction = 'http://127.0.0.1:8080/userLogout/';
  const hostnameHeroku = 'https://protected-brook-89084.herokuapp.com/userLogout/';

  return fetch(hostnameProduction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
  })
    .then(data => data.json())

}

export default function Sidebar() {
  const history = useHistory();
  const message_1 = "Logout Success";


  const handleLogout = async e => {
    // CHECK LOCAL_STORAGE VALUE
    if(localStorage.getItem('user_info') !== null) {
      console.log("[Logout] username : ", JSON.parse(localStorage.getItem('user_info')).username);
    }
    
    var answer = window.confirm('Do you want to logout ?');
    if(answer) {
      e.preventDefault();
      const response = await logoutUser({
        'username': JSON.parse(localStorage.getItem('user_info')).username,
      });
      
      // console.log("[LOGOUT] RESPONSE_FROM_BACKEND : ", response);
      if(message_1.localeCompare(response.message) === 0) {
          localStorage.removeItem('user_info');
          history.push('/');
      }

    }
  }

  // console.log(logo);
  return (
    <div className="sidebar-container">
      <div className="logo-box">
        <img
          src={logo}
          alt="IPS TRACK"
          style={{ width: "239px", height: "110px" }}
        ></img>
      </div>

      <Link to="/Outdoor">
        <div className="content-box">
          {/* <h1 className="content-title">Menu</h1> */}
          <div className="my-location-box">
            <FontAwesomeIcon
              icon={faMapMarkedAlt}
              size="lg"
              className="pin-logo"
            />
            <h4 className="my-location-text">My Location</h4>
          </div>
        </div>
      </Link>

      <Link to="/LogHistory">
        <div className="other-box">
          <FontAwesomeIcon
            icon={faHistory}
            size="lg"
            className="history-logo"
          />
          <h4 className="log-history-text">Log History</h4>
        </div>
      </Link>
      <Link to="/Notification">
        <div className="other-box">
          <FontAwesomeIcon icon={faBell} size="lg" className="bell-logo" />
          <h4 className="notification-text">Notification</h4>
        </div>
      </Link>

      <Link to="/Quarantine">
        <div className="other-box">
          <FontAwesomeIcon
            icon={faHouseUser}
            size="lg"
            className="quarantine-logo"
          />
          <h4 className="quarantine-text">Quarantine</h4>
        </div>
      </Link>

      <Link to="/Profile">
        <div className="other-box">
          <FontAwesomeIcon
            icon={faIdCard}
            size="lg"
            className="profile-logo"
          />
          <h4 className="profile-text">Profile</h4>
        </div>
      </Link>

      <div className="other-box logout-box" onClick={handleLogout}>
        <FontAwesomeIcon
          icon={faSignOutAlt}
          size="lg"
          className="logout-logo"
        />
        <h4 className="logout-text">Logout</h4>
      </div>

      <div className="line"></div>
    </div>
  );
}

