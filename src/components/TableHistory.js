import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

async function getList() {
  return fetch(
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

  // console.log("TEST STH")
  useEffect(() => {
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        console.log("send data part" + getList());
         setList(items);
      }
    });
    return () => (mounted = false);
  }, []);
  
  return (
    <div className="wrapper">
      <h1>My Grocery List</h1>
      <ul>
        {list.slice(0, 10).map((item) => (
          <li key={item.x_coord}>{item.x_coord}</li>
        ))}
      </ul>
    </div>
    // <Table style={{ width: "60vw" }}>
    //   <thead>
    //     <tr>
    //       <th>#</th>
    //       <th>First Name</th>
    //       <th>Last Name</th>
    //       <th>Username</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <th scope="row">1</th>
    //       <td>Mark</td>
    //       <td>Otto</td>
    //       <td>@mdo</td>
    //     </tr>
    //     <tr>
    //       <th scope="row">2</th>
    //       <td>Jacob</td>
    //       <td>Thornton</td>
    //       <td>@fat</td>
    //     </tr>
    //     <tr>
    //       <th scope="row">3</th>
    //       <td>Larry</td>
    //       <td>the Bird</td>
    //       <td>@twitter</td>
    //     </tr>
    //   </tbody>
    // </Table>
  );
};

export default TableHistory;
