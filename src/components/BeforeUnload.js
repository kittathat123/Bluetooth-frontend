import { event } from "jquery";
import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    Fragment
} from "react";

export default function BeforeUnload(props) {
    console.log("(BeforeUnload.js) Props : ", props.active);

    useEffect(() => {
        if(!props.active) return;
        const handle = event => event.preventDefault();
        window.addEventListener("beforeunload", handle);
        return () => {
          window.removeEventListener("beforeunload", handle);
        };
      }, [props]);

    var alertMessage = (event) => {
        alert("test");
        if(props.active) {
            event.preventDefault();
            console.log("(BeforeUnload.js) alertMessage");
            return true;
        }
    }

    return React.Children.only(props.children);
}