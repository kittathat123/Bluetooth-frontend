import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import "./Profile.css";

class Profile extends Component {
  render() {
    return (
      <div className="page">
        <div>
          <Sidebar />
        </div>
        <div>This is Profile Page</div>
      </div>
    );
  }
}

export default Profile;
