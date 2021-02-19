import logo from "../assets/IPSlogo.png";
import React, { Component } from "react";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import {
  faMapMarkedAlt,
  faHistory,
  faBell,
  faHouseUser,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Sidebar extends Component {
  render() {
    console.log(logo);
    return (
      <div className="sidebar-container">
        <div className="logo-box">
          <img
            src={logo}
            alt="IPS TRACK"
            style={{ width: "239px", height: "110px" }}
          ></img>
        </div>
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
          <div className="other-box">
            <FontAwesomeIcon
              icon={faHistory}
              size="lg"
              className="history-logo"
            />
            <h4 className="log-history-text">Log History</h4>
          </div>
          <div className="other-box">
            <FontAwesomeIcon icon={faBell} size="lg" className="bell-logo" />
            <h4 className="notification-text">Notification</h4>
          </div>
          <div className="other-box">
            <FontAwesomeIcon
              icon={faHouseUser}
              size="lg"
              className="quarantine-logo"
            />
            <h4 className="quarantine-text">Quarantine</h4>
          </div>
          <div className="other-box">
            <FontAwesomeIcon
              icon={faIdCard}
              size="lg"
              className="profile-logo"
            />
            <h4 className="profile-text">Profile</h4>
          </div>
          <div className="line"></div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
