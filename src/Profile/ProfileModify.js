import React from "react";
import Sidebar from "../components/Sidebar";
import "./ProfileModify.css";
import ProfileCardModify from "./ProfileCardModify";

export default function ProfileModifyPage() {
  return (
    <div className="page">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col">
          <div className="pageContent">
            <h1 style={{ color: "rgba(42, 157, 244)" }}>Profile Edit</h1>
            <div className="boxMap">
              <div className="profileBox">
                <ProfileCardModify />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

