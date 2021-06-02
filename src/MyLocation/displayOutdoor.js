import React, { Component } from "react";
import { Button } from "reactstrap";
import Sidebar from "../components/Sidebar";
import Outdoor from "./outdoorMapUser";
import { useHistory, Link } from "react-router-dom";
import "./MyLocation.css";

export default class outdoorMap extends Component {
  render() {
    return (
      <div className="page">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-auto">
            <Sidebar />
          </div>
          <div className="col">
            <div className="pageContent">
              <div className="header ">
                <Link className="navButton" to="/Outdoor">
                  Outdoor{" "}
                </Link>
                <Link className="navButton" to="/Mylocation">
                  {" "}
                  Indoor
                </Link>

                <h2 className="roomTitle">ECC 705</h2>
              </div>
              <div className="boxMap">
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
}
