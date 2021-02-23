import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import "./LogHistory.css";

class LogHistory extends Component {
  render() {
    return (
      <div className="page">
        <div>
          <Sidebar />
        </div>
        <div>This is Log History Page</div>
      </div>
    );
  }
}

export default LogHistory;
