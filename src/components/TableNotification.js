import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

// export default function TableNotification() {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     let mounted = true;
//     getList().then((items) => {
//       if (mounted) {
//         console.log("send data part");
//       }
//     });
//     return () => (mounted = false);
//   }, []);
//   return (
//     <div className="wrapper">
//       <h1>My Grocery List</h1>
//       <ul>
//         {list.map((item) => (
//           <li key={item.x_coord}>{item.x_coord}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

async function getList() {
  return await fetch(
    "https://protected-brook-89084.herokuapp.com/API/contact/"
  ).then((data) => data.json());
}

const TableNotification = (props) => {
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
          <th>Timestamp</th>
          <th>User_1</th>
          <th>User_2</th>
          <th>Contact Level</th>
        </tr>
      </thead>
      <tbody>
        {list.slice(0, 50).map((item) => (
          <tr key={item}>
            <td>{item.timestamp}</td>
            <td>{item.user_1}</td>
            <td>{item.user_2}</td>
            <td>{item.contact_tracing_level}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableNotification;
