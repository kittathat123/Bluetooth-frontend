import React from "react";
import { Button } from "reactstrap";
import Sidebar from "./adminSidebar";
import AdminMap from "./adminMap";
import "../MyLocation/MyLocation.css";

export default function OutdoorMapAdmin() {
  return (
    <div className="page">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col">
          <div className="pageContent">
            <div className="header ">
              {/* <Button
                className="backButton"
                color="secondary"
                href="./Mylocation"
              >
                NEXT
              </Button> */}

              <h2 className="roomTitle">ECC 705</h2>
            </div>
            <div className="boxMap">
              <div className="borderBox">
                <AdminMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
