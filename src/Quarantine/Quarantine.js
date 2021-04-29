import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import "./Quarantine.css";
import geoFence from "../assets/geofence.png";

class Quarantine extends Component {
  render() {
    return (
      <div className="page">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-auto">
            <Sidebar />
          </div>
          <div className="col">
            <div className="pageContent">
              <h1 style={{ color: "rgba(42, 157, 244)" }}>Quarantine</h1>

              <div className="timerClock">
                <h3>Choose where you want to stay for quarantine</h3>
              </div>
              <div className="boxMap">
                <div className="geoBox">
                  <img
                    src={geoFence}
                    style={{ width: "600px", height: "400px" }}
                    alt="Geo Fencing"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Quarantine;
