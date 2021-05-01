import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

// async function getList() {
//   return fetch("http://127.0.0.1:8080/API/location/").then((data) =>
//     data.json()
//   );
// }

export default function TableNotification() {
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   let mounted = true;
  //   getList().then((items) => {
  //     if (mounted) {
  //       console.log("send data part");
  //     }
  //   });
  //   return () => (mounted = false);
  // }, []);
  return (
    <div className="wrapper">
      <h1>My Grocery List</h1>
      <ul>
        {list.map((item) => (
          <li key={item.x_coord}>{item.x_coord}</li>
        ))}
      </ul>
    </div>
  );
}
