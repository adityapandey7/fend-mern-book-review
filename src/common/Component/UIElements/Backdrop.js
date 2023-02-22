import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

function Backdrop(props) {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}>
      {props.children}
    </div>,
    document.getElementById("backDrop")
  );
}

export default Backdrop;
