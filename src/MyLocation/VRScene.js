import "aframe";
import "aframe-particle-system-component";
import { Entity, Scene } from "aframe-react";
import React from "react";
import ReactDOM from "react-dom";

class VRScene extends React.Component {
  render() {
    return (
      // <div style={{ height: "500px", width: "500px" }}>
      //   <a-scene embeded>
      //     <a-entity
      //       geometry="primitive: box"
      //       material=" color: red"
      //       position=" x: 0, y: 0, z: -5 "
      //     />
      //     <a-entity particle-system={{ preset: "snow" }} />
      //     <a-entity light={{ type: "point" }} />
      //     <a-entity gltf-model={{ src: "virtualcity.gltf" }} />
      //     <a-entity text={{ value: "Hello, WebVR!" }} />
      //   </a-scene>
      // </div>

      /* Example 3D A Frame */
      <div style={{ height: "500px", width: "600px" }}>
        <a-scene vr-mode-ui="enabled: false" embedded>
          {/* <a-entity model="./LabPlan.gltf" position="0 0 0"></a-entity> */}

          <a-gltf-model src="LabPlan.gltf" position="0 0 0"></a-gltf-model>
          <a-entity
            geometry="primitive: box"
            position="-1 0.5 -3"
            rotation="0 45 0"
            material="color: #4CC3D9"
          />
          <a-entity
            geometry="primitive: sphere; radius: 1.25;"
            position="0 1.25 -5"
            material="color: #EF2D5E"
          />
          <a-entity
            geometry="primitive: cylinder; radius: 0.5, height: 1.5"
            position="1 0.75 -3"
            material="color: #FFC65D"
          />
          <a-entity
            geometry="primitive: plane; width: 4; height: 4"
            position="0 0 -4"
            rotation="-90 0 0"
            material="color: #7BC8A4"
          />
        </a-scene>
      </div>
    );
  }
}

// ReactDOM.render(<VRScene />, document.querySelector("#sceneContainer"));
export default VRScene;
