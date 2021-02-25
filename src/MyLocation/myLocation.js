import Sidebar from "../components/Sidebar";
import React, { Component } from "react";
import "./myLocation.css";
import VRScene from "./VRScene";
import { Button } from "reactstrap";

class myLocation extends Component {
  render() {
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
                  href="https://www.w3schools.com/"
                >
                  Back
                </Button>

                <h2 className="roomTitle">ECC 705</h2>
              </div>
              <div className="boxMap">
                <div className="borderBox">
                  <VRScene />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default myLocation;
