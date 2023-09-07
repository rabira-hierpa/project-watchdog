import React, { PureComponent } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Axios from "axios";
import JoinProject from "../Projects/JoinProject";
import { ModalManager } from "react-dynamic-modal/lib/Modal";

class SearchTemeplate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      projectId: "",
    };
  }

  UNSAFE_componentWillMount(nextState) {
    // console.log(nextState);
  }

  componentDidMount() {
    this.setState({
      projectId: this.props.id,
    });
  }

  getUserName(member) {
    Axios.request({
      method: "get",
      url: "/api/users/name/" + member,
    })
      .then((response) => {
        let currentMembers = [...this.state.memberNames];
        currentMembers.push(response.data.Fname);
        this.setState({
          memberNames: currentMembers,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  disableClick = (event) => {
    event.preventDefault();
  };

  openModal = (e) => {
    let modalStyle = {
      content: {
        position: "relative",
        margin: "0% auto",
        width: "28.5%",
        background: "rgba(255, 255, 255, 0)",
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 0px",
        overflow: "auto",
        borderRadius: "4px",
        outline: "none",
      },
    };
    ModalManager.open(
      <JoinProject
        style={modalStyle}
        data={this.state.projectId}
        projectTitle={this.props.title}
        projectId={this.props.id}
        sendRequest={this.props.sendRequest.bind(this)}
        onRequestClose={() => true}
      />,
    );
    e.preventDefault();
  };

  render() {
    let joinStatus;
    if (this.props.members.indexOf(this.props.userid) !== -1) {
      joinStatus = (
        <a className="grey-text">
          <h5 className="pull-right">
            Joined <i className="fa fa-chevron-right" />
          </h5>
        </a>
      );
    } else if (
      this.props.request.find((id) => id.UserID === this.props.userid)
    ) {
      joinStatus = (
        <a onClick={() => this.disableClick} className="grey-text">
          <h5 className="pull-right ">
            Pending <i className="fa fa-chevron-right" />
          </h5>
        </a>
      );
    } else {
      joinStatus = (
        <a href="#!" onClick={(event) => this.openModal(event)}>
          <h5 className="pull-right">
            Join Project <i className="fa fa-chevron-right" />
          </h5>
        </a>
      );
    }
    return (
      <div className="col-md-4" data-toggle="modal">
        <div className="card hoverable">
          <div className="view overlay" />
          <div className="card-body">
            {
              //<a href="" className="activator p-3 mr-2"><i className="fa fa-share-alt"></i></a>
            }
            <a
              onClick={() => this.disableClick}
              href="#!"
              className="card-title"
            >
              <h4>{this.props.title}</h4>
            </a>
            <hr />
            <p className="card-text d-block text-truncate">
              {this.props.description}
            </p>
            <span className="card-text">
              <i className="fa fa-user-circle fa-lg" aria-hidden="true" />
              &nbsp;
              {this.props.members.length > 1
                ? this.props.members.length + " Members"
                : this.props.members.length + " Memeber"}
            </span>
            {joinStatus}
            <br />
            <div
              className="progress"
              style={{ height: "15px" }}
              title={"Progress : " + this.props.progress + "%"}
            >
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                role="progressbar"
                style={{
                  width: Math.trunc(this.props.progress) + "%",
                  height: "15px",
                }}
                aria-valuenow={Math.trunc(this.props.progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {Math.trunc(this.props.progress)}%
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default SearchTemeplate;
