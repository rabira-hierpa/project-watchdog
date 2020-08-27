import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="page-footer center-on-small-only stylish-color-dark bg-indigo">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="title mb-4 mt-3 font-bold">
              <img
                src="./img/logo.png"
                alt="Project Watchdog"
                className="img-fluid"
              />
            </h5>
            <p>A project managment system for Addis Ababa University</p>
          </div>
          <hr className="clearfix w-100 d-md-none" />
          <div className="col-md-2 mx-auto">
            <h5 className="title mb-4 mt-3 font-bold">Useful Links</h5>
            <ul>
              <li>
                <a href="#!">FAQ</a>
              </li>
              <li>
                <a href="#!">Support</a>
              </li>
              <li>
                <a href="#!">Contact Us</a>
              </li>
              <li>
                <a href="#!">About Us</a>
              </li>
            </ul>
          </div>
          <hr className="clearfix w-100 d-md-none" />
          <div className="col-md-2 mx-auto" />
          <hr className="clearfix w-100 d-md-none" />
          <div className="col-md-2 mx-auto" />
        </div>
      </div>
      <hr />
      <div className="call-to-action">
        <ul>
          <li>
            <h5 className="mb-1">Register now for free</h5>
          </li>
          <li>
            <NavLink to="signup" className="btn btn-rounded btn-red">
              <i className="fa fa-sign-in pr-2" />
              Sign up!
            </NavLink>
          </li>
        </ul>
      </div>
      <hr />
      <div className="social-section text-center">
        <ul>
          <li>
            <a className="btn-floating btn-sm btn-fb">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a className="btn-floating btn-sm btn-tw">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a className="btn-floating btn-sm btn-gplus">
              <i className="fa fa-google-plus" />
            </a>
          </li>
          <li>
            <a className="btn-floating btn-sm btn-li">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-copyright">
        <div className="container-fluid">
          © 2018 Copyright:
          <NavLink to="/">ProjectWatchdog</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
