import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class CreateProject extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        leader: "",
        memeber: "",
      },
      deadlineError: false,
    };
    this.nextState = {
      leader: this.props.leader_id,
      member: this.props.leader_id,
    };
    this.oldState = {};
  }

  UNSAFE_componentWillMount() {
    this.setState({
      project: this.nextState,
    });
  }
  componentDidMount() {
    this.oldState = this.state.project;
  }
  UNSAFE_componentWillUpdate(nextState) {
    this.nextState = nextState;
  }

  onTitleChange(e) {
    this.setState({
      project: {
        title: e.target.value,
        desc: this.state.project.desc,
        leader: this.state.project.leader,
        member: this.state.project.member,
        deadline: this.state.deadline,
      },
    });
  }

  onDesChange(e) {
    this.setState({
      project: {
        title: this.state.project.title,
        desc: e.target.value,
        leader: this.state.project.leader,
        member: this.state.project.member,
        deadline: this.state.deadline,
      },
      deadlineError: true,
    });
  }

  onDeadlineChange(e) {
    if (new Date(e.target.value).getTime() >= new Date().getTime()) {
      let deadline = new Date(e.target.value).toISOString();
      console.log(deadline);
      this.setState({
        project: {
          title: this.state.project.title,
          desc: this.state.project.desc,
          leader: this.state.project.leader,
          member: this.state.project.member,
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

  onSubmit(e) {
    if (!this.state.deadlineError) {
      this.props.onNewProject(this.state.project);
      e.preventDefault();
    } else {
      console.log("Form not submitted");
      this.setState({
        deadlineError: true,
      });
      e.preventDefault();
    }
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
        className="modal fade mask"
        id="createProjectModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createProjectModalLabel"
        aria-hidden="true"
        style={{ height: "150px !important" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h5
                className="modal-title text-white"
                id="createProjectModalLabel"
              >
                {this.props.title}
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
              <div className="">
                <form method="POST" onSubmit={this.onSubmit.bind(this)}>
                  <div className="md-form">
                    <label htmlFor="projectTitle">Project Title</label>
                    <input
                      type="text"
                      id="#projectTitle"
                      className="form-control"
                      required
                      onChange={this.onTitleChange.bind(this)}
                    />
                  </div>
                  <br />
                  <div className="md-form">
                    <label htmlFor="descrpiton">Description</label>
                    <textarea
                      type="text"
                      id="#descrpiton"
                      className="form-control md-textarea"
                      rows="5"
                      required
                      onChange={this.onDesChange.bind(this)}
                    />
                  </div>
                  <label htmlFor="date-picker">Deadline</label>
                  <div className="md-form">
                    <input
                      placeholder="Selected date"
                      type="date"
                      id="date-picker"
                      className="form-control"
                      onChange={this.onDeadlineChange.bind(this)}
                      required
                    />
                    {deadlineError}
                  </div>
                  <div className="text-center mt-4">
                    <button
                      className="btn btn-success"
                      type="submit"
                      onSubmit={this.onSubmit.bind(this)}
                    >
                      Add Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProject.propTypes = {
  title: PropTypes.string,
  leader: PropTypes.string,
};

export default CreateProject;
