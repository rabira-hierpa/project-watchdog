import React, { Component } from "react";

class AttachedFiles extends Component {
  constructor(props) {
    super(props);
    this.quickadd = "Quick Add";
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    let style = {
      display: "block",
      "max-height": "300px;",
      " overflow-y": "auto;",
      "-ms-overflow-style": " -ms-autohiding-scrollbar;"
    };
    return (
      <div>
        <h1>AttachedFiles Page</h1>
      </div>
    );
  }
}

AttachedFiles.propTypes = {};

export default AttachedFiles;
