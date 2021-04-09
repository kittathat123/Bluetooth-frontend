import "./App.css";
import MyLocation from "./MyLocation/myLocation";
import React, { useEffect, useState } from "react";
import LogHistory from "./LogHistory/LogHistory";
import Notification from "./Notification/Notification";
import Quarantine from "./Quarantine/Quarantine";
import Profile from "./Profile/Profile";
import Ourdoor from "./MyLocation/outdoorMap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import with {} because import the function not the render app
import { test } from "./test";
import Displayoutdoor from "./MyLocation/displayOutdoor";
import ReactDoM from "react-dom";
import Login from "./Login/Login";
import Register from "./Register/register";

// const socket = new WebSocket(
//   "wss://" + "protected-brook-89084.herokuapp.com" + "/ws/location" + "/"
//   // "wss://192.168.4.209" + "/ws/tag/1/",
//   // "e7b26a88637b30ca2cec67c94aedf2d2f9b4e214"
// );

// socket.onopen = function (e) {
//   console.log("Hello websocket");
//   socket.send("Here's some text that the server is urgently awaiting!");
// };

// socket.onmessage = function (e) {
//   const data = JSON.parse(e.data);

//   // this.setState({ list: data });

//   console.log("DATA : " + data + "\n");

//   return data;
// };

// socket.onclose = function (e) {
//   console.error("Chat socket closed unexpectedly");
//   test();
// };

function App() {
  // const [xCor, setxCor] = useState([]);
  // const [yCor, setyCor] = useState({
  //   X_COORD: "xCor_value",
  //   Y_COORD: "yCor_value",
  // });

  useEffect(() => {
    test();
  });

  // console.log(xCor, yCor);

  // let values = JSON.parse(test());
  // console.log(`value of i is ${values}`);
  // for (var i = 0; i < values.length; i++) {
  //   alert(values[i]["price"]);
  // }

  return (
    <div>
      {/* {this.value().map((experience, i) => {
        return (
          <div key={i}>
            <div>
              <h5>x coordinate: {experience.X_COORD}</h5>
              <h5>y coordinate: {experience.Y_COORD}</h5>
            </div>
          </div>
        );
      })} */}
      {/* <div>the value is {value}</div> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/Mylocation" component={MyLocation} />
          <Route path="/LogHistory" component={LogHistory} />
          <Route path="/Notification" component={Notification} />
          <Route path="/Quarantine" component={Quarantine} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Outdoor" component={Displayoutdoor} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// <div>
//   <Router>
//     <Switch>
//       <Route path="/">
//         <MyLocation />
//       </Route>
//       <Route path="/LogHistory">
//         <LogHistory />
//       </Route>
//       <Route path="/Notification">
//         <Notification />
//       </Route>
//     </Switch>
//   </Router>
//   {/* <MyLocation /> */}
//   {/* <LogHistory /> */}
//   {/* <Notification /> */}
//   {/* <Quarantine /> */}
//   {/* <Profile /> */}
// </div>
