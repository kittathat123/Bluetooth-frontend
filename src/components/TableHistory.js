import { TableBody, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Table } from "reactstrap";

const hostnameHeroku =
  "https://protected-brook-89084.herokuapp.com/API/location/";
const hostnameProduction = "http://127.0.0.1:8080/API/location/";

async function getList() {
  return await fetch(hostnameHeroku).then((data) => data.json());
}

// export function setItem(item) {
//   return fetch("https://protected-brook-89084.herokuapp.com/API/location/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ item }),
//   }).then((data) => data.json());
// }

const TableHistory = (props) => {
  const history = useHistory();
  var [list, setList] = useState([]);
  var [username, setUserName] = useState("");

  // GET USERNAME FROM LOCALSTORAGE
  if (localStorage.getItem("user_info") === null) {
    alert("!!! Please Log-in to the system first !!!");
    history.push("/");
  } else if (localStorage.getItem("user_info") !== null) {
    // console.log("[Profile] token : ", JSON.parse(localStorageString).token);
    username = JSON.parse(localStorage.getItem("user_info")).username;
    // token = JSON.parse(localStorage.getItem('user_info')).token;
  }

  // GET_BLUETOOTH_TAG_DATA_FROM_SERVER
  useEffect(() => {
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        // console.log("[TableHistory] send data part" + JSON.stringify(items));
        setList(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <Table style={{ width: "70vw", height: "70vh" }}>
      <thead>
        <tr>
          <th>Bt_tag_owner</th>
          <th>Timestamp</th>
          <th>X_coord</th>
          <th>Y_coord</th>
          <th>Room</th>
          <th>Floor</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {list
          .filter((item) => item.bt_tag_owner === username)
          .slice(-25)
          .reverse()
          .map((item, index) => (
            <tr key={index}>
              <td>{item.bt_tag_owner}</td>
              <td>{item.timestamp}</td>
              <td>{item.x_coord}</td>
              <td>{item.y_coord}</td>
              <td>{item.room}</td>
              <td>{item.floor}</td>
              <td>{item.location}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TableHistory;
