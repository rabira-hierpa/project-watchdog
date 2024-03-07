import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import DetailsModal from "./DetailsModal";
import Sidebar from "./Sidebar";

class ProjectNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      id: "",
      error: "",
    };
    this.keyword = "";
  }

  componentDidMount() {
    this.setState({
      username: this.props.authState?.user?.Fname,
      id: this.props.authState?.user?._id,
    });
  }

  onChange(e) {
    this.keyword = e.target.value;
  }
  onSubmit(e) {
    if (this.keyword !== "") {
      this.props.navigate(
        `/search?id=${new URLSearchParams(this.props.location.search).get(
          "id"
        )}&keyword=${this.keyword}`
      );
    }
    e.preventDefault();
  }
  render() {
    const style = {
      height: "30px; !important",
    };
    let sidebar, icon, details, quickadd, projects;

    if (this.props.sidebar) {
      sidebar = (
        <nav>
          <Sidebar id={this.state.id} projectid={this.props.projectid} />
        </nav>
      );
      icon = (
        <div className="float-left">
          <a href="#!" data-activates="slide-out" className="button-collapse">
            <i className="fa fa-bars" />
          </a>
        </div>
      );
    }
    if (this.props.details) {
      details = (
        <li className="nav-item">
          <a
            href="#!"
            className="nav-link"
            data-toggle="modal"
            data-target="#detailsModal"
          >
            <i className="fa fa-info-circle fa-lg" title="Details" />
            <span className="clearfix d-none d-sm-inline-block">Details</span>
          </a>
        </li>
      );
    }
    if (this.props.quickadd === "New Project") {
      quickadd = (
        <li className="nav-item">
          <a
            href="#!"
            className="nav-link"
            data-toggle="modal"
            data-target="#createProjectModal"
          >
            <i className="fa fa-plus-circle fa-lg" />
            <span className="clearfix d-none d-sm-inline-block">
              {this.props.quickadd}
            </span>
          </a>
        </li>
      );
    } else if (this.props.quickadd === "") {
      quickadd = null;
    } else {
      quickadd = (
        <li className="nav-item">
          <span
            className="nav-link"
            data-toggle="modal"
            data-target="#quickAddModal"
          >
            <i className="fa fa-plus-circle fa-lg" />
            <span className="clearfix d-none d-sm-inline-block">
              {this.props.quickadd}
            </span>
          </span>
        </li>
      );
    }
    if (this.props.projects) {
      projects = (
        <li className="nav-item active">
          <a href={"/projects?id=" + this.state.id} className="nav-link">
            <i className="fa fa-home fa-lg" title="Projects" />
            <span className="clearfix d-none d-sm-inline-block">Projects</span>
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
                <strong>Project Watchdog</strong>
              </span>
            </div>
            <ul className="nav navbar-nav nav-flex-icons ml-auto">
              <form
                className="waves-light wave-effects form-inline search-form mb-0 d-none d-md-inline-block py-0"
                role="search"
                onSubmit={this.onSubmit.bind(this)}
              >
                <input
                  id="searchField"
                  type="text"
                  className="form-control text-white"
                  placeholder="Search Projects"
                  aria-label="Search"
                  onChange={this.onChange.bind(this)}
                />
                <i
                  className="fa fa-search fa-lg text-white "
                  aria-hidden="true"
                  onClick={this.onSubmit.bind(this)}
                />
              </form>
              {quickadd}
              {projects}
              {/*<li className="nav-item">
                <a className="nav-link">
                  <i className="fa fa-bell fa-lg" />
                  <span className="clearfix d-none d-sm-inline-block">
                    Notification
                    <span className="badge red pull-right ml-1">5</span>
                  </span>
                </a>
              </li>*/}
              {details}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="navbardrop"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-user-circle fa-lg" />
                  {this.state.username}
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#!">
                    <i className="fa fa-gear" aria-hidden="true" /> Settings
                  </a>
                  <a className="dropdown-item" href="#!">
                    <i className="fa fa-id-card-o" aria-hidden="true" /> Profile
                  </a>
                  <div className="dropdown-divider" />
                  <span
                    className="dropdown-item"
                    onClick={() => this.props.onLogout()}
                  >
                    <i className="fa fa-sign-out fa-sm fa-fw" />
                    Logout
                  </span>
                </div>
              </li>
            </ul>
          </nav>
        </header>
        <DetailsModal />
      </div>
    );
  }
}

export default ProjectNav;
