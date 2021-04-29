import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import "./LogHistory.css";
import Tables from "../components/Tables";

export default function LogHistory() {
  return (
    <div className="page">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col">
          <div className="pageContent">
            <h1 style={{ color: "rgba(42, 157, 244)" }}>Log History</h1>
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
