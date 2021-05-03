import { TableBody, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

async function getList() {
  return await fetch(
    "https://protected-brook-89084.herokuapp.com/API/location/"
  ).then((data) => data.json());
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
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        console.log("send data part: " + getList(items));
        setList(items);
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <Table style={{ width: "60vw" }}>
      <thead>
        <tr>
          <th>Bt_tag_owner</th>
          <th>Timestamp</th>
          <th>X_coord</th>
          <th>Y_coord</th>
          <th>Location</th>
          <th>Floor</th>
          <th>Room</th>
        </tr>
      </thead>
      <tbody>
        {list.slice(0, 50).map((item) => (
          <tr key={item}>
            <td>{item.bt_tag_owner}</td>
            <td>{item.timestamp}</td>
            <td>{item.x_coord}</td>
            <td>{item.y_coord}</td>
            <td>{item.location}</td>
            <td>{item.floor}</td>
            <td>{item.room}</td>
          </tr>
        ))}
      </tbody>

      {/* <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <TableBody>
        <TableRow>
          {list.slice(0, 5).map((item) => (
            <tarow key={item.x_coord}>
              <td>{item.bt_tag_owner}</td>
              <td>{item.timestamp}</td>
              <td>{item.x_coord}</td>
              <td>{item.y_coord}</td>
              <td>{item.location}</td>
              <td>{item.floor}</td>
              <td>{item.room}</td>
            </tarow>
          ))}
        </TableRow> */}
      {/* <tr>
          <th scope="col">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="col">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr> */}
      {/* </TableBody> */}
    </Table>
  );
};

export default TableHistory;
