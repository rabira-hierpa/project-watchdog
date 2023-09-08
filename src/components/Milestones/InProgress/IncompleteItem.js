import React, { Component } from "react";
import EditMilestone from "../EditMilestone";
import { ModalManager } from "react-dynamic-modal/lib/Modal";

class IncompleteItem extends Component {
  constructor(props) {
    super(props);
    this.deadline = new Date(this.props.deadline);
    this.state = {
      milestone: {},
    };
  }
  UNSAFE_componentWillMount() {
    this.setState({
      milestone: this.props,
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
      <EditMilestone
        style={modalStyle}
        data={this.state.milestone}
        onRequestClose={() => true}
      />,
    );
  }

  render() {
    let openModal;
    if (this.props.advisor === 3) {
      openModal = this.openModal.bind(this);
    } else {
      openModal = this.openModal.bind(this);
    }
    return (
      <div
        className="grid"
        onClick={openModal}
        title="Click this to edit or delete"
      >
        <div
          draggable
          onDragStart={(e) => this.props.onDragStart(e, this.props.id)}
          className="card hoverable item"
          data-toggle="modal"
          data-target="#editMilestoneModal21"
        >
          <div className="card-header peach-gradient">
            <a className="card-title text-white" title="Milestone name">
              {this.props.title}
              <span className="pull-right" title="Milestone deadline">
                {new Date(this.props.deadline).toDateString().substr(0, 10)}
              </span>
            </a>
          </div>
          <div className="card-body">
            <p className="card-text">{this.props.desc}</p>
            <div className="align-self-left" />
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default IncompleteItem;
