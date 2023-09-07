import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light unique-color">
      <NavLink to="/" className="navbar-brand text-white">
        <img
          src="./img/logo.png"
          alt="Project Watchdog"
          className="img-fluid ml-2"
          style={{
            height: "50px",
            width: "100px",
          }}
        />
      </NavLink>
      <button
        className="navbar-toggler text-white"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse mb-0"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item" />
        </ul>
        <NavLink to="/signin" className="btn btn-md btn-indigo text-white">
          <i className="fa fa-lock" aria-hidden="true" />
          <span className="pl-1">Log In</span>
        </NavLink>
        <NavLink to="/signup" className="btn btn-md  btn-green text-white">
          <i className="fa fa-sign-in" aria-hidden="true" />
          <span className="pl-1">Sign Up </span>
        </NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
