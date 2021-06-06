import logo from "../assets/IPSlogo.png";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { useState, useEffect } from "react";
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
import ProfileIconImage from "../assets/ProfileIcon.png";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { slide as Menu } from "react-burger-menu";

export let logoutUser = async (credentials) => {
  // console.log("CREDITIALS : ", credentials)
  const hostnameProduction = "http://127.0.0.1:8080/userLogout/";
  const hostnameHeroku =
    "https://protected-brook-89084.herokuapp.com/userLogout/";

  return fetch(hostnameHeroku, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export default function Sidebar() {
  const history = useHistory();
  const message_1 = "Logout Success";

  var [inputStatus, setInputStatus] = useState(false);
  var [cardTextStatus, setCardTextStatus] = useState(true);
  var [token] = useState("");
  var [firstname, setFirstname] = useState("");
  var [lastname, setLastname] = useState("");
  var localStorageString = localStorage.getItem("user_info");
  var [url, setUrl] = useState(ProfileIconImage);

  // GET USERNAME FROM LOCALSTORAGE
  if (localStorage.getItem("user_info") === null) {
    alert("!!! Please Log-in to the system first !!!");
    history.push("/");
  } else if (localStorage.getItem("user_info") !== null) {
    // console.log("[Profile] token : ", JSON.parse(localStorageString).token);
    // username = JSON.parse(localStorageString).username;
    token = JSON.parse(localStorageString).token;
  }

  const handleLogout = async (e) => {
    // CHECK LOCAL_STORAGE VALUE
    if (localStorage.getItem("user_info") !== null) {
      console.log(
        "[Logout] username : ",
        JSON.parse(localStorage.getItem("user_info")).username
      );
    }

    var answer = window.confirm("Do you want to logout ?");
    if (answer) {
      e.preventDefault();
      const response = await logoutUser({
        // username: JSON.parse(localStorage.getItem("user_info")).username,
        token: JSON.parse(localStorage.getItem("user_info")).token,
      });

      // console.log("[LOGOUT] RESPONSE_FROM_BACKEND : ", response);
      if (message_1.localeCompare(response.message) === 0) {
        localStorage.removeItem("user_info");
        history.push("/");
      }
    }
  };

  const hostnameGetUserInformationProduction = "http://127.0.0.1:8080/userAndAdminInformation/";
  const hostnameGetUserInformationHeroku =
    "https://protected-brook-89084.herokuapp.com/userAndAdminInformation/";
  const cloudinaryImageHostName =
    "http://res.cloudinary.com/hiznwi5vk/image/upload/v1621272433/";
  useEffect(() => {
    fetch(hostnameGetUserInformationHeroku, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token: token }),
    })
      .then((response) => response.json())
      .then((dataFromServer) => {
        // console.log("DATA : ", dataFromServer.userInformation[0]);

        try {
          // SET ALL USED VARIBLE

          setFirstname(dataFromServer.userInformation[0].FIRST_NAME);
          setLastname(dataFromServer.userInformation[0].LAST_NAME);

          var imageNameFromServer =
            dataFromServer.userInformation[0].IMAGE_PROFILE;
          if (
            imageNameFromServer.localeCompare("defaultProfilePicture.jpg") ===
              0 ||
            imageNameFromServer.localeCompare(
              "/profilePicture/defaultProfilePicture.jpg"
            ) === 0 ||
            imageNameFromServer.localeCompare("") === 0
          ) {
            console.log("(ProfileCard.js) : KO CHECK NOI_1");
          } else {
            // console.log("(ProfileCard.js) : KO CHECK NOI_2")
            setUrl(
              cloudinaryImageHostName +
                dataFromServer.userInformation[0].IMAGE_PROFILE
            );
          }
        } catch (err) {
          history.push("/");
        }
      });
  }, [history, token]);

  // console.log(logo);
  return (
    <Menu className="sidebar-container">
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
          <FontAwesomeIcon icon={faIdCard} size="lg" className="profile-logo" />
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

      <div className="side_info_box">
        <div className="infoSpace row">
          <div className="imageProfile-div">
            <img
              src={url}
              alt="profile-preview"
              width="150px"
              height="150px"
              className="image-profile"
            />
            <div
              style={{ display: inputStatus ? "inline" : "none" }}
              className="profile-image-button-group"
            ></div>
          </div>
        </div>
        <CardSubtitle tag="h6">First Name :</CardSubtitle>
        <CardText
          className="side_info"
          style={{ display: cardTextStatus ? "inline" : "none" }}
        >
          {firstname}
        </CardText>

        <CardSubtitle tag="h6">Last Name :</CardSubtitle>
        <CardText
          className="side_info"
          style={{ display: cardTextStatus ? "inline" : "none" }}
        >
          {lastname}
        </CardText>
      </div>
    </Menu>
  );
}
