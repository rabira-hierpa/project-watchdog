import React, { Component } from "react";
import Navbar from "../components/Home/Navbar";
import Features from "../components/Home/Features";
import Footer from "../components/Home/Footer";
import LoginForm from "../components/Home/LoginForm";
import PromptSignup from "../components/Home/PromptSignup";
import Slider from "../components/Home/Slider";

class Landing extends Component {
  render() {
    return (
      <div>
        <h1> Landing page </h1>
        <Navbar />
        <Slider />
        <PromptSignup />
        <Features />
        <PromptSignup />
        <Footer />
      </div>
    );
  }
}

export default Landing;
