import React, { PureComponent } from "react";
import $ from "jquery";
class QuickAddModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      milestone: {},
      task: {},
      deadlineError: false
    };
    this.nextState = {};
    this.oldState = {};
  }

  componentWillMount() {
    this.setState({
      milestone: this.nextState,
      task: this.nextState
    });
  }
  componentDidMount() {
    this.oldState = this.state.milestone;
  }
  componentWillUpdate(nextState) {
    this.nextState = nextState;
  }

  // Handles change on the milestone form
  onMTitleChange(e) {
    this.setState({
      milestone: {
        title: e.target.value,
        desc: this.state.milestone.desc,
        deadline: this.state.milestone.deadline
      }
    });
  }

  onMDescChange(e) {
    this.setState({
      milestone: {
        title: this.state.milestone.title,
        desc: e.target.value,
        deadline: this.state.milestone.deadline
      }
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
          deadline: deadline
        },
        deadlineError: false
      });
    } else if (e.target.value === "" || e.target.value) {
      this.setState({
        deadlineError: true
      });
    }
  }

  onMilestoneSubmit(e) {
    this.props.onAddMilestone(this.state.milestone);
    e.preventDefault();
  }

  /* Handles change on the task form 
  *  
  */

  onTasktTitleChange(e) {}

  onTaskDescChange(e) {}

  onTaskDeadlineChange(e) {}

  onTaskAssignedChange(e) {}

  onTaskSubmit(e) {
    e.preventDefault();
    $("#quickAddModal").modal("hide");
  }
  render() {
    let deadlineError;
    if (this.state.deadlineError) {
      deadlineError = (
        <div className="text-danger"> Proper deadline date is required</div>
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
                      className="nav-link waves-light active"
                      data-toggle="tab"
                      href="#task"
                      role="tab"
                    >
                      <i className="fa fa-th-list fa-2x" aria-hidden="true" />
                      <br /> Task
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link waves-light"
                      data-toggle="tab"
                      href="#milestone"
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
                  className="tab-pane fade in show active"
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
                        onChange={this.onTasktTitleChange.bind(TouchList)}
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
                        required
                      />
                    </div>
                    <label htmlFor="taskDeadline">Deadline</label>
                    <div className="md-form">
                      <input
                        placeholder="Selected date"
                        type="date"
                        id="taskDeadline"
                        className="date-picker"
                        onChange={this.onTaskDeadlineChange.bind(this)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="taskAssigned">Assigned To</label>
                      <select
                        className="browser-default form-control"
                        id="taskAssigned"
                        onChange={this.onTaskAssignedChange.bind(this)}
                        required
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
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
                      <label htmlFor="milestoneTitle">Mielstone Name</label>
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
