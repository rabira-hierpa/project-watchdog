import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = props => {
  return (
    <div id="slide-out" className="blue darken-3 side-nav">
      <ul className="custom-scrollbar list-unstyled">
        <li>
          <div className="logo-wrapper waves-light text-center">
            <div className="" />
            <a href="/" className="flex-center text-white">
              <i className="fa fa-slack fa-2x" aria-hidden="true" />
              <div className=""> ProjectWatchdog</div>
            </a>
          </div>
        </li>
        <li className="mt-4">
          <form className="search-form" role="search">
            <div className="form-group waves-light ">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
          </form>
        </li>
        <ul className="nav flex-column">
          <li className="nav-item waves-effect waves-light">
            <NavLink
              to={"/projects?id=" + props.projectid}
              className="nav-link no-pl active text-white"
            >
              <i
                className="fa fa-tachometer fa-lg mr-4 ml-3"
                aria-hidden="true"
              />
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a href="/progress" className="nav-link no-pl text-white">
              <i
                className="fa fa-line-chart fa-lg mr-4 ml-3"
                aria-hidden="true"
              />
              Progress
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a href="/chat" className="nav-link no-pl text-white">
              <i
                className="fa fa-comments fa-lg mr-4 ml-3"
                aria-hidden="true"
              />
              Chat
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a href="/milestones" className="nav-link no-pl text-white">
              <i className="fa fa-compass fa-lg mr-4 ml-3" aria-hidden="true" />
              Milestone
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a href="/files" className="nav-link no-pl text-white">
              <i
                className="fa fa-paperclip fa-lg mr-4 ml-3"
                aria-hidden="true"
              />
              Attached Files
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a href="/schedule" className="nav-link no-pl text-white">
              <i
                className="fa fa-calendar fa-lg mr-4 ml-3"
                aria-hidden="true"
              />
              Schedule
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a href="/history" className="nav-link no-pl text-white">
              <i className="fa fa-clock-o fa-lg mr-4 ml-3" aria-hidden="true" />
              History
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a href="/" className="nav-link no-pl text-white">
              <i
                className="fa fa-sign-out fa-lg mr-4 ml-3"
                aria-hidden="true"
              />
              <span className="text-red">Logout</span>
            </a>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Sidebar;
