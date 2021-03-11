// import React, { Component } from "react";

// class test extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       list: {},
//     };
//   }

//   componentDidMount() {
//     const WebSocket = require("ws");
//     const socket = new WebSocket(
//       // "wss://protected-brook-89084.herokuapp.com/ws/location/"
//       "ws://192.168.4.209/w/tag/1/",
//       "8e1640c34c4bbdfd28964174748333b3a01b3699"
//     );

//     socket.addEventListener("open", function (event) {
//       socket.send("Hello Server!");
//     });

//     socket.addEventListener("message", function (event) {
//       const data = JSON.parse(event.data);
//       this.setState({ list: data });
//       console.log(data);
//     });

//     socket.addEventListener("open", function (event) {
//       socket.send(" Server Error!");
//     });

//   }
//   render() {
//     return (
//       <div>
//         {/* <childComponent websocket={this.socket} /> */}
//         {console.log(this.data)}
//       </div>
//     );
//   }
// }

// export default test;

// const WebSocket = require("ws");
// const socket = new WebSocket(
//   // "wss://protected-brook-89084.herokuapp.com/ws/location/"
//   "wss://192.168.4.209" + "/ws/tag/1/",
//   "e7b26a88637b30ca2cec67c94aedf2d2f9b4e214"
// );

// socket.onopen = function (e) {
//   console.log("Hello websocket");
//   socket.send("Here's some text that the server is urgently awaiting!");
// };

// socket.onmessage = function (e) {
//   const data = JSON.parse(e.data);

//   // this.setState({ list: data });

//   console.log("DATA : " + data + "\n");
// };

// socket.onclose = function (e) {
//   console.error("Chat socket closed unexpectedly");
// };

export const test = () => {
  const socket = new WebSocket(
    // "wss://protected-brook-89084.herokuapp.com/ws/location/"
    "wss://192.168.4.209/ws/tag/1/",
    "f3c9c59ea1cfb5eeabae3b3bb6be72ba2d1b67c7"
  );

  socket.onopen = function (e) {
    console.log("Hello websocket");
    const data = {
      message: JSON.stringify({
        type: "add_tags",
        tags: ["meter_1phase.RI-F550.v1n"],
      }),
    };
    socket.send(data);
  };

  socket.onmessage = function (e) {
    const data = JSON.parse(e.data);

    // this.setState({ list: data });

    console.log("DATA : " + data + "\n");
  };

  socket.onclose = function (e) {
    console.error("Chat socket closed unexpectedly");
  };
};
