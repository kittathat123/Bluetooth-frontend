import React from "react";
import Sidebar from "../components/Sidebar";
import "./Profile.css";
import ProfileCard from "./ProfileCard";

export default function Profile() {
  return (
    <div className="page">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col">
          <div className="pageContent">
            <h1 className="roomTitle">Profile</h1>
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
