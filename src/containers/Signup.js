import React from "react";
import Navbar from "../components/Home/Navbar";
import SignupForm from "../components/Home/SignupForm";
import Footer from "../components/Home/Footer";
import withNavigation from "../utils/wrapper/withNavigator";

const Signup = (props) => {
  return (
    <div>
      <Navbar />
      <SignupForm {...props} />
      <Footer />
    </div>
  );
};

export default withNavigation(Signup);
