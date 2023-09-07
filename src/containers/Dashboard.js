import axios from "axios";
import React, { Component } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";
import { ModalManager } from "react-dynamic-modal/lib/Modal";
import ProjectRequest from "../components/Projects/ProjectRequest";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.quickadd = "Quick Add";
    this.state = {
      project: {},
      history: [],
      leaderName: "",
      userId: {},
      memberNames: [],
    };
    this.leaderName = "";
    this.milestones = [];
    this.tasks = [];
    this.members = [];
    this.memberNames = [];
    this.history = [];
    this.request = [];
  }

  UNSAFE_componentWillMount() {
    this.getUserid();
  }

  componentDidMount() {
    this.getUserProject();
  }

  getUserid() {
    axios
      .request({
        method: "get",
        url: "/api/auth/show/current",
      })
      .then((response) => {
        console.log(response.data);
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
      .request({ method: "get", url: "/api/auth/logout" })
      .then((response) => {
        window.location.href = "http://localhost:3000/";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Get projects of a user
  getUserProject() {
    this.user = new URLSearchParams(this.props.location.search).get("id");
    // console.log(this.user);
    axios
      .request({
        method: "get",
        url: "/api/projects/" + this.user,
      })
      .then((response) => {
        this.milestones = response.data.MileStone;
        this.tasks = response.data.Task;
        this.members = response.data.Member;
        this.leaderId = response.data.Leader;
        // this.history = response.data.History.reverse();
        // console.log(this.history);
        this.request = response.data.Request;
        this.setState({
          project: response.data,
          history: response.data.History.reverse(),
          leaderId: response.data.Leader,
        });
        this.getUserName(this.leaderId);
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

  // Get fname of a user
  getUserName(userId) {
    axios
      .request({
        method: "get",
        url: "/api/users/name/" + userId,
      })
      .then((response) => {
        this.setState({
          leaderName: response.data.Fname + " " + response.data.Lname,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.members.map((member, index) => {
      return this.getMemberNames(member);
    });
  }

  // Get group members name
  getMemberNames(member) {
    axios
      .request({
        method: "get",
        url: "/api/users/name/" + member,
      })
      .then((response) => {
        this.memberNames.push(response.data.Fname + " " + response.data.Lname);
        this.setState({ memberNames: this.memberNames });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Get completed milestones
  getCompletedMilesStones() {
    let completed = this.milestones.filter((milestones) => {
      return milestones.Status === 3;
    });
    return completed;
  }
  // Get completed tasks
  getCompletedTasks() {
    let completed = this.tasks.filter((tasks) => {
      return tasks.Catagory === 4;
    });
    return completed;
  }
  getRecentActivity = () => {
    let currentDate = new Date();
    for (let j = 0; j < 5; j++) {
      const activity = this.state.history[j];
      let calc = currentDate.getTime() - new Date(activity.Date).getTime();
      if (calc < 3600000) {
        if (activity.Type === "Milestone") {
          return (
            <li key={j} className="list-group-item">
              <span className="badge blue pull-right ml-1">
                {activity.Type}
              </span>
              <span className="badge red pull-right ml-1">New</span>
              {new Date(activity.Date).toDateString().substr(0, 10) +
                " - " +
                activity.Event +
                " by " +
                activity.UserName}
            </li>
          );
        } else if (activity.Type === "Task") {
          return (
            <li key={j} className="list-group-item">
              <span className="badge amber pull-right ml-1">
                {activity.Type}
              </span>
              <span className="badge red pull-right ml-1">New</span>
              {new Date(activity.Date).toDateString().substr(0, 10) +
                " - " +
                activity.Event +
                " by " +
                activity.UserName}
            </li>
          );
        } else if (activity.Type === "Progress") {
          return (
            <li key={j} className="list-group-item">
              <span className="badge green pull-right ml-1">
                {activity.Type}
              </span>
              <span className="badge red pull-right ml-1">New</span>
              {new Date(activity.Date).toDateString().substr(0, 10) +
                " - " +
                activity.Event +
                " by " +
                activity.UserName}
            </li>
          );
        }
      } else {
        if (activity.Type === "Milestone") {
          return (
            <li key={j} className="list-group-item">
              <span className="badge blue pull-right ml-1">
                {activity.Type}
              </span>
              {new Date(activity.Date).toDateString().substr(0, 10) +
                " - " +
                activity.Event +
                " by " +
                activity.UserName}
            </li>
          );
        } else if (activity.Type === "Task") {
          return (
            <li key={j} className="list-group-item">
              <span className="badge amber darken-2 pull-right ml-1">
                {activity.Type}
              </span>
              {new Date(activity.Date).toDateString().substr(0, 10) +
                " - " +
                activity.Event +
                " by " +
                activity.UserName}
            </li>
          );
        }
      }
    }
  };
  addMemberHandler(userID, reqId) {
    let id = new URLSearchParams(this.props.location.search).get("id");
    console.log(userID);
    axios
      .request({
        method: "put",
        url: "/api/projects/member/" + id + "/" + userID,
      })
      .then((response) => {
        this.removeRequestMember(reqId);
      })
      .catch((error) => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again",
        });
        console.log(error);
      });
    this.getUserProject();
  }
  removeRequestMember(reqId) {
    let id = new URLSearchParams(this.props.location.search).get("id");
    console.log(reqId);
    axios
      .request({
        method: "delete",
        url: "/api/requests/" + id + "/" + reqId,
      })
      .then((response) => {})
      .catch((error) => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again",
        });
        console.log(error);
      });
    this.getUserProject();
  }
  openModal = (e) => {
    let modalStyle = {
      content: {
        position: "relative",
        margin: "0% auto",
        width: "28.5%",
        background: "rgba(255, 255, 255, 0)",
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 0px",
        overflow: "auto",
        borderRadius: "4px",
        outline: "none",
      },
    };
    ModalManager.open(
      <ProjectRequest
        style={modalStyle}
        data={this.state.projectId}
        allMemberNames={this.state.memberNames}
        requestList={this.request}
        addMember={this.addMemberHandler.bind(this)}
        removeRequest={this.removeRequestMember.bind(this)}
        onRequestClose={() => true}
      />
    );
    e.preventDefault();
  };

  render() {
    let notification, adminAccess;
    let projectDetails,
      completedMilestone = this.getCompletedMilesStones(),
      completedTasks = this.getCompletedTasks(),
      recentActivity;
    let noActivity = false;
    if (this.state.leaderId === this.state.userId._id) {
      adminAccess = (
        <div className="py-3">
          <span
            className="btn btn-outline-success btn-rounded waves-effect"
            onClick={(event) => this.openModal(event)}
          >
            <i className="fa fa-plus-circle fa-lg" />
            &nbsp; Add Member &nbsp;
            {notification}
          </span>
          <span className="btn btn-outline-secondary btn-rounded waves-effect">
            <i className=" fa fa-edit fa-lg " />
            &nbsp; Edit Project
          </span>
          <span className="btn btn-outline-danger btn-rounded waves-effect">
            <i className="fa fa-trash fa-lg" />
            &nbsp; Delete Project
          </span>
        </div>
      );
    } else {
      adminAccess = null;
    }
    if (this.request.length > 0) {
      notification = (
        <span className="badge badge-danger badge-pill">
          {this.request.length}
        </span>
      );
    } else {
      notification = null;
    }
    if (!this.state.project.length) {
      let startdate = new Date(this.state.project.StartDate);
      let deadline = new Date(this.state.project.DeadLine);
      let timeDiff = Math.abs(deadline - startdate);
      let daysleft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      let dedlinestatus = daysleft / 100 <= 10 ? "text-danger" : "text-success";
      if (this.state.history.length > 0) {
        recentActivity = this.getRecentActivity();
        noActivity = false;
      } else {
        recentActivity = (
          <div className="my-3">
            No activites made yet! Creat a new milestone/task to get started
            with your project
          </div>
        );
        noActivity = true;
      }
      projectDetails = (
        <div className="row">
          <div className="col-lg-12 text-center unique-darker h4 mb-5">
            {this.state.project.ProjectTitle}
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="h5 align-right">Description</div>
              <div className="col-lg-12 box">
                {this.state.project.ProjectDescription}
              </div>
              <div className="col-lg-12">
                <div className="h6 my-3">Recent Activity</div>
                <div>
                  <ul className="list-group w-auto">
                    {recentActivity}
                    <li className="list-group">
                      <a
                        href={
                          "/history?id=" +
                          new URLSearchParams(this.props.location.search).get(
                            "id"
                          )
                        }
                        disabled={noActivity}
                      >
                        <span className="pull-right"> Show More</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="stepper stepper-vertical">
              <li className="completed">
                <a href="#!">
                  <span className="circle">
                    <i className="fa fa-calendar-o " aria-hidden="true" />
                  </span>
                  <span className="label">
                    <span className="h6 lighten-3">
                      Start Date:
                      <span className="text-primary ml-2">
                        {new Date(this.state.project.StartDate).toDateString()}
                      </span>
                    </span>
                  </span>
                </a>
                <div className="step-content my-2">
                  {daysleft + " day(s) left"}
                </div>
              </li>
              <li className="completed">
                <a href="#!">
                  <span className="circle">
                    <i className="fa fa-calendar-times-o " aria-hidden="true" />
                  </span>
                  <span className="label">
                    <span className="h6 ">
                      <strong>Deadline:</strong>
                      <span className={dedlinestatus + " ml-2"}>
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
                    Milestones:
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
                    Tasks:
                    {" " +
                      completedTasks.length +
                      " out of " +
                      this.tasks.length +
                      " completed"}
                  </span>
                </a>
              </li>
              <li className="completed">
                <a href={"/progress?id=" + this.state.project._id}>
                  <span className="circle">
                    <i className="fa fa-flag-checkered" aria-hidden="true" />
                  </span>
                  <span className="label h6">
                    Progress:
                    {" " +
                      Math.trunc(this.state.project.Progress) +
                      " % completed"}
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
                  {this.state.memberNames.map((members, index) => {
                    return (
                      <div key={index}>
                        <i className="fa fa-user-o" />
                        {" " + this.memberNames[index]}
                      </div>
                    );
                  })}
                  {adminAccess}
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
          quickadd=""
          sidebar={true}
          details={true}
          projects={true}
          onLogout={this.onLogout.bind(this)}
          projectid={this.state.project._id}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title={this.title} />
            <br />
            <div className="row justify-content-center ">
              <div className="col-md-8">
                <div className="well">
                  {projectDetails}
                  <div className="text-danger" />
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

export default Dashboard;
