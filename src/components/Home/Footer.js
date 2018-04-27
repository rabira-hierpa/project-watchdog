import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="page-footer center-on-small-only stylish-color-dark bg-indigo">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="title mb-4 mt-3 font-bold">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <hr className="clearfix w-100 d-md-none" />
          <div className="col-md-2 mx-auto">
            <h5 className="title mb-4 mt-3 font-bold">Links</h5>
            <ul>
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 2</a>
              </li>
              <li>
                <a href="#!">Link 3</a>
              </li>
              <li>
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </div>
          <hr className="clearfix w-100 d-md-none" />
          <div className="col-md-2 mx-auto">
            <h5 className="title mb-4 mt-3 font-bold">Links</h5>
            <ul>
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 2</a>
              </li>
              <li>
                <a href="#!">Link 3</a>
              </li>
              <li>
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </div>
          <hr className="clearfix w-100 d-md-none" />
          <div className="col-md-2 mx-auto">
            <h5 className="title mb-4 mt-3 font-bold ">Links</h5>
            <ul>
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 2</a>
              </li>
              <li>
                <a href="#!">Link 3</a>
              </li>
              <li>
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="call-to-action">
        <ul>
          <li>
            <h5 className="mb-1">Register now for free</h5>
          </li>
          <li>
            <a href="signup.html" className="btn btn-rounded btn-red">
              <i className="fa fa-sign-in fa-sm" />
              Sign up!
            </a>
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
          <li>
            <a className="btn-floating btn-sm btn-dribbble">
              <i className="fa fa-dribbble" />
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
