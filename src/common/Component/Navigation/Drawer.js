import React from "react";
import ReactDOM from "react-dom";

import "./Drawer.css";

function Drawer(props) {
  const content = (
    <aside
      className={`drawer ${props.show ? "show-drawer" : ""}`}
      onClick={props.onClick}
    >
      {props.children}
    </aside>
  );
  return ReactDOM.createPortal(content, document.getElementById("drawer"));
}

export default Drawer;
