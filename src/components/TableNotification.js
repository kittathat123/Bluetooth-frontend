import React, { useEffect, useState, useRef } from "react";
import { Table } from "reactstrap";
import { useHistory } from "react-router";

// const hostnameHeroku = "https://protected-brook-89084.herokuapp.com/API/contact/";
// const hostnameProduction = "http://127.0.0.1:8080/API/contact/";

const WebSocketHostnameHeroku = "wss://protected-brook-89084.herokuapp.com/ws/contact/"
const WebSocketHostnameProduction = "ws://127.0.0.1:8080/ws/contact/"


export default function TableNotification () {
    const history = useHistory();
    var [list, setList] = useState([]);
    var [username, setUserName] = useState('');

    const [isPaused, setPause] = useState(false)
    const ws = useRef(null);


    // GET USERNAME FROM LOCALSTORAGE
    if(localStorage.getItem('user_info') === null) {
        alert("!!! Please Log-in to the system first !!!");
        history.push("/"); 
    } else if(localStorage.getItem('user_info') !== null) {
        username = JSON.parse(localStorage.getItem('user_info')).username;
    } 

    // GET_CONTACT_DATA_FROM_SERVER
    useEffect(() => {
        ws.current = new WebSocket(WebSocketHostnameProduction);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        return () => {
            ws.current.close();
        };

    }, []);

    useEffect(() => {
        if(!ws.current) return;

        ws.current.onmessage = e => {
            if (isPaused) return;
            const message = JSON.parse(e.data);
            console.log("WS [CONTACT_DATA] : ", message.contact_payload);
            setList(message.contact_payload);
        }
    }, [isPaused]);
    
  
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
                    .slice(0, 25).reverse()
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


