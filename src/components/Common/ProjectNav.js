import React from "react";
import { NavLink } from "react-router-dom";
import DetailsModal from "./DetailsModal";
import Sidebar from "./Sidebar";
import axios from "axios";

let loggedUser, loggedId;

function getUserid() {
  axios
    .request({
      method: "get",
      url: "/api/auth/show/current"
    })
    .then(response => {
      loggedId = response.data;
    })
    .catch(error => {
      // User is not logged in
      window.location.href = "http://localhost:3000/signin";
    });
  return loggedId;
}

let userName = userid => {
  axios
    .request({
      method: "get",
      url: "/api/users/name/" + userid
    })
    .then(response => {
      loggedUser = response.data.Fname;
      // this.members.push(response.data.Fname);
    })
    .catch(error => {
      console.log(error);
    });
  return loggedUser;
};

const ProjectNav = props => {
  getUserid();
  userName(loggedId);
  const style = {
    height: "30px; !important"
  };
  let sidebar, icon, details, quickadd;

  if (props.sidebar) {
    sidebar = (
      <nav>
        <Sidebar projectid={loggedId} />
      </nav>
    );
    icon = (
      <div className="float-left">
        <a data-activates="slide-out" className="button-collapse">
          <i className="fa fa-bars" />
        </a>
      </div>
    );
  }
  if (props.details) {
    details = (
      <li className="nav-item">
        <a className="nav-link" data-toggle="modal" data-target="#detailsModal">
          <i className="fa fa-info-circle fa-lg" />
          <span className="clearfix d-none d-sm-inline-block">Details</span>
        </a>
      </li>
    );
  }
  if (props.quickadd === "New Project") {
    quickadd = (
      <li className="nav-item">
        <a
          className="nav-link"
          data-toggle="modal"
          data-target="#createProjectModal"
        >
          <i className="fa fa-plus-circle fa-lg" />
          <span className="clearfix d-none d-sm-inline-block">
            {props.quickadd}
          </span>
        </a>
      </li>
    );
  } else {
    quickadd = (
      <li className="nav-item">
        <a
          className="nav-link"
          data-toggle="modal"
          data-target="#quickAddModal"
        >
          <i className="fa fa-plus-circle fa-lg" />
          <span className="clearfix d-none d-sm-inline-block">
            {props.quickadd}
          </span>
        </a>
      </li>
    );
  }
  return (
    <div>
      <header>
        {/**Side Nav */}
        {sidebar}
        {/*Main navbar*/}
        <nav
          className="navbar fixed-top navbar-toggleable-md navbar-expand-lg scrolling-navbar double-nav blue darken-3"
          style={style}
        >
          {icon}
          <div className="breadcrumb-dn mr-auto">
            <span to="#!" className="ml-2">
              <strong>ProjectWatchdog</strong>
            </span>
          </div>
          <ul className="nav navbar-nav nav-flex-icons ml-auto">
            <form
              className="waves-light wave-effects form-inline search-form mb-0 d-none d-md-inline-block py-0"
              role="search"
            >
              <span className="form-group ">
                <input
                  id="searchField"
                  type="text"
                  className="form-control text-white"
                  placeholder="Search Projects"
                  aria-label="Search"
                />
                <i
                  className="fa fa-search fa-lg text-white "
                  aria-hidden="true"
                />
              </span>
            </form>
            {quickadd}
            <li className="nav-item active">
              <NavLink to={"/projects?id=" + loggedId} className="nav-link">
                <i className="fa fa-home fa-lg" />
                <span className="clearfix d-none d-sm-inline-block">
                  Projects
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className="fa fa-bell fa-lg" />
                <span className="clearfix d-none d-sm-inline-block">
                  Notification
                  <span className="badge red pull-right ml-1">5</span>
                </span>
              </a>
            </li>
            {details}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="navbardrop"
                data-toggle="dropdown"
              >
                <i className="fa fa-user-circle fa-lg" />
                {loggedUser}
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#!">
                  <i className="fa fa-gear" aria-hidden="true" /> Settings
                </a>
                <a className="dropdown-item" href="#!">
                  <i className="fa fa-id-card-o" aria-hidden="true" /> Profile
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" onClick={() => props.onLogout()}>
                  <i className="fa fa-sign-out fa-sm fa-fw" />Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <DetailsModal />
    </div>
  );
};

export default ProjectNav;
