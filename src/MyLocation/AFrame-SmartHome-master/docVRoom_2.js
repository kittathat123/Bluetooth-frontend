import React, { Component } from "react";
// import "aframe";
import { Entity, Scene } from "aframe-react";
import { Button } from "reactstrap";
// import "aframe-physics-system/dist/aframe-physics-system";    have error

class docVRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "window_1234",
      message: "",
      spherePosition: {
        x: -2.8,
        y: 1.2,
        z: -2.45,
      },
    };

    this.setUsername = this.setUsername.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.setX = this.setX.bind(this);
    this.setY = this.setY.bind(this);
    this.setXandY = this.setXandY.bind(this);
  }

  setXandY(x_coord, y_coord) {
    console.log("x and y" + x_coord + "and " + y_coord);
    this.setState({
      spherePosition: { x: x_coord, y: y_coord, z: 1 },
    });
  }

  setX(x_coord) {
    this.setState({
      x: x_coord,
    });
  }

  setY(y_coord) {
    this.setState({
      y: y_coord,
    });

    // document.getElementById("male").object3D.position.set(1,2,3);
    // document.querySelector("#male").object3D.position.set(x_coord, this.state.y, y_coord);
    // document.querySelector("#male").setAttribute('position', {x:x_coord, y:this.state.y, z:y_coord});
    // document.querySelector("#male").setAttribute('position', {x:x_coord, y:this.state.y, z:y_coord});
    // console.log("UPDATE POSITION LEAW");
  }

  setUsername() {
    if (localStorage.getItem("user_info") !== null) {
      this.setState({
        username: JSON.parse(localStorage.getItem("user_info")).username,
      });
    }
  }

  getUsername() {
    // console.log("[docVRoom.js] USER : ", this.state.username);
    return this.state.username;
  }

  aframePath = "node_modules/aframe/dist/aframe-master.js";

  componentDidMount() {
    this.setUsername();
    this.getUsername();

    // ADD_A-FRAME_SCRIPT
    // const script = document.createElement("script");
    // script.src = this.aframePath;
    // script.async = true;
    // // script.onload = () => this.scriptLoaded();
    // document.head.appendChild(script);

    const socket = new WebSocket(
      "wss://protected-brook-89084.herokuapp.com/ws/location/"
      // "wss://192.168.4.209/ws/tag/1/",
      // "f3c9c59ea1cfb5eeabae3b3bb6be72ba2d1b67c7"
    );

    socket.onopen = (e) => {
      e.preventDefault();
      console.log("[docVRoom_2.js] socket.onopen");
      // con;
    };

    socket.onmessage = (e) => {
      console.log("[docVRoom_2.js] socket.onmessage");
      const datas = JSON.parse(e.data);
      if (datas.payload.length !== 0) {
        if (
          datas.payload.bt_tag_owner.localeCompare(this.getUsername()) === 0
        ) {
          console.log("[docVRoom.js] DATA : ", datas.payload);
          this.setXandY(datas.payload.x_coord, datas.payload.y_coord);
          // this.setXandY(2.3, 2);
        }
      }
    };

    socket.onclose = () => {
      console.log("[docVRoom_2.js] socket.onclose", socket.onclose());
    };
    // socket.close();
    // console.log("[docVRoom_2.js] socket.onclose2");
  }

  render() {
    const datass = Object.values(this.state.spherePosition);
    console.log("(docVRoom.js) show sphere position: " + datass);
    // var sceneEl = document.querySelector("a-scene");
    // var entity = document.querySelector("#maleModel").getAttribute("position");
    // document
    //   .getElementById("ball")
    //   .setAttribute("position", { x: -3, y: 0.59, z: -3 });
    // var male = document.getElementById("male");
    var el = document.getElementById("maleModel");

    // console.log("get avatar position 2t", el.setAttribute("position"));
    // entityEl.object3D.position.set(1, 2, 3);
    // this.setX(2.3);
    // this.setY(2);

    // return JSON.stringify(this.state.spherePosition);
    const { spherePosition } = this.state;
    // return (
    //   <a-scene>
    //     {/* <a-entity gltf-model="#monster" animation-mixer></a-entity> */}
    //     <a-entity
    //       gltf-model="url(https://cdn.jsdelivr.net/gh/kittathat123/Bluetooth-frontend/src/MyLocation/AFrame-SmartHome-master/patruck/patrick.gltf)"
    //       position={`${spherePosition.x} ${spherePosition.y} ${spherePosition.z}`}
    //       scale="0.03 0.03  0.02 "
    //     ></a-entity>
    //     <a-sky color="#ECECEC"></a-sky>
    //   </a-scene>
    // );

    return (
      <div>
        <div style={{ height: "70vh", width: "70vw" }}>
          <Button onClick={(e) => this.setXandY(2.5, 2, e)}></Button>
          <a-scene
            physics="gravity: -1.6"
            environment="preset: default; lighting: none; ground: none"
            // style="position: absolute; height: 100%; width: 100%;"
            // vr-mode-ui="enabled: false"
            embedded
          >
            <a-entity id="cameraRig" rotation={{ x: 0, y: 0, z: 0 }}>
              <a-entity
                id="head"
                camera={{ active: "true" }}
                wasd-controls={{ enabled: "true" }}
                look-controls={{ enabled: "true" }}
                position={{ x: 0, y: 1.65, z: 0 }}
              ></a-entity>

              <a-entity
                id="rightHand"
                oculus-touch-controls="hand: right"
                teleport-controls="cameraRig: #cameraRig; teleportOrigin: #head; button: trigger;"
                thumbstick-rotate
              ></a-entity>

              <a-entity
                id="leftHand"
                oculus-touch-controls="hand: left"
                controller-cursor={{}}
              ></a-entity>
            </a-entity>

            <a-assets>
              <a-asset-item
                response-type="arraybuffer"
                id="male"
                src="https://cdn.jsdelivr.net/gh/kittathat123/Bluetooth-frontend/src/MyLocation/AFrame-SmartHome-master/patruck/patrick.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="tv"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/TV_01.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="airconModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Air%20conditioner%201.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="dysonModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/scene.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="lightbulbModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Lightbulb.gltf"
              ></a-asset-item>

              <a-asset-item
                response-type="arraybuffer"
                id="wallPartition"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/wallPartition.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="deskDrawerModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskDrawer.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="deskModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/desk.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="deskLectureModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf"
              ></a-asset-item>

              <a-asset-item
                response-type="arraybuffer"
                id="cabinetModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/cabinet_double.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="shelfModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelf.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="shelfDoubleModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelfDouble.gltf"
              ></a-asset-item>

              <a-asset-item
                response-type="arraybuffer"
                id="shelfLowerModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelfLower.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="shelfGlassModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelfGlass.gltf"
              ></a-asset-item>

              <a-asset-item
                response-type="arraybuffer"
                id="lockerModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/locker.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="tableModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/table.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="tableCurvedModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/tableCurved.gltf"
              ></a-asset-item>

              <a-asset-item
                response-type="arraybuffer"
                id="labModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/LabPlan.gltf"
              ></a-asset-item>
              <a-asset-item
                response-type="arraybuffer"
                id="labWall"
                // src="/Lab.gltf"
                src="https://cdn.jsdelivr.net/gh/kittathat123/Bluetooth-frontend/src/MyLocation/AFrame-SmartHome-master/Lab.gltf"
              ></a-asset-item>

              <a-asset-item
                response-type="arraybuffer"
                id="book"
                src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/CHAHIN_NOTEBOOK.gltf"
              ></a-asset-item>

              <a-asset-item
                id="docVRoom"
                src="https://cdn.jsdelivr.net/gh/kittathat123/Bluetooth-frontend/src/MyLocation/AFrame-SmartHome-master/empty_white_room/scene.gltf"
              ></a-asset-item>
            </a-assets>

            <a-entity id="labAll" position="-0.8 0 2.353">
              <a-light
                type="point"
                position="0.214 2.615 -2.02969"
                intensity="0.4"
                distance="10"
                color="white"
                light="castShadow: true"
              ></a-light>

              <a-entity
                static-body={{}}
                id="labWall"
                // gltf-model="#labWall"
                // "https://cdn.jsdelivr.net/gh/kittathat123/Bluetooth-frontend/src/MyLocation/AFrame-SmartHome-master/patruck/patrick.gltf"
                // gltf-model="url(https://cdn.jsdelivr.net/gh/kitwatathat123/Bluetooth-frontend/src/MyLocation/AFrame-SmartHome-master/empty_white_room/scene.gltf)"
                gltf-model="url(https://cdn.jsdelivr.net/gh/kittathat123/Bluetooth-frontend/src/MyLocation/AFrame-SmartHome-master/Lab.gltf)"
                // position={{ x: -4, y: 0.05, z: 0 }}
                position="-4 0.05 0"
                shadow={{ cast: true }}
              />
              <a-entity
                geometry-merger="preserveOriginal: false"
                id="furnitureList"
              >
                {/* HUMAN AVATAR */}
                {/* <a-entity
                id="maleModel"
                scale="0.03 0.03  0.02 "s
                gltf-model="#male"
                // position="0.2,1,-1.3"
                position={`${spherePosition.x},${spherePosition.y},${spherePosition.z}`}
                // position={{
                //   x: this.state.spherePosition.x,
                //   y: this.state.spherePosition.y,
                //   z: this.state.spherePosition.z,
                // }}
              ></a-entity> */}
                <a-entity
                  gltf-model="url(https://cdn.jsdelivr.net/gh/kittathat123/Bluetooth-frontend/src/MyLocation/AFrame-SmartHome-master/patruck/patrick.gltf)"
                  position={`${spherePosition.x} ${spherePosition.y} ${spherePosition.z}`}
                  scale="0.03 0.03  0.02 "
                ></a-entity>

                {/* <a-animation
                  gltf-model="#male"
                  from="0.2 , 1, -1.3"
                  to="0,0,0"
                  dur="3000"
                  repeat="indefinite"
                ></a-animation> */}

                {/* <a-entity
                  id="wallPartition1"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/wallPartition.gltf)"
                  // gltf-model="url(wallPartition)"
                  position="-0.452 0.06 -4.73917"
                />
                <a-entity
                  id="wallPartition2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/wallPartition.gltf)"
                  position="-1.70 0.06 -4.73917"
                />
                <a-entity
                  id="wallPartition3"
                  gltf-model="#url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/wallPartition.gltf)"
                  position="-2.96 0.06 -4.73917"
                />

                <a-entity
                  id="wallPartition4"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/wallPartition.gltf)"
                  rotation="0 90 0"
                  position="0.85898 0.06 -4.57664"
                />2w

                <a-entity
                  id="wallPartition4_2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/wallPartition.gltf)"
                  rotation="0 90 0"
                  position="-1.57857 0.06 -4.78077"
                /> */}

                {/* <a-entity
                  static-body={{}}
                  id="deskLecture1"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="-0.562 0.06 -4.035"
                />
                <a-entity
                  static-body={{}}
                  id="deskLecture2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="-1.762 0.06 -4.035"
                />
                <a-entity
                  static-body={{}}
                  id="deskLecture3"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="-2.96 0.06 -4.035"
                /> */}
                {/* <a-entity
                  static-body={{}}
                  id="deskLectureSec1"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="-0.504 0.06 -2.204"
                  rotation="0 180 0"
                />
                <a-entity
                  static-body={{}}
                  id="deskLectureSec2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="-1.700 0.06 -2.204"
                  rotation="0 180 0"
                />
                <a-entity
                  static-body={{}}
                  id="deskLectureSec3"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="-3.27678 0.06 -2.5328"
                  rotation="0 90 0"
                /> */}

                {/* <a-entity
                  id="desk1"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/desk.gltf)"
                  position="-3.96997 0.06 -3.89812"
                /> */}

                {/* <a-entity
                  id="shelfDouble"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelfDouble.gltf)"
                  position="0.69884 0.06 -2.26737"
                  rotation="0 180 0"
                />
                <a-entity
                  id="shelfDouble2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelfDouble.gltf)"
                  position="-0.50817 0.06 -1.47256"
                  scale="1 0.767 1"
                /> */}
                {/* <a-entity
                  id="deskDrawer"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskDrawer.gltf)"
                  position="2.87312 0.06 -1.55422"
                  rotation="0 -90 0"
                />

                <a-entity
                  id="desk2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/desk.gltf)"
                  position="1.95878 0.06 -2.59495"
                />
                <a-entity
                  id="desk3"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/desk.gltf)"
                  position="1.95878 0.06 -1.5982"
                />
                <a-entity
                  id="desk4"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/desk.gltf)"
                  position="2.95459 0.06 -1.5982"
                />
                <a-entity
                  id="desk5"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/desk.gltf)"
                  position="2.95459 0.06 -2.597"
                /> */}

                {/* <a-entity
                  id="wallPartition5"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/wallPartition.gltf)"
                  position="-1.76589 0.06 -1.52473"
                />
                <a-entity
                  id="wallPartition6"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/wallPartition.gltf)"
                  position="-3.026 0.06 -1.52473"
                /> */}

                {/* <a-entity
                  id="locker"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/locker.gltf)"
                  position="-3.033 0.06 -1.97029"
                  rotation="0 180 0"
                />
                <a-entity
                  id="table1"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/table.gltf)"
                  position="-3.46181 0.06 -0.01224"
                />

                <a-entity
                  id="glassShelf1"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelfGlass.gltf)"
                  position="2.52301 0.06 -0.39101"
                  rotation="0 180 0"
                />
                <a-entity
                  id="glassShelf2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelfGlass.gltf)"
                  position="2.52301 0.93963 -0.39101"
                  rotation="0 180 0"
                />

                <a-entity
                  id="shelf"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelf.gltf)"
                  position="2.44045 0.0572 -4.73446"
                  rotation="0 90 0"
                />

                <a-entity
                  id="deskLecture4"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="2.85751 0.0572   -5.193"
                  rotation="0 90 0"
                />
                <a-entity
                  id="deskLecture5"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="2.85751 0.0572 -6.392"
                  rotation="0 90 0"
                />
                <a-entity
                  id="shelfDouble2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelfDouble.gltf)"
                  position="1.74477 0.0572 -6.73072"
                  rotation="0 -90 0"
                />
                <a-entity
                  id="deskLecture6"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="4.302 0.0572 -5.937"
                  rotation="0 -90 0"
                />
                <a-entity
                  id="deskLecture7"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="4.302 0.0572 -7.13709"
                  rotation="0 -90 0"
                />
                <a-entity
                  id="deskLecture8"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="4.302 0.0572 -8.334"
                  rotation="0 -90 0"
                />

                <a-entity
                  id="deskLecture9"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="-0.38489 0.06 -5.48266"
                  rotation="0 180 0"
                />
                <a-entity
                  id="deskLecture10"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="0.816 0.06 -5.48266"
                  rotation="0 180 0"
                />
                <a-entity
                  id="desk6"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/desk.gltf)"
                  position="-2.62015 0.06 -4.83058"
                />
                <a-entity
                  id="desk7"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/desk.gltf)"
                  position="-3.62075 0.06 -4.89817"
                />

                <a-entity
                  id="table2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/table.gltf)"
                  position="0.23287 0.06 -6.72517"
                  rotation="0 90 0"
                />
                <a-entity
                  id="deskDrawer2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskDrawer.gltf)"
                  position="0.23287 0.06 -7.07459"
                />
                <a-entity
                  id="deskLecture11"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="0.93335 0.06 -8.03954"
                  rotation="0 90 0"
                />
                <a-entity
                  id="desk8"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/desk.gltf)"
                  position="0.23876 0.06 -9.27313"
                />
                <a-entity
                  id="deskLecture12"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="-0.4647 0.06 -9.42722"
                  rotation="0 -90 0"
                />
                <a-entity
                  id="table3"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/table.gltf)"
                  position="0.24367 0.06 -10.22469"
                  rotation="0 180 0"
                />
                <a-entity
                  id="tableCurved"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/tableCurved.gltf)"
                  position="-2.34255 0.06978 -9.15187"
                  rotation="0 -90 0"
                />
                <a-entity
                  id="deskDrawer3"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskDrawer.gltf)"
                  position="-2.76449 0.06978 -5.86523"
                  rotation="0 90 0"
                />

                <a-entity
                  id="deskLecture13"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="-3.03498 0.06978 -6.86704"
                  rotation="0 90 0"
                />

                <a-entity
                  id="deskLecture14"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf)"
                  position="-3.03498 0.06978 -8.076"
                  rotation="0 90 0"
                /> */}
                {/* <a-entity
                  id="cabinet1"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/cabinet_double.gltf)"
                  position="2.1533 0.06978 -7.64441"
                  rotation="0 180 0"
                />

                <a-entity
                  id="cabinet2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/cabinet_double.gltf)"
                  position="1.599 0.06978 -9.19161"
                  rotation="0 -90 0"
                /> */}
                {/* <a-entity
                  id="locker2"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/locker.gltf)"
                  position="3.4194 0.06978 -9.19161"
                  rotation="0 180 0"
                />
                <a-entity
                  id="wallPartition7"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/wallPartition.gltf)"
                  position="3.42816 0.06978 -8.93613"
                /> */}
                {/* <a-entity
                  id="cabinet3"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/cabinet_double.gltf)"
                  position="1.599 0.06978 -9.97823"
                  rotation="0 -90 0"
                /> */}
                {/* <a-entity
                  id="aircon"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Air%20conditioner%201.gltf)"
                  scale="0.0025 0.0025 0.0025"
                  position={{ x: -3.77, y: 2.5, z: -8.3 }}
                  rotation={{ x: 0, y: 90, z: 0 }}
                />
                <a-entity
                  id="aircon"
                  gltf-model="url(https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Air%20conditioner%201.gltf)"
                  scale="0.0025 0.0025 0.0025"
                  position={{ x: -3.77, y: 2.5, z: -3.3 }}
                  rotation={{ x: 0, y: 90, z: 0 }}
                /> */}
              </a-entity>
              {/* <a-entity>
            <Entity 
              id="fan"
              gltf-model="#dysonModel"
              position={{ x: 0.9, y: 0.06, z: -4.3 }}
              scale={{x: 1.0, y: 1.2, z: 1}}
              rotation={{ x: 0, y: 0, z: 0 }}
              animation={{property: "rotation", to: "0 115 0", dir: "alternate", loop: "true", dur: "5000"}}
              />
            <a-gui-button
              id="fanButton"
              width="0.75" height="0.25" 
              position="0.9 1.33 -4.4"
              // onClick="  "
              value="Toggle Fan"
              font-family="Arial"
              font-size="30px"
              margin="0 0 0.05 0">
            </a-gui-button>
          </Entity> */}
              {/* <Device></Device> */}
              {/* <DynamicObject></DynamicObject> */}
            </a-entity>
          </a-scene>
        </div>
      </div>
    );
  }
}

export default docVRoom;
