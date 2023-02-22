import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";
import Backdrop from "../UIElements/Backdrop";
import Drawer from "./Drawer";

function MainNavigation() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const openDrawerHandler = () => {
    setOpenDrawer(true);
  };
  const closeDrawerHandler = () => {
    setOpenDrawer(false);
  };
  return (
    <>
      {openDrawer && <Backdrop onClick={closeDrawerHandler} />}
      <Drawer show={openDrawer} onClick={closeDrawerHandler}>
        <nav className="main-navigation_drawer-nav">
          <NavLinks />
        </nav>
      </Drawer>
      <MainHeader>
        <button
          className="main-navigation_menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation_title">
          <Link to="/">Book Review</Link>
        </h1>
        <nav className="main-navigation_des-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}

export default MainNavigation;
