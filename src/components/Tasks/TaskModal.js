import axios from "axios";
import React, { PureComponent } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
// import $ from "jquery";

class TaskModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      task: {},
      members: [],
      memberNames: [],
      leader: false,
      completed: false,
      deadlinError: false,
    };
    this.nextState = {};
    this.oldState = {};
    this.memberNames = [];
    this.members = [];
  }

  UNSAFE_componentWillMount() {
    this.setState({
      task: this.nextState,
    });
  }
  componentDidMount() {
    this.getProjectMembers();
    this.setState({
      task: this.props.data,
    });
    if (this.props.catagory === 4) {
      this.setState({
        completed: true,
      });
    }
    this.oldState = this.state.task;
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    this.nextState = nextState;
  }

  // Get project members
  getProjectMembers() {
    axios
      .request({
        method: "get",
        url:
          "/api/projects/" +
          new URLSearchParams(this.props.data.location.search).get("id"),
      })
      .then((response) => {
        this.members = response.data.Member;
        if (response.data.Leader === this.props.data.currentUser) {
          this.setState({
            leader: true,
          });
        } else {
          this.setState({
            leader: false,
          });
        }
        this.setState({
          members: response.data.Member,
        });
        this.members.map((member, index) => {
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

  onSubmit(e) {
    if (this.state.deadlinError === false) {
      this.props.data.onEdit(this.state.task);
      this.setState({ task: {} });
      e.preventDefault();
      ModalManager.close();
    } else {
      e.preventDefault();
    }
  }

  onDelete(e) {
    this.props.data.onDelete(this.state.task);
    e.preventDefault();
    ModalManager.close();
  }
  // When the title of the task changes
  onChangeName(e) {
    this.setState({
      task: {
        title: e.target.value,
        desc: this.state.task.desc,
        deadline: this.state.task.deadline,
        catagory: this.state.task.catagory,
        user: this.state.task.user,
        files: this.state.task.files,
        id: this.state.task.id,
      },
    });
  }

  // When the description of a task changes
  onChangeDesc(e) {
    this.setState({
      task: {
        title: this.state.task.title,
        desc: e.target.value,
        deadline: this.state.task.deadline,
        catagory: this.state.task.catagory,
        user: this.state.task.user,
        files: this.state.task.files,
        id: this.state.task.id,
      },
    });
  }
  // When the date changes
  onChangeDate(e) {
    if (
      new Date(e.target.value).getUTCDate() === new Date().getUTCDate() ||
      new Date(e.target.value).getTime() >= new Date().getTime()
    ) {
      this.setState({
        task: {
          title: this.state.task.title,
          desc: this.state.task.desc,
          deadline: new Date(e.target.value).toISOString(),
          catagory: this.state.task.catagory,
          user: this.state.task.user,
          files: this.state.task.files,
          id: this.state.task.id,
        },
        deadlinError: false,
      });
    } else {
      this.setState({
        task: {
          title: this.state.task.title,
          desc: this.state.task.desc,
          deadline: this.state.task.deadline,
          catagory: this.state.task.catagory,
          user: this.state.task.user,
          files: this.state.task.files,
          id: this.state.task.id,
        },
        deadlinError: true,
      });
    }
  }
  // When the catagory changes
  onChangeCat(e) {
    this.setState({
      task: {
        title: this.state.task.title,
        desc: this.state.task.desc,
        deadline: this.state.task.deadline,
        catagory: e.target.value,
        user: this.state.task.user,
        files: this.state.task.files,
        id: this.state.task.id,
      },
    });
  }
  // When assigned is changed
  onChangeAssigned(e) {
    this.setState({
      task: {
        title: this.state.task.title,
        desc: this.state.task.desc,
        deadline: this.state.task.deadline,
        catagory: this.state.task.catagory,
        user: e.target.value,
        files: this.state.task.files,
        id: this.state.task.id,
      },
    });
  }

  render() {
    // console.log("Start of render()");
    const { style, data, onRequestClose } = this.props;
    let allUsers, final, notifyDeadlineError;
    this.state.completed === true ? (final = true) : (final = false);

    if (this.members.length > 0) {
      allUsers = (
        <select
          className="browser-default  form-control colorful-select dropdown-primary"
          searchable="Search here.."
          onChange={this.onChangeAssigned.bind(this)}
        >
          <option value="" disabled>
            Choose member
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
    let allCatOptions;
    if (this.state.leader) {
      allCatOptions = (
        <select
          className="browser-default  form-control"
          defaultValue={data.catagory}
          onChange={this.onChangeCat.bind(this)}
        >
          <option disabled>Choose your option</option>
          <option value="1">Todo</option>
          <option value="2">In Progress</option>
          <option value="3">Review</option>
          <option value="4">Completed</option>
        </select>
      );
    } else {
      allCatOptions = (
        <select
          className="browser-default  form-control"
          defaultValue={data.catagory}
          onChange={this.onChangeCat.bind(this)}
        >
          <option disabled>Choose your option</option>
          <option value="1">Todo</option>
          <option value="2">In Progress</option>
          <option value="3">Review</option>
          <option value="4" disabled>
            Completed
          </option>
        </select>
      );
    }

    if (this.state.deadlinError) {
      notifyDeadlineError = (
        <div className="text-danger">Proper deadline must be set</div>
      );
    } else {
      notifyDeadlineError = null;
    }

    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}
        style={style}
      >
        <div
          className=""
          id="taskModal1"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="taskModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary darken-2">
                <h5 className="modal-title text-white bold">Task Details</h5>
                <button
                  type="button"
                  className="close text-white"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={ModalManager.close}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <label htmlFor="taskName">Task Name</label>
                  <input
                    type="text"
                    id="taskName"
                    className="form-control"
                    defaultValue={data.title}
                    onChange={this.onChangeName.bind(this)}
                    required
                  />
                  <br />
                  <div className="md-from">
                    <label>Task Type</label>
                    {allCatOptions}
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="taskDescription">Description</label>
                    <textarea
                      className="form-control"
                      id="taskDescription"
                      rows="5"
                      defaultValue={data.desc}
                      onChange={this.onChangeDesc.bind(this)}
                    />
                  </div>
                  <div className="md-form">
                    <input
                      type="date"
                      id="date-picker"
                      className="form-control datepicker"
                      date-date-format="DD MM YYYY"
                      defaultValue={new Date(data.deadline)
                        .toISOString()
                        .substring(0, 10)}
                      onChange={this.onChangeDate.bind(this)}
                      required
                    />
                    {notifyDeadlineError}
                  </div>

                  <div className="">
                    <label>Assigned To</label>
                    {allUsers}
                  </div>
                  <br />
                  <div className="">
                    Attached Files
                    <div>None </div>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      className="btn btn-success btn"
                      type="submit"
                      onClick={this.onSubmit.bind(this)}
                      disabled={final}
                    >
                      <i className="fa fa-check" />
                      Save
                    </button>
                    <button
                      className="btn btn-danger btn"
                      type="submit"
                      disabled={final}
                      onClick={this.onDelete.bind(this)}
                    >
                      <i className="fa fa-trash-o pr-2" aria-hidden="true" />
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default TaskModal;
