import React, { Component } from "react";
import Navbar from "../components/Home/Navbar";
import LoginForm from "../components/Home/LoginForm";
import Footer from "../components/Home/Footer";
import withNavigation from "../utils/wrapper/withNavigator";
class Singin extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <LoginForm {...this.props} /> <Footer />
      </div>
    );
  }
}

export default withNavigation(Singin);
