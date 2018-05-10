import React, { Component } from "react";
import Navbar from "../components/Home/Navbar";
import LoginForm from "../components/Home/LoginForm";
import Footer from "../components/Home/Footer";
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

export default Singin;
