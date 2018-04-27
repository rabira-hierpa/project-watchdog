import React, { Component } from "react";
import Navbar from "../components/Home/Navbar";
import LoginForm from "../components/Home/LoginForm";
import Footer from "../components/Home/Footer";
class Singin extends Component {
  render() {
    return (
      <div>
        <h1>Signin page</h1>
        <Navbar />
        <LoginForm />
        <Footer />
      </div>
    );
  }
}

export default Singin;
