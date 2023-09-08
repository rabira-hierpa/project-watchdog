import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import Axios from "axios";

class ProjectRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: "",
      memberNames: [],
    };
    this.memberNames = [];
  }

  UNSAFE_componentWillMount() {
    this.props.requestList.map((member) => {
      this.getMemberNames(member.UserID, member._id);
      return null;
    });
  }
  componentDidMount() {}
  // Get group members name
  getMemberNames(member, reqId) {
    Axios.request({
      method: "get",
      url: "/api/users/name/" + member,
    })
      .then((response) => {
        this.memberNames.push({
          name: response.data.Fname + " " + response.data.Lname,
          id: member,
          reqId: reqId, // request Id
        });
        this.setState({ memberNames: this.memberNames });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onAcceptRequest(e, memberID, reqId) {
    this.props.addMember(memberID, reqId);
    ModalManager.close();
    e.preventDefault();
  }
  onDenyRequest(e, reqId) {
    this.props.removeRequest(reqId);
    ModalManager.close();
    e.preventDefault();
  }
  render() {
    const { style, data, onRequestClose } = this.props;
    let requestList;
    let memeberNames = this.props.allMemberNames.map((memberName, index) => {
      return (
        <li key={index} className="list-group-item">
          {memberName}
        </li>
      );
    });
    if (this.props.requestList.length === 0) {
      requestList = <li className="list-group-item">No request so far.</li>;
    } else {
      requestList = this.state.memberNames.map((member, index) => {
        return (
          <li key={index} className="list-group-item">
            {member.name}
            <a onClick={(e) => this.onDenyRequest(e, member.reqId)}>
              <span className="pull-right btn btn-sm btn-danger">
                <i className="fa fa-trash-o" aria-hidden="true" />
                Deny
              </span>
            </a>
            <a
              onClick={(e) => this.onAcceptRequest(e, member.id, member.reqId)}
            >
              <span className="pull-right btn btn-sm btn-success">
                <i className="fa fa-check" aria-hidden="true" />
                Accept
              </span>
            </a>
          </li>
        );
      });
    }
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
            height: "250px !important",
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header unique-color">
                <h5
                  className="modal-title text-white"
                  id="joinProjectModalLabel"
                >
                  Members List
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
                <div>
                  People who have requested to join your project will appear
                  here.
                  <hr />
                  <div className="h6">Request List</div>
                  <ul className="list-group">{requestList}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

ProjectRequest.propTypes = {
  title: PropTypes.string,
  leader: PropTypes.string,
};

export default ProjectRequest;
