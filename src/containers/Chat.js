import React, { Component } from "react";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.props = props;
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
    return (
      <div>
        <h1>Chat Page</h1>
      </div>
    );
  }
}

Chat.propTypes = {};

export default Chat;
