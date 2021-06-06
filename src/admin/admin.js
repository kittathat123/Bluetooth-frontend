import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Sidebar from "./adminSidebar";
import AdminMap from "./adminMap";
import "../MyLocation/MyLocation.css";

export default function OutdoorMapAdmin() {
  
  const hostnameHeroku = "https://protected-brook-89084.herokuapp.com/userAndAdminInformation/";
  const hostnameProduction = "http://127.0.0.1:8080/userAndAdminInformation/";
  var [usernameList, setUsernameList] = useState([]);
  var [selectedUsername, setSelectedUsername] = useState("");

  async function getUsernameList() {
    try {
      const response = await fetch(hostnameHeroku, {
        method: 'GET',
        headers : {
          'Content-Type': 'application/json',
        }
      });
      const dataFromServer = await response.json();
      console.log("[admin.js] usernameList : ", dataFromServer.message.username);
      console.log("[admin.js] usernameList : ", typeof(dataFromServer.message.username));
      setUsernameList(dataFromServer.message.username);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsernameList();
  }, [])

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

              {/* <h2 className="roomTitle">ECC 705</h2>
              <div>
                USERNAME 
              </div>
              <div>
                {
                  usernameList
                  .map((data, index) => (
                    <div key={index}>
                      <button onClick={() => setSelectedUsername(data)}>{data}</button>
                    </div>
                  ))
                }
              </div> */}
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
