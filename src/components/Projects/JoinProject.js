import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";

class JoinProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: "",
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      projectId: this.props.projectId,
    });
  }
  componentDidMount() {}

  onSubmit(e) {
    this.setState({
      projectId: this.props.projectId,
    });
    console.log(this.state.projectId);
    this.props.sendRequest(this.state.projectId);
    ModalManager.close();
    e.preventDefault();
  }
  render() {
    const { style, data, onRequestClose } = this.props;
    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}
        style={style}
      >
        <div
          className=""
          id="joinProjectModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="joinProjectModalLabel"
          aria-hidden="true"
          style={{
            height: "150px !important",
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-default">
                <h5
                  className="modal-title text-white"
                  id="joinProjectModalLabel"
                >
                  Join Project
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
                    <div className="md-form">
                      <div>
                        Are you sure you want to join the project{" "}
                        <b>{this.props.projectTitle}</b> ?
                      </div>
                    </div>
                    <br />
                    <div className="text-center mt-4">
                      <button
                        className="btn btn-success"
                        type="submit"
                        onSubmit={this.onSubmit.bind(this)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={ModalManager.close}
                      >
                        No
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

JoinProject.propTypes = {
  title: PropTypes.string,
  leader: PropTypes.string,
};

export default JoinProject;
