import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";

import "./Modal.css";

const ModalOverlay = (props) => {
  // function handleOnSubmit(event) {
  //   event.preventDefault();
  // }
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal_header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal_content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal_footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

function Modal(props) {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {props.show && <ModalOverlay {...props} />}
    </>
  );
}

export default Modal;
