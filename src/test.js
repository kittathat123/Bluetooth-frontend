// import React, { Component } from "react";

import { render } from "@testing-library/react";

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

// export const WebSocket = require("ws");
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
// };

// socket.onclose = function (e) {
//   console.error("Chat socket closed unexpectedly");
// };

// const WebSocket = require("ws");

// // const socket = new WebSocket(
// //     'ws://'
// //     + '127.0.0.1:8080'
// //     + '/ws/location'
// //     + '/'
// // );

// const socket = new WebSocket(
//   "wss://" + "protected-brook-89084.herokuapp.com" + "/ws/location" + "/"
// );

// socket.onmessage = function (e) {
//   const data = JSON.parse(e.data);
//   console.log("DATA : " + e.data + "\n");
// };

// socket.onclose = function (e) {
//   console.error("Chat socket closed unexpectedly");
// };

/////////////////////    CURRENT USE    /////////////////////////////

// export const test = () => {
//   const socket = new WebSocket(
//     "wss://protected-brook-89084.herokuapp.com/ws/location/"
//     // "wss://192.168.4.209/ws/tag/1/",
//     // "f3c9c59ea1cfb5eeabae3b3bb6be72ba2d1b67c7"
//   );

//   socket.onopen = function (e) {
//     console.log("Hello websocket");
//     const data = JSON.stringify({
//       message: JSON.stringify({
//         type: "add_tags",
//         tags: ["meter_1phase.RI-F550.v1n"],
//         // value: "",
//       }),
//     });
//     socket.send(data);
//     // return data;
//   };

//   socket.onmessage = function (e) {
//     const datas = JSON.parse(e.data);

//     // this.setState({ list: data });
//     console.log("DATA : " + e.data + "\n");
//     console.log(datas.message);
//     console.log(e.data[0]); //due to stringify
//     console.log(datas.message);
//     // console.log(Object.values(datas.message));
//     console.log(typeof e.data);
//     // console.log(this.state.datas.message.value);
//     // console.log(Object.values(datas.message.type));
//   };

//   socket.onclose = function (e) {
//     console.error("Chat socket closed unexpectedly");
//   };
// };

///////////////////////     convert to beam version     ////////////////////////////

// export const test = () => {
//   const socket = new WebSocket(
//     "wss://protected-brook-89084.herokuapp.com/ws/location/"
//     // "wss://192.168.4.209/ws/tag/1/",
//     // "f3c9c59ea1cfb5eeabae3b3bb6be72ba2d1b67c7"
//   );

//   socket.onopen = function (e) {
//     console.log("Hello websocket");
//     const data = JSON.stringify({
//       message: JSON.stringify({
//         // BT_TAG_DEVICE_NAME: "BT_TAG_1",
//         bt_tag_owner: "1234",
//         // X_COORD: "",
//         // Y_COORD: "",
//       }),
//     });
//     socket.send(data);
//     // return data;
//   };

//   socket.onmessage = function (e) {
//     const datas = JSON.parse(e.data);
//     // this.setState({ list: data });
//     // console.log("DATA : " + e.data + "\n");

//     console.log(datas.payload);
//     console.log(datas.payload.x_coord);
//     console.log(datas.payload.y_coord);
//     // console.log(e.data);
//     // console.log(e.data.type); //due to stringify
//     // console.log(Object.values(datas.message));
//     // console.log(this.state.datas.message.value);
//     // console.log(Object.values(datas.message.type));
//   };

//   socket.onclose = function (e) {
//     console.error("Chat socket closed unexpectedly");
//   };
// };

////////////////////////            BEAN VERSION           //////////////////////////////

// import React, { Component } from "react";

// export default class test extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       message: "",
//     };
//     this.setMessage = this.setMessage.bind(this);
//   }

//   setMessage(message) {
//     const mes = JSON.parse(message);
//     const messy = JSON.stringify(mes);
//     console.log("Without json parse: " + message);
//     console.log("With json parse: " + mes);
//     console.log("With json string: " + messy);
//     this.setState({
//       message,
//     });
//   }

