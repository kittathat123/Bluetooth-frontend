import "./App.css";
import MyLocation from "./MyLocation/MyLocation";
import React, { useEffect } from "react";
import LogHistory from "./LogHistory/LogHistory";
import Notification from "./Notification/Notification";
import Quarantine from "./Quarantine/Quarantine";
import Profile from "./Profile/Profile";
import Ourdoor from "./MyLocation/outdoorMapUser";
import { Switch, Route, BrowserRouter } from "react-router-dom";
// import with {} because import the function not the render app
// import { test } from "./test"; // { test } to get funstion export file
import Displayoutdoor from "./MyLocation/displayOutdoor";
import ReactDoM from "react-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Admin from "./admin/admin";
import SessionTimeout from "./components/SessionTimeout";
import { logoutUser } from "../src/components/Sidebar";

function App() {

  // const alertUser = async() => {
  //   if(localStorage.getItem("user_info") !== null) {
  //     var answer = window.confirm("Do you want to exit our application");
  //     if(answer) {
  //         try {
  //           await logoutUser({
  //             token: JSON.parse(localStorage.getItem("user_info")).token
  //           });
  //           localStorage.removeItem("user_info");
  //         } catch (err) {
  //           console.log("(App.js) alertUser : ", err);
  //         }
  //     }
  //   }
  // }
  // function handleTabClosing() {
  //   alert("handle Tab closing");
  // }

  // useEffect(() => {
  //   window.addEventListener('beforeunload', alertUser);
  //   window.addEventListener('unload', handleTabClosing);
  //   return () => {
  //     window.removeEventListener('beforeunload', alertUser);
  //     window.removeEventListener('unload', handleTabClosing);
  //   }
  // })

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/Mylocation" component={MyLocation} />
          <Route path="/LogHistory" component={LogHistory} />
          <Route path="/Notification" component={Notification} />
          <Route path="/Quarantine" component={Quarantine} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Outdoor" component={Displayoutdoor} />
          <Route path="/Admin" component={Admin} />
        </Switch>
        {/* <SessionTimeout /> */}
      </BrowserRouter>
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
