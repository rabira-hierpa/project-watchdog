import React, { Component } from "react";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        title: "",
        desc: "",
        deadline: "",
        assignedTo: "",
      },
    };
  }

  onSubmit(e) {
    if (this.state.task.title !== "") {
      this.props.onAddTask(this.state.task);
      this.setState({
        task: {
          title: "",
        },
      });
      e.target.value = "";
    }
    console.log(this.state.task);
    e.preventDefault();
  }

  onChange(e) {
    let date = new Date().toISOString();
    this.setState({
      task: {
        title: e.target.value,
        desc: "",
        deadline: date,
        assignedTo: this.props.currentUser,
      },
    });
  }

  render() {
    return (
      <div>
        <form
          className="form-inline justify-content-center"
          onSubmit={this.onSubmit.bind(this)}
        >
          <input
            onChange={this.onChange.bind(this)}
            className="form-control w-50"
            type="text"
            placeholder="Add task"
            aria-label="add task"
            required
            value={this.state.task.title}
          />
          <a href="" onClick={this.onSubmit.bind(this)}>
            <i
              className="fa fa-plus-circle fa-2x bg-primrary"
              aria-hidden="true"
            />
          </a>
        </form>
      </div>
    );
  }
}

export default AddItem;
