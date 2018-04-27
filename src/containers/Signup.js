import React from "react";
import Navbar from "../components/Home/Navbar";
import SignupForm from "../components/Home/SignupForm";
import Footer from "../components/Home/Footer";

const Signup = props => {
  return (
    <div>
      <h1>Signup Page</h1>
      <Navbar />
      <SignupForm />
      <Footer />
    </div>
  );
};

export default Signup;
