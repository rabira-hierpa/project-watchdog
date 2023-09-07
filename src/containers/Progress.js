import axios from "axios";
import React, { Component } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import MainFooter from "../components/Common/MainFooter";
import Charts from "../components/Progress/Charts";

class Progress extends Component {
  constructor(props) {
    super(props);
    this.title = "Progress";
    this.tasks = [];
    this.milestone = [];
    this.history = [];
    this.progress = 0;
    this.project = {};
    this.state = {
      chartData: {},
      project: {},
    };
  }

  UNSAFE_componentWillMount() {
    this.getChartData();
    this.getProjectData();
  }

  componentDidMount() {
    this.getChartData();
  }

  // Get project data
  getProjectData() {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "get",
        url: "/api/projects/" + this.id,
      })
      .then((response) => {
        this.tasks = response.data.Task;
        this.milestone = response.data.MileStone;
        this.progress = response.data.Progress;
        this.member = response.data.Member;
        this.history = response.data.History;
        this.setState({
          project: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again",
        });
      });
  }

  getChartData() {
    // Ajax call goes here
    this.setState({
      chartData: {
        labels: [
          "Dec 02 2017",
          "Dec 10 2017",
          "Jan 16 2018",
          "Feb 04 2018",
          "Feb 19 2018",
          "Mar 24 2018",
          "Apr 07 2018",
        ],
        datasets: [
          {
            label: "Progress",
            data: [0, 5, 15, 15, 20, 20, 30],
            backgroundColor: [
              // "rgba(255, 99, 132, 0.6)",
              // "rgba(54, 162, 235, 0.6)",
              "rgba(0, 211, 142, 0.8)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      },
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
  // Handle project progress from its history
  getProjectHistory() {
    let progress = this.history.filter((history, index) => {
      if (!history.Progress === undefined) {
        return history[index];
      } else {
        return null;
      }
    });
    return progress;
  }
  // Handle completed tasks to count
  getCompletedTasks() {
    let completed = this.tasks.filter((tasks) => {
      return tasks.Catagory === 4;
    });
    return completed;
  }
  // Handle completed milestones to count
  getCompletedMilestones() {
    let completed = this.milestone.filter((milestone) => {
      return milestone.Status === 3;
    });
    return completed;
  }
  render() {
    let style = {
      fontFamily: "Archivo Black",
      fontWeight: "100",
    };
    let completedTasks = this.getCompletedTasks(),
      completedMilestones = this.getCompletedMilestones();
    return (
      <div>
        <ProjectNav
          quickadd=""
          sidebar={true}
          details={true}
          projects={true}
          onLogout={this.onLogout.bind(this)}
          id={this.state.id}
          projectid={new URLSearchParams(this.props.location.search).get("id")}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <br />
                <div className="row">
                  <div
                    className="col-md-4 text-center text-success"
                    style={style}
                  >
                    <div className="display-3">{completedTasks.length}</div>
                    <div className="my-3 display-6 tx-2x text-unique">
                      Tasks Completed
                    </div>
                    <div>{" out of " + this.tasks.length}</div>
                  </div>
                  <div
                    className="col-md-4 text-center text-primary"
                    style={style}
                  >
                    <div className="display-3">
                      {completedMilestones.length}
                    </div>
                    <div className="my-3 display-6 tx-2x">
                      Milestones Completed
                    </div>
                    <div>{" out of " + this.milestone.length}</div>
                  </div>
                  <div
                    className="col-md-4 text-center text-warning"
                    style={style}
                  >
                    <div className="display-3 ">
                      {Math.trunc(this.progress).toString()}%
                    </div>
                    <div className="my-3 display-6 tx-2x">
                      Project Completed
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center ">
              <div className="col-md-10">
                <div className="row">
                  <Charts
                    task={this.tasks}
                    milestone={this.milestone}
                    member={this.member}
                    progress={this.history}
                    line={this.state.chartData}
                  />
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

export default Progress;
