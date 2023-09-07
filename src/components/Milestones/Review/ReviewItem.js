import React, { Component } from "react";
import EditMilestone from "../EditMilestone";
import { ModalManager } from "react-dynamic-modal/lib/Modal";

class ReviewItem extends Component {
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
      />
    );
  }
  render() {
    return (
      <div
        className="grid"
        onClick={this.openModal.bind(this)}
        title="Click this to edit or delete"
      >
        <div
          className="card hoverable item"
          data-toggle="modal"
          draggable
          onDragStart={(e) => this.props.onDragStart(e, this.props.id)}
        >
          <div className="card-header red darken-2">
            <a className="card-title text-white">
              {this.props.title}
              <span className="pull-right">
                {new Date(this.props.deadline).toDateString().substr(0, 10)}
              </span>
            </a>
          </div>
          <div className="card-body">
            <p className="card-text text-truncate">{this.props.desc}</p>
            <div className="align-self-left" />
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default ReviewItem;
