import axios from "axios";
import React, { PureComponent } from "react";
class QuickAddModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      milestone: {},
      task: {},
      members: [],
      memberNames: [],
      deadlineError: false,
      done: false,
    };
    this.memberNames = [];
    this.members = [];
    this.nextState = {};
    this.oldState = {};
  }

  UNSAFE_componentWillMount() {
    this.setState({
      milestone: this.nextState,
      task: this.nextState,
    });
  }
  componentDidMount() {
    this.oldState = this.state.milestone;
    this.getProjectMembers();
  }
  UNSAFE_componentWillUpdate(nextState) {
    this.nextState = nextState;
  }

  // Get project members
  getProjectMembers() {
    axios
      .request({
        method: "get",
        url:
          "/api/projects/" +
          new URLSearchParams(this.props.location.search).get("id"),
      })
      .then((response) => {
        this.members = response.data.Member;
        this.setState({
          members: response.data.Member,
        });
        this.state.members.map((member, index) => {
          return this.getMemberNames(member);
        });
      })
      .catch((error) => {
        console.log(error);
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
        this.setState({
          memberNames: this.memberNames,
        });
        console.log(this.state.memberNames);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Handles change on the milestone form
  onMTitleChange(e) {
    this.setState({
      milestone: {
        title: e.target.value,
        desc: this.state.milestone.desc,
        deadline: this.state.milestone.deadline,
      },
    });
  }

  onMDescChange(e) {
    this.setState({
      milestone: {
        title: this.state.milestone.title,
        desc: e.target.value,
        deadline: this.state.milestone.deadline,
      },
    });
  }

  onMDeadlineChange(e) {
    if (new Date(e.target.value).getTime() >= new Date().getTime()) {
      let deadline = new Date(e.target.value).toISOString();
      console.log(deadline);
      this.setState({
        milestone: {
          title: this.state.milestone.title,
          desc: this.state.milestone.desc,
          deadline: deadline,
        },
        deadlineError: false,
      });
    } else if (e.target.value === "" || e.target.value) {
      this.setState({
        deadlineError: true,
      });
    }
  }

  onMilestoneSubmit(e) {
    if (this.state.deadlineError === false) {
      this.props.onAddMilestone(this.state.milestone);
    }
    e.preventDefault();
  }

  /* Handles change on the task form */

  onTasktTitleChange(e) {
    this.setState({
      task: {
        title: e.target.value,
        desc: this.state.task.desc,
        deadline: this.state.task.deadline,
        assignedTo: this.state.task.assignedTo,
      },
    });
  }

  onTaskDescChange(e) {
    this.setState({
      task: {
        title: this.state.task.title,
        desc: e.target.value,
        deadline: this.state.task.deadline,
        assignedTo: this.state.task.assignedTo,
      },
    });
  }

  onTaskDeadlineChange(e) {
    if (new Date(e.target.value).getTime() >= new Date().getTime()) {
      let deadline = new Date(e.target.value).toISOString();
      this.setState({
        task: {
          title: this.state.task.title,
          desc: this.state.task.desc,
          deadline: deadline,
          assignedTo: this.state.task.assignedTo,
        },
        deadlineError: false,
      });
    } else if (e.target.value === "" || e.target.value) {
      this.setState({
        deadlineError: true,
      });
    }
  }

  onTaskAssignedChange(e) {
    this.setState({
      task: {
        title: this.state.task.title,
        desc: this.state.task.desc,
        deadline: this.state.task.deadline,
        assignedTo: e.target.value,
      },
    });
  }

  onTaskSubmit(e) {
    if (!this.state.deadlineError) {
      this.props.onAddTask(this.state.task);
    }
    e.preventDefault();
    // $("#quickAddModal").modal("hide");
  }
  /**** End of task handler */

  render() {
    let deadlineError, parent, assigneTo;
    if (this.props.parent === "task") {
      parent = "#task";
    } else if (this.props.parent === "milestone") {
      parent = "#milestone";
    }
    if (this.state.deadlineError) {
      deadlineError = (
        <div className="text-danger"> Proper deadline date is required</div>
      );
    }
    if (this.state.memberNames.length > 0) {
      assigneTo = (
        <select
          className="browser-default form-control"
          id="taskAssigned"
          onChange={this.onTaskAssignedChange.bind(this)}
          defaultValue=""
          required
        >
          <option disabled selected>
            Choose a member{" "}
          </option>
          {this.state.memberNames.map((memberName, index) => {
            return (
              <option value={this.state.members[index]} key={index}>
                {this.state.memberNames[index]}
              </option>
            );
          })}
        </select>
      );
    }

    return (
      <div
        className="modal fade"
        id="quickAddModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="#quickAddModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="quickAddModalLabel">
                Quick Add
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="tabs-wrapper">
                <ul className="nav classic-tabs tabs-blue" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link waves-light"
                      data-toggle="tab"
                      href={parent}
                      role="tab"
                    >
                      <i className="fa fa-th-list fa-2x" aria-hidden="true" />
                      <br /> Task
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link waves-light"
                      data-toggle="tab"
                      href={parent}
                      role="tab"
                    >
                      <i className="fa fa-compass fa-2x" aria-hidden="true" />
                      <br /> Milestone
                    </a>
                  </li>
                </ul>
              </div>

              <div className="tab-content card">
                <div
                  className="tab-pane fade in show "
                  id="task"
                  role="tabpanel"
                >
                  <form method="POST" onSubmit={this.onTaskSubmit.bind(this)}>
                    <div className="md-form">
                      <label htmlFor="taskName">Task Name</label>
                      <input
                        type="text"
                        id="taskName"
                        className="form-control"
                        onChange={this.onTasktTitleChange.bind(this)}
                        required
                      />
                    </div>
                    <div className="md-form">
                      <label htmlFor="taskDes">Description</label>
                      <textarea
                        type="text"
                        id="taskDes"
                        className="form-control md-textarea"
                        rows="5"
                        onChange={this.onTaskDescChange.bind(this)}
                      />
                    </div>
                    <label htmlFor="taskDeadline">Deadline</label>
                    <div className="md-form">
                      <input
                        placeholder="Selected date"
                        type="date"
                        id="taskDeadline"
                        className=""
                        onChange={this.onTaskDeadlineChange.bind(this)}
                        required
                      />
                    </div>
                    {deadlineError}
                    <div className="form-group">
                      <label htmlFor="taskAssigned">Assigned To</label>
                      {assigneTo}
                    </div>
                    <div className="text-center mt-4">
                      <button
                        className="btn btn-indigo"
                        type="submit"
                        onSubmit={this.onTaskSubmit.bind(this)}
                      >
                        Add Task
                      </button>
                    </div>
                  </form>
                </div>
                <div className="tab-pane fade" id="milestone" role="tabpanel">
                  <form
                    mehtod="POST"
                    onSubmit={this.onMilestoneSubmit.bind(this)}
                  >
                    <div className="md-form">
                      <label htmlFor="milestoneTitle">Milestone Name</label>
                      <input
                        type="text"
                        id="milestoneTitle"
                        className="form-control"
                        onChange={this.onMTitleChange.bind(this)}
                        required
                      />
                    </div>
                    <div className="md-form">
                      <label htmlFor="milestoneDesc">Description</label>
                      <textarea
                        type="text"
                        id="milestoneDesc"
                        className="form-control md-textarea"
                        rows="5"
                        onChange={this.onMDescChange.bind(this)}
                        required
                      />
                    </div>
                    <label htmlFor="date-picker">Deadline</label>
                    <div className="md-form">
                      <input
                        placeholder="Selected date"
                        type="date"
                        id="date-picker"
                        className="form-control"
                        onChange={this.onMDeadlineChange.bind(this)}
                        required
                      />
                      {deadlineError}
                    </div>
                    <div className="text-center mt-4">
                      <button
                        className="btn btn-indigo"
                        type="submit"
                        onSubmit={this.onMilestoneSubmit.bind(this)}
                      >
                        Add Milestone
                      </button>
                    </div>
                    <br />
                    <br />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuickAddModal;
