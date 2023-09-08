import axios from "axios";
import React, { PureComponent } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import MainFooter from "../components/Common/MainFooter";
import PageHeader from "../components/Common/PageHeader";
import ProjectTemplate from "../components/Projects/ProjectTemplate";
import CreateProject from "../components/Projects/CreateProject";

class Projects extends PureComponent {
  constructor(props) {
    super(props);
    this.user = "";
    this.userName = "";
    this.quickadd = "New Project";
    this.title = "My Projects";
    this.state = {
      projects: [],
      erro_mesg: "",
      error: false,
      id: "",
    };
  }

  // Called when the component is ready to be mounted
  UNSAFE_componentWillMount() {
    this.getUserid();
    this.getUserName();
  }

  // Called when the component is already mounted
  componentDidMount() {
    this.getUserProjects();
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
          id: response.data,
        });
      })
      .catch((error) => {
        // User is not logged in
        window.location.href = "http://localhost:3000/signin";
      });
  }

  // Get fname of a user
  getUserName() {
    axios
      .request({
        method: "get",
        url:
          "/api/users/name/" +
          new URLSearchParams(this.props.location.search).get("id"),
      })
      .then((response) => {
        this.userName = response.data.Fname;
        // this.members.push(response.data.Fname);
      })
      .catch((error) => {
        console.log(error);
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
        window.location.href = "http://localhost:3000/";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Get projects of a user
  getUserProjects() {
    this.user = new URLSearchParams(this.props.location.search).get("id");
    // console.log(this.user);
    axios
      .request({
        method: "get",
        url: "/api/projects/user/" + this.user,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          projects: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again",
        });
        console.log(error);
      });
  }

  addNewProject(newProject) {
    axios
      .request({
        method: "post",
        url: "/api/projects/",
        data: {
          ProjectTitle: newProject.title,
          ProjectDescription: newProject.desc,
          DeadLine: newProject.deadline,
          Leader: newProject.leader,
          Member: newProject.member,
        },
      })
      .then((response) => {
        // console.log(response.data);
        let allprojects = [...this.state.projects];
        allprojects.push(response.data);
        this.setState({
          projects: allprojects,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again",
        });
        console.log(error);
      });
  }
  render() {
    let allprojects, errorMsg;
    if (this.state.projects.length > 0 && this.state.error === false) {
      allprojects = this.state.projects.map((project) => {
        return (
          <ProjectTemplate
            key={project._id}
            id={project._id}
            title={project.ProjectTitle}
            description={project.ProjectDescription}
            startDate={project.StartDate}
            deadline={project.DeadLine}
            progress={project.Progress}
            members={project.Member}
          />
        );
      });
    } else if (this.state.projects.length === 0) {
      allprojects = (
        <div className="col-lg-12 text-center my-5 text-primary h6">
          <img className="img-fluid" src="./img/beach1.png" alt="Desert" />
          <div className="my-3">
            You currently have no projects created.Creat a new project by
            clicking on New project in the navigation pane
          </div>
        </div>
      );
    } else {
      errorMsg = this.state.erro_mesg;
      allprojects = (
        <div className="col-lg-12 text-center my-5 text-primary h6">
          <img
            className=""
            src="./img/noConnection.png"
            height="600px"
            alt="Desert"
          />
          <div className="my-3">We run into a problem. Please try again</div>
        </div>
      );
      console.log(errorMsg);
    }
    return (
      <div>
        <ProjectNav
          quickadd={this.quickadd}
          sidebar={false}
          details={false}
          id={this.state.id}
          onLogout={this.onLogout.bind(this)}
          {...this.props}
        />
        <CreateProject
          title="New Project"
          leader_id={new URLSearchParams(this.props.location.search).get("id")}
          onNewProject={this.addNewProject.bind(this)}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title={this.title} /> <br />
            <div className="row justify-content-center ">
              <div className="col-md-10">
                <div className="row"> {allprojects} </div>
                <div className="text-danger"> {errorMsg} </div>
              </div>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

export default Projects;
