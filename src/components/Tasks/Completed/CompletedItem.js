import axios from "axios";
import React, { PureComponent } from "react";
import { ModalManager } from "react-dynamic-modal/lib/Modal";
import TaskModal from "../TaskModal";
class CompletedItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      view: {},
    };
    this.deadline = new Date(this.props.deadline);
    this.data = "";
  }

  componentWillMount() {
    this.data = this.props;
  }
  componentDidMount() {
    this.getUserName();
  }

  componentDidUpdate(nextProps, nextState) {}

  getUserName() {
    axios
      .request({
        method: "get",
        url: "/api/users/name/" + this.props.user,
      })
      .then((response) => {
        this.setState({
          username: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openModal() {
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
      <TaskModal
        style={modalStyle}
        data={this.props}
        onRequestClose={() => true}
        {...this.props}
      />,
    );
  }
  render() {
    let deadline;
    deadline = (
      <span className="pull-right " title="Deadline">
        {new Date(this.props.deadline).toDateString().substr(0, 10)}
      </span>
    );
    return (
      <div className="grid" onClick={this.openModal.bind(this)}>
        <div className="card hoverable item" data-toggle="modal1">
          <div className="card-header ">
            <a className="card-title " title="Task Name">
              {this.props.title}
              {deadline}
            </a>
          </div>
          <div className="card-body">
            <p className="card-text text-truncate">{this.props.desc}</p>
            <div className="align-self-left">
              <i
                className="fa fa-paperclip fa-lg"
                aria-hidden="true"
                title="Attached Files"
              />
              {" " + this.props.files.length + "  "}
              <span className="pull-right">
                <i
                  className="fa fa-user-circle fa-lg ml-1 mr-1"
                  aria-hidden="true"
                  title="Assigned To"
                />
              </span>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default CompletedItem;
