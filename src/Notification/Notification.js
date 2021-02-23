import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import "./Notification.css";

class Notification extends Component {
  render() {
    return (
      <div className="page">
        <div>
          <Sidebar />
        </div>
        <div>This is Notification Page</div>
      </div>
    );
  }
}

export default Notification;
