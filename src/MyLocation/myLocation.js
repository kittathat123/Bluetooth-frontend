import Sidebar from "../components/Sidebar";
import React, { Component } from "react";
import "./myLocation.css";
import VRScene from "./VRScene";

class myLocation extends Component {
  render() {
    return (
      <div className="page">
        <div>
          <Sidebar />
        </div>
        <div className="pageContent">
          <div
            className="boxMap"
            // id="myEmbeddedScene"
            // style={{ width: "100px", height: "100xp" }}
          >
            <VRScene />
          </div>
        </div>
      </div>
    );
  }
}

export default myLocation;
