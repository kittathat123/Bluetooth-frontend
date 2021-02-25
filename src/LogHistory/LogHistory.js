import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import "./LogHistory.css";
import Tables from "../components/Tables";

class LogHistory extends Component {
  render() {
    return (
      <div className="page">
        <div className="row" style={{ width: "120%" }}>
          <div className="col-auto">
            <Sidebar />
          </div>
          <div className="col">
            <div className="pageContent">
              <h1>Log History</h1>
              <div className="boxMap">
                <div className="borderBox">
                  <Tables />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogHistory;
