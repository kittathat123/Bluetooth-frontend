import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import Sidebar from "../components/Sidebar";
import Outdoor from "./outdoorMapUser";
import { useHistory, Link } from "react-router-dom";
import "./MyLocation.css";

export default function Mylocation() {
  const history = useHistory();

  const outdoor = () => {
    let path = "/Outdoor";
    history.push(path);
  };
  const indoor = () => {
    let path = "/Mylocation";
    history.push(path);
  };
  return (
    <div className="page">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-auto">
          <Sidebar pageWrapId={"page-wrap"} />
        </div>
        <div className="col" id="page-wrap">
          <div className="pageContent">
            <div className="header ">
              <div className="topBar">
                <Button
                  className="navButton"
                  color="warning"
                  style={{ marginLeft: "100px" }}
                  onClick={outdoor}
                >
                  Outdoor
                </Button>{" "}
                <Button
                  className="navButton"
                  color="warning"
                  style={{ marginLeft: "-6px" }}
                  onClick={indoor}
                >
                  Indoor
                </Button>{" "}
              </div>

              <h2 className="roomTitle">Outdoor Map</h2>
            </div>
            <div className="boxMapOutdoor">
              <div className="borderBox">
                <Outdoor />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
