import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.quickadd = "Quick Add";
    this.state = {
      project: {},
      leaderName: "",
      memberNames: []
    };
    this.leaderName = "";
    this.milestones = [];
    this.tasks = [];
    this.members = [];
    this.memberNames = [];
  }

  componentWillMount() {}

  componentDidMount() {
    this.getUserProjects();
    this.getUserName(this.leaderId);
  }

  // Logout and reset the cookie session
  onLogout() {
    axios
      .request({
        method: "get",
        url: "/api/auth/logout"
      })
      .then(response => {
        window.location.href = "http://localhost:3000/";
      })
      .catch(error => {
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
        url: "/api/projects/" + this.user
      })
      .then(response => {
        console.log(response.data);
        this.milestones = response.data.MileStone;
        this.tasks = response.data.Task;
        this.members = response.data.Member;
        this.leaderId = response.data.Leader;
        this.setState({
          project: response.data
        });
        this.getUserName(response.data.Leader);
        this.members.map((member, index) => {
          return this.getMemberNames(member);
        });
      })
      .catch(error => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again"
        });
        console.log(error);
      });
  }

  // Get fname of a user
  getUserName(userId) {
    axios
      .request({
        method: "get",
        url: "/api/users/name/" + userId
      })
      .then(response => {
        this.setState({
          leaderName: response.data.Fname + " " + response.data.Lname
        });
        // this.members.push(response.data.Fname);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Get group members name
  getMemberNames(member) {
    axios
      .request({
        method: "get",
        url: "/api/users/name/" + member
      })
      .then(response => {
        this.memberNames.push(response.data.Fname + " " + response.data.Lname);
        this.setState({
          memberNames: this.memberNames
        });
        console.log(this.state.memberNames);
      })
      .catch(error => {
        console.log(error);
      });
  }
  getCompletedMilesStones() {
    let completed = this.milestones.filter(milestones => {
      return milestones.Status === 3;
    });
    return completed;
  }

  getCompletedTasks() {
    let completed = this.tasks.filter(tasks => {
      return tasks.Catagory === 4;
    });
    return completed;
  }
  render() {
    let projectDetails,
      completedMilestone = this.getCompletedMilesStones();
    console.log(completedMilestone);

    if (!this.state.project.length) {
      projectDetails = (
        <div className="row">
          <div className="col-lg-12 text-center unique-darker h4 mb-5">
            {this.state.project.ProjectTitle}
          </div>
          <div className="col-lg-6">
            <div className="h5 align-right"> Description</div>
            {this.state.project.ProjectDescription}
          </div>

          <div className="col-lg-6">
            <ul className="stepper stepper-vertical">
              <li className="completed">
                <a href="#!">
                  <span className="circle">
                    <i className="fa fa-calendar-o " aria-hidden="true" />
                  </span>
                  <span className="label">
                    <span className="h6  lighten-3">
                      Start Date:<span className="text-primary ml-2">
                        {new Date(this.state.project.StartDate).toDateString()}
                      </span>
                    </span>
                  </span>
                </a>
              </li>

              <li className="warning">
                <a href="#!">
                  <span className="circle">
                    <i className="fa fa-calendar-times-o " aria-hidden="true" />
                  </span>
                  <span className="label">
                    <span className="h6 ">
                      <strong> Deadline:</strong>
                      <span className="text-danger ml-2">
                        {new Date(this.state.project.DeadLine).toDateString()}
                      </span>
                    </span>
                  </span>
                </a>
              </li>

              <li className="completed">
                <a href="#!">
                  <span className="circle">
                    <i className="fa fa-star" aria-hidden="true" />
                  </span>
                  <span className="label">
                    <span className="h6 my-5">
                      Leader: {" " + this.state.leaderName}
                    </span>
                  </span>
                </a>
              </li>
              <li className="completed">
                <a href={"/milestones?id=" + this.state.project._id}>
                  <span className="circle">
                    <i className="fa fa-compass fa-md " aria-hidden="true" />
                  </span>
                  <span className="label h6">
                    Milestones :{" "}
                    {" " +
                      completedMilestone.length +
                      " out of " +
                      this.milestones.length +
                      " completed"}
                  </span>
                </a>
              </li>
              <li className="completed">
                <a href={"/tasks?id=" + this.state.project._id}>
                  <span className="circle">
                    <i className="fa fa-list " aria-hidden="true" />
                  </span>
                  <span className="label h6">
                    Tasks : {" " + this.tasks.length}
                  </span>
                </a>
              </li>
              <li className="completed">
                <a href="/progress">
                  <span className="circle">
                    <i className="fa fa-flag-checkered" aria-hidden="true" />
                  </span>
                  <span className="label h6">
                    Progress :
                    {" " + this.state.project.Progress + " % completed"}
                  </span>
                </a>
              </li>
              <li className="completed">
                <a href="#!">
                  <span className="circle">
                    <i className="fa fa-users" aria-hidden="true" />
                  </span>
                  <span className="label h6">Members</span>
                </a>
                <div className="step-content my-2">
                  {this.state.memberNames.map((member, index) => {
                    return (
                      <div key={index}>
                        <i className="fa fa-user" aria-hidden="true" />
                        {" " + this.state.memberNames[index]}
                      </div>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    return (
      <div>
        <ProjectNav
          quickadd={this.quickadd}
          sidebar={true}
          onLogout={this.onLogout.bind(this)}
          details={true}
          projectid={this.state.project._id}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title={this.title} /> <br />
            <div className="row justify-content-center ">
              <div className="col-md-8">
                <div className="well">
                  {projectDetails}
                  <div className="text-danger"> </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

export default withRouter(Dashboard);
