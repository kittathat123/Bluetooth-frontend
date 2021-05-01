import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import "./Notification.css";
import Tables from "../components/TableNotification";

class Notification extends Component {
  render() {
    return (
      <div className="page">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-auto">
            <Sidebar />
          </div>
          <div className="col">
            <div className="pageContent">
              <h1 style={{ color: "rgba(42, 157, 244)" }}>Notification</h1>
              <div className="boxMap">
                <div className="tableBox">
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

export default Notification;
