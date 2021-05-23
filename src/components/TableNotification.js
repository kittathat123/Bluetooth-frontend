import React, { useEffect, useState, useRef } from "react";
import { Table } from "reactstrap";
import { useHistory } from "react-router";
import ReactHtmlParser from 'react-html-parser'; 

// const hostnameHeroku = "https://protected-brook-89084.herokuapp.com/API/contact/";
// const hostnameProduction = "http://127.0.0.1:8080/API/contact/";

const WebSocketHostnameHeroku =
  "wss://protected-brook-89084.herokuapp.com/ws/contact/";
const WebSocketHostnameProduction = "ws://127.0.0.1:8080/ws/contact/";

export default function TableNotification() {
  const history = useHistory();
  var [list, setList] = useState([]);
  var [username, setUserName] = useState("");
  // WebSocket
  const [isPaused, setPause] = useState(false);
  const ws = useRef(null);

  // GET USERNAME FROM LOCALSTORAGE
  if (localStorage.getItem("user_info") === null) {
    alert("!!! Please Log-in to the system first !!!");
    history.push("/");
  } else if (localStorage.getItem("user_info") !== null) {
    username = JSON.parse(localStorage.getItem("user_info")).username;
  }

  // GET_CONTACT_DATA_FROM_SERVER
  useEffect(() => {
      ws.current = new WebSocket(WebSocketHostnameHeroku);
      ws.current.onopen = () => console.log("ws opened");
      ws.current.onclose = () => console.log("ws closed");

      return () => {
          ws.current.close();
      };

  }, []);

  // SET_CONTACT_DATA_LIST
  useEffect(() => {
      if(!ws.current) return;

      ws.current.onmessage = e => {
          if (isPaused) return;
          const message = JSON.parse(e.data);
          console.log("WS [CONTACT_DATA] : ", message.contact_payload);
          setList(convertLevelToColor(message.contact_payload));
      }
  }, [isPaused, ws]);

  function convertLevelToColor(contactList) {
    for(var item of contactList){
      if(item.contact_tracing_level === 0) {
        item.contact_tracing_level = "<div style=\"width:100%; height:15px; border:1px solid green; background-color: green;\"></div>"
      } else if (item.contact_tracing_level === 1) {
        item.contact_tracing_level = "<div style=\"width:100%; height:15px; border:1px solid yellow; background-color: yellow;\"></div>"
      } else if (item.contact_tracing_level === 2) {
        item.contact_tracing_level = "<div style=\"width:100%; height:15px; border:1px solid DarkOrange; background-color: DarkOrange;\"></div>"
      } else if (item.contact_tracing_level === 3){
        item.contact_tracing_level = "<div style=\"width:100%; height:15px; border:1px solid Crimson; background-color: Crimson;\"></div>"
      }
    }
    
    return contactList;
  }
    
  
  return (
      <Table style={{ width: "60vw" }}>
          <thead>
              <tr>
              <th>Timestamp</th>
              <th>User_1</th>
              <th>Covid-19 Status (User_1)</th>
              <th>User_2</th>
              <th>Covid-19 Status (User_2)</th>
              <th>Contact Level</th>
              </tr>
          </thead>
          <tbody>
              {
                  list
                  .filter(item => item.user_1 === username)
                  .slice(0, 25).reverse()
                  .map((item, index) => (
                      <tr key={index}>
                          <td>{item.timestamp}</td>
                          <td>{item.user_1}</td>
                          <td>{item.covid_19_status_user_1}</td>
                          <td>{item.user_2}</td>
                          <td>{item.covid_19_status_user_2}</td>
                          <td>
                            {ReactHtmlParser(item.contact_tracing_level)}
                          </td>
                      </tr>
                  ))
              }
          </tbody>
      </Table>
  );
};

  