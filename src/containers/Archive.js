import axios from "axios";
import React, { PureComponent } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";
import ArchiveTemplate from "../components/Archive/ArchiveTemplate";
class Archive extends PureComponent {
  constructor(props) {
    super(props);
    this.quickadd = "New Project";
    this.title = "Project Repository";
    this.state = {
      projects: [],
      userId: "",
      searchTerm: "",
      error: false,
      erro_mesg: "",
    };
  }

  UNSAFE_componentWillMount() {
    this.getUserid();
  }

  // Get the id of the logged in user
  getUserid() {
    axios
      .request({
        method: "get",
        url: "/api/auth/show/current",
      })
      .then((response) => {
        this.setState({
          userId: response.data._id,
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

  componentDidMount() {
    this.getArchiveProjects();
  }

  // Get all the projects from the archive
  getArchiveProjects() {
    axios
      .request({
        method: "get",
        url: "/api/archive",
      })
      .then((response) => {
        this.setState({
          projects: response.data,
          error: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again.",
        });
        console.log(error);
      });
  }

  searchHandler(e) {
    this.setState({
      searchTerm: e.target.value,
    });
    e.preventDefault();
  }

  render() {
    let allprojects, errorMsg, search;
    if (this.state.error === false && this.state.projects.length > 0) {
      allprojects = this.state.projects
        .filter(searchArchive(this.state.searchTerm))
        .map((project, index) => {
          return (
            <ArchiveTemplate
              key={project._id}
              title={project.Title}
              description={project.Description}
              filelocation={project.FileLocation}
              date={project.UploadDate}
              // clicked={() => this.viewProject(index)}
            />
          );
        });
      search = (
        <div className="col-lg-6 col-lg-offset-3">
          <div className="input-group md-form form-sm">
            <input
              id="searchField"
              type="text"
              className="form-control form-control-md text-center "
              placeholder="Search Archive"
              aria-label="Search"
              onChange={this.searchHandler.bind(this)}
            />
            <div className="input-group-append">
              <span className="form-inline">
                <i
                  className="fa fa-search fa-lg text-primary"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      errorMsg = this.state.erro_mesg;
      allprojects = errorMsg;
      console.log(errorMsg);
    }
    return (
      <div>
        <ProjectNav
          quickadd=""
          sidebar={true}
          details={true}
          id={this.state.id}
          projects={true}
          onLogout={this.onLogout.bind(this)}
          projectid={new URLSearchParams(this.props.location.search).get("id")}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title="Project Repository" />
            <br />
            <div className="row justify-content-center ">
              {search}
              <div className="col-md-10 m-auto">
                <div className="row"> {allprojects} </div>
              </div>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

function searchArchive(term) {
  return function (x) {
    return (
      x.Title.toLowerCase().includes(term.toLowerCase()) ||
      x.Description.toLowerCase().includes(term.toLowerCase()) ||
      !term
    );
  };
}

export default Archive;
