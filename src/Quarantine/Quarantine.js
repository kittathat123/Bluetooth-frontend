import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import "./Quarantine.css";

class Quarantine extends Component {
  render() {
    return (
      <div className="page">
        <div>
          <Sidebar />
        </div>
        <div>This is Quarantine Page</div>
      </div>
    );
  }
}

export default Quarantine;
