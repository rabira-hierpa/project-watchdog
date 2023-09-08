import axios from "axios";
import React, { Component } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      userId: "",
      milestones: [],
      tasks: [],
    };
    this.quickadd = "Quick Add";
  }

  UNSAFE_componentWillMount() {
    // this.getUserid();
  }

  componentDidMount() {
    this.getUserid();
    this.getMilestones();
    this.getTasks();
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

  // Get all Milestones
  getMilestones() {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "get",
        url: "/api/milestones/all/" + this.id,
      })
      .then((response) => {
        this.setState({
          milestones: response.data.MileStone,
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

  // Get all tasks of a project
  getTasks() {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "get",
        url: "/api/tasks/all/" + this.id,
      })
      .then((response) => {
        this.setState({ tasks: response.data.Task });
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
    let allMilestones, allTasks;
    let oneDay = 1000 * 60 * 60 * 24;
    if (this.state.milestones.length > 0) {
      allMilestones = this.state.milestones.map((milestone, index) => {
        let deadline = new Date(milestone.DeadLine);
        let currentDate = new Date();
        let timediff = Math.abs(deadline - currentDate);
        let daysLeft = Math.ceil(timediff / oneDay);
        if (milestone.Status === 1) {
          return (
            <tr key={index}>
              <td> {milestone.MileStoneTitle}</td>
              <td>
                {new Date(milestone.DeadLine).toDateString().substr(0, 10)}
              </td>
              <td className="text-danger h6">
                {deadline.getDate() >= currentDate.getDate() &&
                deadline.getMonth() >= currentDate.getMonth() &&
                deadline.getFullYear() >= currentDate.getFullYear()
                  ? daysLeft + " day(s) left"
                  : "Deadline passed " + daysLeft + " days ago"}
              </td>
              <td>Incomplete</td>
            </tr>
          );
        } else if (milestone.Status === 2) {
          return (
            <tr key={index}>
              <td> {milestone.MileStoneTitle}</td>
              <td>
                {new Date(milestone.DeadLine).toDateString().substr(0, 10)}
              </td>
              <td className="text-danger h6">
                {deadline.getDate() >= currentDate.getDate() &&
                deadline.getMonth() >= currentDate.getMonth() &&
                deadline.getFullYear() >= currentDate.getFullYear()
                  ? daysLeft + " day(s) left"
                  : "Deadline passed " + daysLeft + " days ago"}
              </td>
              <td>Review</td>
            </tr>
          );
        } else if (milestone.Status === 3) {
          return (
            <tr key={index}>
              <td> {milestone.MileStoneTitle}</td>
              <td>
                {new Date(milestone.DeadLine).toDateString().substr(0, 10)}
              </td>
              <td className="text-success h6">{"Milestone Completed "}</td>
              <td>Completed</td>
            </tr>
          );
        } else {
          return null;
        }
      });
    }

    if (this.state.tasks.length > 0) {
      allTasks = this.state.tasks.map((task, index) => {
        let deadline = new Date(task.DeadLine);
        let currentDate = new Date();
        let timediff = Math.abs(deadline - currentDate);
        let daysLeft = Math.ceil(timediff / (1000 * 60 * 60 * 24));
        if (task.Catagory === 1) {
          return (
            <tr key={index}>
              <td> {task.TaskTitle}</td>
              <td>{new Date(task.DeadLine).toDateString().substr(0, 10)}</td>
              <td className="text-danger h6">
                {deadline.getDate() > currentDate.getDate()
                  ? daysLeft + " day(s) left"
                  : "Deadline passed " + daysLeft + " days ago"}
              </td>
              <td>Todo</td>
            </tr>
          );
        } else if (task.Catagory === 2) {
          return (
            <tr key={index}>
              <td> {task.TaskTitle}</td>
              <td>{new Date(task.DeadLine).toDateString().substr(0, 10)}</td>
              <td className="text-danger  h6">
                {deadline.getDate() > currentDate.getDate()
                  ? daysLeft + " day(s) left"
                  : "Deadline passed " + daysLeft + " days ago"}
              </td>
              <td>Inprogress</td>
            </tr>
          );
        } else if (task.Catagory === 3) {
          return (
            <tr key={index}>
              <td> {task.TaskTitle}</td>
              <td>{new Date(task.DeadLine).toDateString().substr(0, 10)}</td>
              <td className="text-danger h6">
                {deadline.getDate() > currentDate.getDate()
                  ? daysLeft + " day(s) left"
                  : "Deadline passed " + daysLeft + " days ago"}
              </td>
              <td>Review</td>
            </tr>
          );
        } else if (task.Catagory === 4) {
          return (
            <tr key={index}>
              <td> {task.TaskTitle}</td>
              <td>{new Date(task.DeadLine).toDateString().substr(0, 10)}</td>
              <td className="text-success h6">{"Task Completed "}</td>
              <td>Completed </td>
            </tr>
          );
        } else {
          return null;
        }
      });
    }
    return (
      <div>
        <ProjectNav
          quickadd=""
          sidebar={true}
          details={true}
          projects={true}
          id={this.state.id}
          onLogout={this.onLogout.bind(this)}
          projectid={new URLSearchParams(this.props.location.search).get("id")}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title="Project Schedule" />
            <br />
            <div className="row justify-content-center ">
              <div className="col-md-10 m-auto">
                <div className="table-wrapper">
                  <table className="table table-sm table-stripped">
                    <thead className="blue darken-3 text-white">
                      <tr>
                        <th scope="col">
                          <i className="fa fa-edit pr-2" aria-hidden="true" />
                          Milestone
                        </th>
                        <th scope="col">
                          <i
                            className="fa fa-calendar pr-2"
                            aria-hidden="true"
                          />
                          Deadline Date
                        </th>
                        <th scope="col">
                          <i
                            className="fa fa-calendar-o pr-2"
                            aria-hidden="true"
                          />
                          Days left
                        </th>
                        <th scope="col">
                          <i className="fa fa-check pr-2" aria-hidden="true" />
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>{allMilestones}</tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-10 ">
                <div className="table-wrapper mt-5">
                  <table className="table table-sm table-strippeds">
                    <thead className="blue darken-3 text-white">
                      <tr>
                        <th scope="col">
                          <i className="fa fa-edit pr-2" aria-hidden="true" />
                          Task
                        </th>
                        <th scope="col">
                          <i
                            className="fa fa-calendar pr-2"
                            aria-hidden="true"
                          />
                          Deadline Date
                        </th>
                        <th scope="col">
                          <i
                            className="fa fa-calendar-o pr-2"
                            aria-hidden="true"
                          />
                          Days left
                        </th>
                        <th scope="col">
                          <i className="fa fa-check pr-2" aria-hidden="true" />
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>{allTasks}</tbody>
                  </table>
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

Schedule.propTypes = {};

export default Schedule;
