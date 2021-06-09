import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Sidebar from "./adminSidebar";
import AdminMap from "./adminMap";
import "../MyLocation/MyLocation.css";
import "./admin.css";

export default function OutdoorMapAdmin() {
  const hostnameHeroku =
    "https://protected-brook-89084.herokuapp.com/userAndAdminInformation/";
  const hostnameProduction = "http://127.0.0.1:8080/userAndAdminInformation/";
  var [usernameList, setUsernameList] = useState([]);
  var [selectedUsername, setSelectedUsername] = useState(
    "-- Please select username --"
  );

  // dropdownComponent
  var [dropdownOpen, setDropdownOpen] = useState(false);
  var toggle = () => setDropdownOpen((prevState) => !prevState);

  async function getUsernameList() {
    try {
      const response = await fetch(hostnameHeroku, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataFromServer = await response.json();
      console.log(
        "[admin.js] usernameList : ",
        dataFromServer.message.username
      );
      setUsernameList(dataFromServer.message.username);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // console.log(usernameList);
    getUsernameList();
  }, []);

  return (
    <div className="page">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col">
          <div className="pageContent">
            <div className="header ">
              <h2 className="adminTitle">Admin Map</h2>

              <div className="usernameGroup">
                <div className="usernameGroupTitle">All Username :</div>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret style={{ marginTop: "15px" }}>
                    {selectedUsername}
                  </DropdownToggle>
                  <DropdownMenu>
                    {usernameList.map((data, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() => setSelectedUsername(data)}
                      >
                        {data}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <div className="boxMapAdmin">
              <div className="borderBoxAdmin">
                <AdminMap selectedUsername={selectedUsername} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
