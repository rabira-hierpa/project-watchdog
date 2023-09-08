import axios from "axios";
import React, { Component } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      projects: [],
      userId: "",
    };
    this.quickadd = "Quick Add";
  }

  UNSAFE_componentWillMount() {
    this.getUserid();
  }

  componentDidMount() {
    this.getAllProjects();
  }

  // Get the id of the logged in user
  getUserid() {
    axios
      .request({
        method: "get",
        url: "/api/auth/show/current",
      })
      .then((response) => {
        this.user = response.data;
        this.setState({
          userId: response.data,
        });
      })
      .catch((error) => {
        // User is not logged in
        window.location.href = "http://localhost:3000/signin";
      });
  }
  // Logout and reset the cookie session
  onLogout() {
    axios
      .request({
        method: "get",
        url: "/api/auth/logout",
      })
      .then((response) => {
        console.log(response.data);
        window.location = "http://localhost:3000/";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Get all incomplete projects
  getAllProjects() {
    axios
      .request({
        method: "get",
        url: "/api/projects",
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          projects: response.data,
        });
      })
      .catch((error) => {
        // User is not logged in
        window.location.href = "http://localhost:3000/signin";
      });
  }

  render() {
    let allProjects;
    if (this.state.projects.length > 0) {
      allProjects = this.state.projects.map((project, index) => (
        <tr key={index}>
          <th scope="row"> {index + 1}</th>
          <td>{project.ProjectTitle}</td>
          <td>{project.Member.length}</td>
          <td>{new Date(project.DeadLine).toString().substr(0, 10)}</td>
          <td>{project.Progress + "%"}</td>
          <td>
            <span>
              <a
                href="#!"
                type="button"
                id="editBtn"
                className="btn btn-sm btn-outline-danger btn-rounded"
                title="Block Project"
              >
                <i className="fa fa-ban" aria-hidden="true" /> Block
              </a>
            </span>
          </td>
        </tr>
      ));
    }
    return (
      <div>
        <ProjectNav
          quickadd=""
          sidebar={false}
          details={false}
          projects={false}
          onLogout={this.onLogout.bind(this)}
          id={this.state.id}
          projectid={new URLSearchParams(this.props.location.search).get("id")}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title="Admin Dashboard" />
            <br />
            <div className="row justify-content-center ">
              <div className="row justify-content-center">
                <div className="col-lg-5" />
              </div>
              <div className="col-lg-8 m-auto">
                <table className="table table-hover">
                  <thead className="blue darken-3 text-white">
                    <tr>
                      <th scope="col"> #No </th>
                      <th scope="col">
                        <i className="fa fa-list pr-2" aria-hidden="true" />{" "}
                        Title
                      </th>
                      <th scope="col">
                        <i
                          className="fa fa-user-circle-o pr-2"
                          aria-hidden="true"
                        />{" "}
                        Members
                      </th>
                      <th scope="col">
                        <i className="fa fa-calendar pr-2" aria-hidden="true" />{" "}
                        Deadline
                      </th>
                      <th scope="col"> % Progress </th>
                      <th scope="col">
                        <i className="fa fa-edit pr-2" aria-hidden="true" />{" "}
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>{allProjects}</tbody>
                </table>
                <div className="row" />
              </div>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

export default AdminDashboard;
