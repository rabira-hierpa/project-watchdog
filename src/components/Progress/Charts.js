import BarChart from "./BarChart";
import PieChart from "./Pie";
import LineChart from "./LineChart";
import React, { Component } from "react";

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      tasks: {},
    };
    this.taskData = {};
    this.milestoneData = {};
    this.task = [];
    this.milestone = [];
    // Task data holders
    this.todoTask = [];
    this.inprogressTask = [];
    this.reviewTask = [];
    this.completedTask = [];
    // Milestones data holders
    this.mIncomplete = [];
    this.mReview = [];
    this.mComplete = [];
    this.line = [];
    // Progress data holders
    this.progress = [];
    this.progressDate = [];
    this.projectProgress = [];
    this.progressData = {};
  }

  static defaultProps = {
    displayTitle: true,
    displayLedgend: true,
    ledgendPosition: "right",
    displayText: "",
  };

  setTaskData = () => {
    // let todo, inprogress, review, completed;
    this.todoTask = this.task.filter((tasks) => {
      return tasks.Catagory === 1;
    });
    this.inprogressTask = this.task.filter((tasks) => {
      return tasks.Catagory === 2;
    });
    this.reviewTask = this.task.filter((tasks) => {
      return tasks.Catagory === 3;
    });
    this.completedTask = this.task.filter((tasks) => {
      return tasks.Catagory === 4;
    });
  };
  setMilestoneData = () => {
    this.mIncomplete = this.milestone.filter((milestones) => {
      return milestones.Status === 1;
    });
    this.mReview = this.milestone.filter((milestones) => {
      return milestones.Status === 2;
    });
    this.mComplete = this.milestone.filter((milestones) => {
      return milestones.Status === 3;
    });
  };
  setProgressLables = () => {
    this.progressDate = this.progress
      .filter((history) => {
        if (history.Progress !== undefined) {
          return history;
        }
      })
      .map((progress) => {
        return new Date(progress.Date).toDateString().substr(3, 12).toString();
      });
  };

  setProjectProgress = () => {
    this.projectProgress = this.progress
      .filter((history) => {
        if (history.Progress !== undefined) {
          return history;
        }
      })
      .map((progress) => {
        return Math.trunc(progress.Progress);
      });
  };

  UNSAFE_componentWillMount() {}

  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props ? true : false;
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    this.props = nextProps;
    this.task = this.props.task;
    this.milestone = this.props.milestone;
    this.progress = this.props.progress;
    this.line = this.props.line;
    this.setTaskData();
    this.setMilestoneData();
    this.setProgressLables();
    this.setProjectProgress();
    this.taskData = {
      labels: ["Todo", "In progress", "Review", "Completed"],
      datasets: [
        {
          label: "Tasks",
          data: [
            this.todoTask.length,
            this.inprogressTask.length,
            this.reviewTask.length,
            this.completedTask.length,
          ],
          backgroundColor: [
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(75, 200, 50, 0.7)",
          ],
        },
      ],
    };
    this.milestoneData = {
      labels: ["In progress", "Review", "Completed"],
      datasets: [
        {
          label: "Milestones",
          data: [
            this.mIncomplete.length,
            this.mReview.length,
            this.mComplete.length,
          ],
          backgroundColor: [
            "rgba(255, 206, 86, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(75, 200, 50, 0.7)",
          ],
        },
      ],
    };
    this.progressData = {
      labels: this.progressDate,
      datasets: [
        {
          label: "Progress",
          data: [...this.projectProgress],
          backgroundColor: [
            "rgba(0, 211, 142, 0.8)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(75, 200, 50, 0.7)",
          ],
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("compDidUpdate");
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="row">
          <BarChart
            chartData={this.milestoneData}
            title="Milestone Progress"
            position="bottom"
          />
          <PieChart
            chartData={this.taskData}
            title="Task Progress"
            position="right"
          />
          <LineChart
            chartData={this.progressData}
            title="Project Progress"
            position="right"
          />
        </div>{" "}
      </div>
    );
  }
}

export default Charts;
