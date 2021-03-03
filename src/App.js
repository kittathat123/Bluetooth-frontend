import "./App.css";
import MyLocation from "./MyLocation/myLocation";
import React, { useEffect } from "react";
import LogHistory from "./LogHistory/LogHistory";
import Notification from "./Notification/Notification";
import Quarantine from "./Quarantine/Quarantine";
import Profile from "./Profile/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { test } from "./test";

function App() {
  useEffect(() => {
    test();
  });

  return (
    <div>
      {/* <Router>
        <Switch>
          <Route exact path="/" component={MyLocation} />
          <Route path="/LogHistory" component={LogHistory} />
          <Route path="/Notification" component={Notification} />
          <Route path="/Quarantine" component={Quarantine} />
          <Route path="/Profile" component={Profile} />
        </Switch>
      </Router> */}
    </div>

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
  );
}

export default App;
