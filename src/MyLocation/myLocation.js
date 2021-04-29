import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import "./myLocation.css";
import VRScene from "./VRScene";
import { Button } from "reactstrap";
import Room from "./AFrame-SmartHome-master/docVRoom";
import { useHistory } from "react-router-dom";
import useToken from '../Token/useToken';

export default function MyLocation() {
    const history = useHistory();
    
    // CHECK STATUS USER IS LOGIN OR NOT
    const localStorage_string = localStorage.getItem('user_info');
    console.log("LOCAL_STORAGE : " , (localStorage.getItem('user_info')) );
    if(localStorage_string === null){
        alert("!!! Please Log-in to the system first !!!");
        history.push("/");
        
    }

    return (
      <div className="page">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-auto">
            <Sidebar />
          </div>
          <div className="col">
            <div className="pageContent">
              <div className="header ">
                <Button
                  className="backButton"
                  color="secondary"
                  href="./Outdoor"
                >
                  Back
                </Button>

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

