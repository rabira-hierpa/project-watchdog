import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";

class EditMilestone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      milestone: {},
      deadlineError: false,
      show: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      milestone: this.props.data,
    });
  }

  onTitleChange(e) {
    this.setState({
      milestone: {
        id: this.state.milestone.id,
        title: e.target.value,
        desc: this.state.milestone.desc,
        deadline: this.state.milestone.deadline,
        status: this.state.milestone.status,
      },
    });
  }

  onDesChange(e) {
    this.setState({
      milestone: {
        id: this.state.milestone.id,
        title: this.state.milestone.title,
        desc: e.target.value,
        deadline: this.state.milestone.deadline,
        status: this.state.milestone.status,
      },
      deadlineError: false,
    });
  }
  onStatusChange(e) {
    this.setState({
      milestone: {
        id: this.state.milestone.id,
        title: this.state.milestone.title,
        desc: this.state.milestone.desc,
        deadline: this.state.milestone.deadline,
        status: e.target.value,
      },
      deadlineError: false,
    });
  }

  onDeadlineChange(e) {
    if (new Date(e.target.value).getTime() >= new Date().getTime()) {
      let deadline = new Date(e.target.value).toISOString();
      console.log(deadline);
      this.setState({
        milestone: {
          id: this.state.milestone.id,
          title: this.state.milestone.title,
          desc: this.state.milestone.desc,
          deadline: deadline,
          status: this.state.milestone.status,
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
      this.props.data.onEdit(this.state.milestone);
      ModalManager.close();
      e.preventDefault();
    } else {
      console.log("Form not submitted");
      this.setState({
        deadlineError: true,
      });
      e.preventDefault();
    }
  }
  onDelete(e) {
    if (this.state.milestone) {
      this.props.data.onDelete(this.state.milestone);
      ModalManager.close();
      e.preventDefault();
    }
  }
  render() {
    const { style, data, onRequestClose } = this.props;
    let deadlineError, disableStatus;
    if (this.state.deadlineError) {
      deadlineError = (
        <div className="text-danger"> Proper deadline date is required </div>
      );
    }
    if (this.state.milestone.status === 3) {
      disableStatus = true;
    }

    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}
        style={style}
      >
        <div
          className=""
          id="editMilestoneModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editMilestoneModalLabel"
          aria-hidden="true"
          style={{
            height: "150px !important",
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h5
                  className="modal-title text-white"
                  id="editMilestoneModalLabel"
                >
                  Edit Milestone
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={ModalManager.close}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="">
                  <form method="POST" onSubmit={this.onSubmit.bind(this)}>
                    <label htmlFor=""> Title </label>
                    <div className="md-form">
                      <input
                        type="text"
                        id="#milestoneTitle"
                        className="form-control"
                        defaultValue={this.props.data.title}
                        required
                        onChange={this.onTitleChange.bind(this)}
                      />
                    </div>
                    <br />
                    <label htmlFor=""> Description </label>
                    <div className="md-form">
                      <textarea
                        type="text"
                        id="#descrpiton"
                        className="form-control md-textarea"
                        rows="5"
                        required
                        defaultValue={data.desc}
                        onChange={this.onDesChange.bind(this)}
                      />
                    </div>
                    <label htmlFor="date-picker"> Deadline </label>
                    <div className="md-form">
                      <input
                        placeholder="Selected date"
                        type="date"
                        id="date-picker"
                        className="form-control"
                        onChange={this.onDeadlineChange.bind(this)}
                        defaultValue={new Date(this.state.milestone.deadline)
                          .toISOString()
                          .substring(0, 10)}
                        required
                      />
                      {deadlineError}
                    </div>
                    <div className="form-group">
                      <label htmlFor=""> Milestone status </label>
                      <select
                        className="browser-default form-control"
                        defaultValue={data.status}
                        onChange={this.onStatusChange.bind(this)}
                        required
                        disabled={disableStatus}
                      >
                        <option
                          value="0"
                          disabled
                          style={{
                            color: "grey",
                          }}
                        >
                          Choose Milestone status
                        </option>
                        <option value="1"> Incomplete </option>
                        <option value="2"> Review </option>
                        <option value="3"> Completed </option>
                      </select>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        className="btn btn-success"
                        type="submit"
                        onSubmit={this.onSubmit.bind(this)}
                        disabled={disableStatus}
                      >
                        <i className="fa fa-check" />
                        Save
                      </button>
                      <button
                        className="btn btn-danger"
                        type="submit"
                        onClick={this.onDelete.bind(this)}
                        disabled={disableStatus}
                      >
                        <i className="fa fa-trash-o" aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

EditMilestone.propTypes = {
  title: PropTypes.string,
  leader: PropTypes.string,
};

export default EditMilestone;
