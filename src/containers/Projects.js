import React, { Component } from "react";

class MainDashboard extends Component {
  constructor(props) {
    super(props);
    this.quickadd = "New Project";
    this.title = "My Projects";
    this.state = {
      projects: [],
      erro_mesg: "",
      error: false
    };
    // this.projectid = props.location.query.id;
    // axios.defaults.headers.common["cros"] = true;
    // axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
  }

  componentWillMount() {
    // this.getUserProjects();
  }

  componentDidMount() {
    // this.getUserProjects();
  }

  render() {
    return (
      <div>
        <h1>MainDashboard Page </h1>
      </div>
    );
  }
}

export default MainDashboard;
