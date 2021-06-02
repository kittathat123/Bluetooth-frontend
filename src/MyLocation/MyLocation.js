import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import VRScene from "./VRScene";
import { Button } from "reactstrap";
import Room from "./AFrame-SmartHome-master/docVRoom";
import { useHistory, Link } from "react-router-dom";
import useToken from "../Token/useToken";
import "./MyLocation.css";
// import Link from "react-router";

export default function MyLocation() {
  const history = useHistory();

  // CHECK STATUS USER IS LOGIN OR NOT
  // const localStorageString = localStorage.getItem('user_info');
  // if(localStorageString === null){
  //     alert("!!! Please Log-in to the system first !!!");
  //     history.push("/");
  // } else if(localStorageString !== null) {
  //     console.log("[MyLocation] username : ", JSON.parse(localStorageString).username);
  // }

  return (
    <div className="page">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col">
          <div className="pageContent">
            <div className="header ">
              {/* <Button className="backButton" color="secondary" href="./Outdoor">
                Back
              </Button> */}
              <Link className="navButton" to="/Outdoor">
                Outdoor{" "}
              </Link>
              <Link className="navButton" to="/Mylocation">
                {" "}
                Indoor
              </Link>

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
