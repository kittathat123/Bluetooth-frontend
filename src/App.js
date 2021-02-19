import "./App.css";
import Sidebar from "./components/Sidebar";
import MyLocation from "./MyLocation/myLocation";
import VRScene from "./MyLocation/VRScene";
import React, { Component } from "react";

function App() {
  return (
    <div>
      <MyLocation />
      {/* <Sidebar /> */}
      {/* <VRScene /> */}
    </div>
  );
}

export default App;
