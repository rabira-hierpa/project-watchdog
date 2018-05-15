import React from "react";
// import { NavLink } from "react-router-dom";

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
        <li className="">
          <hr className="white" />
        </li>
        <ul className="nav flex-column">
          <li className="nav-item waves-effect waves-light">
            <a
              href={"/dashboard?id=" + props.projectid}
              className="nav-link no-pl active text-white"
            >
              <i
                className="fa fa-tachometer fa-lg mr-4 ml-3"
                aria-hidden="true"
              />
              Dashboard
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a
              href={"/milestones?id=" + props.projectid}
              className="nav-link no-pl text-white"
            >
              <i className="fa fa-compass fa-lg mr-4 ml-3" aria-hidden="true" />
              Milestone
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a
              href={"/tasks?id=" + props.projectid}
              className="nav-link no-pl text-white"
            >
              <i className="fa fa-list fa-lg mr-4 ml-3" aria-hidden="true" />
              Tasks
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a
              href={"/progress?id=" + props.projectid}
              className="nav-link no-pl text-white"
            >
              <i
                className="fa fa-line-chart fa-lg mr-4 ml-3"
                aria-hidden="true"
              />
              Progress
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a
              href={"/chat?id=" + props.projectid}
              className="nav-link no-pl text-white"
            >
              <i
                className="fa fa-comments fa-lg mr-4 ml-3"
                aria-hidden="true"
              />
              Chat
            </a>
          </li>

          <li className="nav-item waves-effect waves-light">
            <a
              href={"/files?id=" + props.projectid}
              className="nav-link no-pl text-white"
            >
              <i
                className="fa fa-paperclip fa-lg mr-4 ml-3"
                aria-hidden="true"
              />
              Project Files
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a
              href={"/schedule?id=" + props.projectid}
              className="nav-link no-pl text-white"
            >
              <i
                className="fa fa-calendar fa-lg mr-4 ml-3"
                aria-hidden="true"
              />
              Schedule
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a
              href={"/repository?id=" + props.projectid}
              className="nav-link no-pl text-white"
            >
              <i className="fa fa-archive fa-lg mr-4 ml-3" aria-hidden="true" />
              Archive
            </a>
          </li>
          <li className="nav-item waves-effect waves-light">
            <a
              href={"/history?id=" + props.projectid}
              className="nav-link no-pl text-white"
            >
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
