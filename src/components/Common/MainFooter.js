import React from "react";
import { NavLink } from "react-router-dom";

const MainFooter = (props) => {
  return (
    <footer className="container-fluid">
      <div className="row">
        <div className="col-md-12 blue-gradient justify-content-center">
          <div className="footer-copyright m-3">
            <div className="container-fluid text-center text-white">
              © 2018 Copyright:
              <NavLink to="/" className="text-white">
                ProjectWatchdog.com
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
