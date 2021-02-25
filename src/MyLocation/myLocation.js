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
              <div className="header row-auto">
                <Button className="backButton" color="primary">
                  primary
                </Button>
              </div>
              <div className="boxMap row-auto">
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
