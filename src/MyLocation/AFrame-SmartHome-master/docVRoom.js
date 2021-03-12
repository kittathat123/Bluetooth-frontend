import React, { Component } from "react";
// import "https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome@v1.3/fanToggle.js";

class docVRoom extends Component {
  render() {
    return (
      <div>
        <div style={{ height: "500px", width: "700px" }}>
          <a-scene
            environment
            physics="gravity: -1.6"
            renderer="antialias: true"
            vr-mode-ui="enabled: false"
            embedded
          >
            {/* <a-mixin
              id="teleport"
              teleport-controls="type: parabolic; cameraRig: #cameraRig; button: trigger;"
            ></a-mixin> */}
            <a-entity id="cameraRig">
              <a-entity camera position="0 1.6 0" wasd-controls look-controls>
                <a-cursor></a-cursor>
              </a-entity>
              {/* <a-entity
                id="rightHand"
                static-body="shape: sphere; sphereRadius: 0.02;"
                vive-controls="hand: right"
                sphere-collider="objects: .throwable"
                grab
                oculus-touch-controls="hand: right"
              ></a-entity>
              <a-entity
                id="leftHand"
                controller-cursor
                oculus-touch-controls="hand: left"
              ></a-entity> */}
            </a-entity>
            {/* terrain */}
            <a-box
              width="75"
              height="0.1"
              depth="75"
              static-body
              visible="false"
            ></a-box>
            <a-assets>
              <a-asset-item
                id="tv"
                src="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome@v1.3/TV_01.gltf"
              ></a-asset-item>
              <a-asset-item
                id="fanModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome@v1.3/540%20Ceiling%20Fan.gltf"
              ></a-asset-item>
              <a-asset-item
                id="airconModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome@v1.3/Air%20conditioner%201.gltf"
              ></a-asset-item>
              <a-asset-item
                id="dysonModel"
                src="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome/scene.gltf"
              ></a-asset-item>

              <a-asset-item
                id="lab"
                ร
                src="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome@v1.7/LabPlan.gltf"
              ></a-asset-item>
            </a-assets>
            {/* Lab GTLF */}
            <a-entity id="labAll" position="0 0 3.75">
              <a-entity gltf-model="#lab" position="-4 0.1 0"></a-entity>

              {/* Ceiling Light */}
              <a-light
                type="point"
                color="orange"
                position="0.10983 1.98602 -5.35577"
                intensity="0.2"
                light="castShadow: true"
              ></a-light>

              {/* Furniture */}
              <a-entity
                gltf-model="#tv"
                position="3.466 0.85 -1.25"
                rotation="0 -140 0"
                radius="0.5"
                height="1.5"
                color="#FFC65D"
                scale="0.06 0.06 0.06"
                event-set__enter="_event: mouseenter; _target: #tvText; visible: true"
                event-set__leave="_event: mouseleave; _target: #tvText; visible: false"
              >
                <a-text
                  id="tvText"
                  value="This is a smart tv"
                  align="center"
                  color="#FFF"
                  visible="false"
                  position="15 5 0.55"
                  scale="10 10 10"
                  geometry="primitive: plane; width: 1.75"
                  material="color: #333"
                ></a-text>
              </a-entity>

              <a-entity>
                <a-entity
                  id="fan"
                  gltf-model="#dysonModel"
                  position="0.9 0 -4.3"
                  rotation="0 0 0"
                  animation="property: rotation; to: 0 115 0; dir: alternate; loop: true; dur: 2000; startEvents:rotation-begin; pauseEvents: rotation-pause; resumeEvents: rotation-resume;"
                ></a-entity>

                {/* <a-gui-button
                  id="fanButton"
                  width="0.75"
                  height="0.25"
                  position="0.9 1.1 -4.4"
                  onclick="turnOffFan"
                  value="Toggle Fan"
                  font-family="Arial"
                  font-size="30px"
                  margin="0 0 0.05 0"
                ></a-gui-button> */}
              </a-entity>

              <a-entity
                id="aircon"
                gltf-model="#airconModel"
                position="-3.77 2.5 -8.3"
                scale="0.0025 0.0025 0.0025"
                rotation="0 90 0"
              ></a-entity>

              {/* <a-entity
                id="aircon2"
                gltf-model="#airconModel"
                position="-3.77 2.5 -3.3"
                scale="0.0025 0.0025 0.0025"
                rotation="0 90 0"
              >
                <a-text
                  id="airTemp"
                  value="24"
                  align="center"
                  color="#1fff2e"
                  visible="true"
                  position="0 -40 4"
                  scale="130 130 130"
                  geometry="primitive: plane; width: 1.75; height:0.26"
                  material="color: #333"
                ></a-text>

                <a-gui-slider
                  scale="240 240 240"
                  position="0 -240 55"
                  width="2.15"
                  height="0.75"
                  onclick="testSliderAction"
                  percent="0.29"
                  margin="0 0 0.05 0"
                ></a-gui-slider>
              </a-entity> */}

              {/* <a-sphere
                class="throwable"
                dynamic-body
                position="0 2.4 0"
                radius="0.10"
                color="green"
              ></a-sphere> */}
            </a-entity>
          </a-scene>
        </div>
      </div>
    );
  }
}

export default docVRoom;
