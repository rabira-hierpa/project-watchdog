import React, { PureComponent } from "react";

class Archive extends PureComponent {
  constructor(props) {
    super(props);
    this.quickadd = "New Project";
    this.title = "Project Repository";
    this.state = {
      projects: [],
      error: false,
      erro_mesg: ""
    };
  }

  render() {
    return (
      <div>
        <h1>Archive Page</h1>
      </div>
    );
  }
}

export default Archive;