//   componentDidMount() {
//     const client = (this.client = new WebSocket(
//       " wss://protected-brook-89084.herokuapp.com/ws/location/"
//     ));
//     client.onopen = () => {
//       console.log("websocket connected");

//       // client.send("BT_TAG_OWNER: sarin_beam30");
//       // console.log("----- SEND DATA TO BACKEND_SERVER LEAW -----");
//     };
//     client.onmessage = ({ data }) => this.setMessage(data);
//     console.log(typeof this.state.message);
//   }

//   componentWillUnmount() {
//     this.client.close();
//     this.client = null;
//   }

//   render() {
//     const file = this.state.message;
//     // const files = JSON.parse(file);
//     // const extract = Object.values(file);

//     return (
//       <div>
//         show data here: {file}
//         {/* {file.map((experience, i) => {
//           return (
//             <div key={i}>
//               <div>
//                 <div>{experience.model}</div>
//               </div>
//             </div>
//           );
//         })} */}
//       </div>
//     );
//   }
// }


 ////////////////////////     Another Version     ///////////////

 constructor(props) {
    super(props);
    this.state = {
      message: "",
      spherePosition: { x: 0.5, y: 1.2, z: -4 },
    };
    this.setPayload = this.setPayload.bind(this);
    this.setXandY = this.setXandY.bind(this);
    // this.setX = this.setX.bind(this);
    // this.setY = this.setY.bind(this);
    // this.setZ = this.setZ.bind(this);

    this.getX = this.getX.bind(this);
    this.getY = this.getY.bind(this);
    this.getZ = this.getZ.bind(this);
  }

  setPayload(message) {
    console.log("TYPE : " + typeof message);
    console.log("MESSAGE : " + message);

    console.log(JSON.parse(message).payload.room);
    console.log(JSON.parse(message).payload.x_coord);
    console.log(JSON.parse(message).payload.y_coord);

    this.setXandY(
      JSON.parse(message).payload.x_coord,
      JSON.parse(message).payload.y_coord
    );

    this.setState(
      {
        message,
      },
      () => {
        // console.log("MESSAGE : ", this.state.message);
      }
    );
  }

  setXandY(x_coord, y_coord) {
    this.setState(
      {
        spherePosition: {
          x: x_coord,
          y: y_coord,
        },
      },
      () => {
        console.log("X(After) : ", this.getX());
        console.log("Y(After) : ", this.getY());
      }
    );
  }

  getX() {
    return this.state.spherePosition.x;
  }

  getY() {
    return this.state.spherePosition.y;
  }

  getZ() {
    return this.state.spherePosition.z;
  }

  generate_x() {
    // Random (X) --> 0.5 - 0.7
    return 0.5 + Math.random() * (0.7 - 0.5);
  }

  generate_y() {
    // Random (Y) --> 1.2 - 1.3
    return 1.2 + Math.random() * (1.3 - 1.2);
  }

  componentDidMount() {
    console.log("X(Before) : " + this.getX());
    console.log("Y(Before) : " + this.getY());
    // // this.setXandY(0.70, 1.30);
    // // update value every 15 seconds == 15000
    this.interval = setInterval(
      () => this.setXandY(this.generate_x(), this.generate_y()),
      15000
    );

    // const client = (this.client = new WebSocket(
    //   "ws://127.0.0.1:8080/ws/location/"
    // ));
    const client = (this.client = new WebSocket(
      "wss://protected-brook-89084.herokuapp.com/ws/location/"
    ));
    client.onopen = () => {
      console.log("websocket connected");
      // client.send("{\"USERNAME\" : \"sarin_beam30\"}")
      // client.send("Parameter : x and y")
      // console.log("------- SEND DATA TO SERVER LEAW ------")
    };
    client.onmessage = ({ data }) => this.setPayload(data);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    // this.client.close()
    // console.log('websocket closed')
    // this.client = null
  }