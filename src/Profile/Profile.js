import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import "./Profile.css";
import ProfileCard from "./profileCard";

class Profile extends Component {
  render() {
    return (
      <div className="page">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-auto">
            <Sidebar />
          </div>
          <div className="col">
            <div className="pageContent">
              <h1 style={{ color: "rgba(42, 157, 244)" }}>Profile</h1>
              <div className="boxMap">
                <div className="profileBox">
                  <ProfileCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;