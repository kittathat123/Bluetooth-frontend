import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import VRScene from "./VRScene";
import { Button } from "reactstrap";
import Room from "./AFrame-SmartHome-master/docVRoom_2";
import Room1 from "./AFrame-SmartHome-master/docVRoom_1";
import { useHistory, Link } from "react-router-dom";
import useToken from "../Token/useToken";
import "./MyLocation.css";
// import Link from "react-router";

export default function MyLocation() {
  const history = useHistory();

  const outdoor = () => {
    let path = "/Outdoor";
    history.push(path);
  };
  const indoor = () => {
    let path = "/Mylocation";
    history.push(path);
  };
  // // CHECK STATUS USER IS LOGIN OR NOT
  // const localStorageString = localStorage.getItem('user_info');
  // if(localStorageString === null){
  //     alert("!!! Please Log-in to the system first !!!");
  //     history.push("/");
  // } else if(localStorageString !== null) {
  //     console.log("[MyLocation.js] username : ", JSON.parse(localStorageString).username);
  // }

  return (
    <div className="page">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-auto">
          <Sidebar
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
        </div>
        <div className="col" id="page-wrap">
          <div className="pageContent">
            <div className="header ">
              <div className="topBar">
                <Button
                  className="navButton"
                  color="warning"
                  style={{ "marginLeft": "100px" }}
                  onClick={outdoor}
                >
                  Outdoor
                </Button>
                <Button className="navButton" color="warning" onClick={indoor}>
                  Indoor
                </Button>
              </div>

              <h2 className="roomTitle">ECC 705</h2>
            </div>
            <div className="boxMap">
              <div className="borderBox">
                <Room />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
