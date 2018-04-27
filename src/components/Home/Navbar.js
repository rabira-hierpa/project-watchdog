import React from "react";
const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <a className="navbar-brand text-white" href="/">
        ProjectWatchdog
      </a>
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
        <a href="/signin" className="btn btn-md btn-indigo text-white">
          <i className="fa fa-lock" aria-hidden="true" />
          <span className="pl-1">Log In</span>
        </a>
        <a href="/signup" className="btn btn-md  btn-green text-white">
          <i className="fa fa-sign-in" aria-hidden="true" />
          <span className="pl-1">Sign Up </span>
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
