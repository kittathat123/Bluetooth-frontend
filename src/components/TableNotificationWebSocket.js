import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useHistory } from "react-router";

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

const hostnameHeroku = "https://protected-brook-89084.herokuapp.com/API/contact/";
const hostnameProduction = "http://127.0.0.1:8080/API/contact/";

async function getList() {
  return await fetch(
    hostnameHeroku
  ).then((data) => data.json());
}

const TableNotification = (props) => {
  const history = useHistory();
  var [list, setList] = useState([]);
  var [username, setUserName] = useState('');


  // GET USERNAME FROM LOCALSTORAGE
  if(localStorage.getItem('user_info') === null) {
    alert("!!! Please Log-in to the system first !!!");
    history.push("/"); 
  } else if(localStorage.getItem('user_info') !== null) {
    // console.log("[Profile] token : ", JSON.parse(localStorageString).token);
    username = JSON.parse(localStorage.getItem('user_info')).username;
    // token = JSON.parse(localStorage.getItem('user_info')).token;
  } 

  // GET_CONTACT_DATA_FROM_SERVER
  useEffect(() => {
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        console.log("[Notification] send data part: " + getList(items));
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
        {
          list
          .filter(item => item.user_1 === username || item.user_2 === username)
          .slice(0, 10).reverse()
          .map((item, index) => (
            <tr key={index}>
              <td>{item.timestamp}</td>
              <td>{item.user_1}</td>
              <td>{item.user_2}</td>
              <td>{item.contact_tracing_level}</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};

export default TableNotification;
