import React, { Component } from "react";
import { Link } from "react-router";
import Axios from "../axios-instance";
import MainDashboard from "../../MainDashboard";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      emailError: false,
      passwdError: false
    };
  }

  onFnameChange(e) {
    this.setState({
      user: {
        fname: e.target.value,
        lname: this.state.user.lname,
        email: this.state.user.email,
        passwd: this.state.user.passwd,
        bio: this.state.user.bio,
        dep: this.state.user.dep
      }
    });
  }
  onLnameChange(e) {
    this.setState({
      user: {
        fname: this.state.user.fname,
        lname: e.target.value,
        email: this.state.user.email,
        passwd: this.state.user.passwd,
        bio: this.state.user.bio,
        dep: this.state.user.dep
      }
    });
  }

  onEmailChange(e) {
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    let email = e => {
      console.log(re.test(String(e.target.value).toLocaleLowerCase()));
      return re.test(String(e.target.value).toLowerCase());
    };

    if (re.test(String(e.target.value).toLowerCase())) {
      this.setState({
        emailError: false,
        user: {
          fname: this.state.user.fname,
          lname: this.state.user.lname,
          email: e.target.value,
          passwd: this.state.user.passwd,
          bio: this.state.user.bio,
          dep: this.state.user.dep
        }
      });
    } else if (e.target.value === "") {
      this.setState({ emailError: false });
    } else {
      this.setState({ emailError: true });
    }
  }
  onPasswordChange(e) {
    let re = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm;
    let passwd = e => {
      return re.test(String(e.target.value));
    };
    if (re.test(String(e.target.value))) {
      console.log(e.target.value);
      this.setState({
        passwdError: false,
        user: {
          fname: this.state.user.fname,
          lname: this.state.user.lname,
          email: this.state.user.email,
          passwd: e.target.value,
          bio: this.state.user.bio,
          dep: this.state.user.dep
        }
      });
    } else if (e.target.value === "") {
      this.setState({ passwdError: false });
    } else {
      this.setState({ passwdError: true });
    }
  }

  onBioChange(e) {
    this.setState({
      user: {
        fname: this.state.user.fname,
        lname: this.state.user.lname,
        email: this.state.user.email,
        passwd: this.state.user.passwd,
        bio: e.target.value,
        dep: this.state.user.dep
      }
    });
  }

  onDepChange(e) {
    this.setState({
      user: {
        fname: this.state.user.fname,
        lname: this.state.user.lname,
        email: this.state.user.email,
        passwd: this.state.user.passwd,
        bio: this.state.user.bio,
        dep: e.target.value
      }
    });
  }

  singinUser(user) {
    Axios.request({
      method: "post",
      url: "/auth/signup/local",
      data: {
        Fname: user.fname,
        Lname: user.lname,
        Email: user.email,
        Password: user.passwd,
        Department: user.dep,
        OtherDescription: user.bio
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again"
        });
      });
  }
  onSubmit(e) {
    if (!this.state.emailError && !this.state.passwdError) {
      this.singinUser(this.state.user);
    }
    e.preventDefault();
  }
  render() {
    let emailError, passwdError;
    if (this.state.emailError) {
      emailError = <div className="text-danger">Invalid Email address</div>;
    }
    if (this.state.passwdError) {
      passwdError = (
        <div className="text-danger">
          Password should be at least one capital letter,one small letter and 8
          character length
        </div>
      );
    }
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-5">
            <form
              className="form-elegant"
              method="POST"
              onSubmit={this.onSubmit.bind(this)}
            >
              <div className="card">
                <div className="card-header form-header text-center text-white aqua-gradient">
                  <h3>
                    <i className="fa fa-lock" />
                    Sign Up
                  </h3>
                </div>
                <div className="card-body mx-4">
                  <div className="md-form">
                    <i className="fa fa-address-card prefix grey-text" />
                    <input
                      type="text"
                      id="Form-fname"
                      name="fname"
                      className="form-control"
                      onChange={this.onFnameChange.bind(this)}
                      required
                    />
                    <label htmlFor="Form-fname">Your First Name</label>
                  </div>
                  <div className="md-form">
                    <i className="fa fa-user prefix grey-text" />
                    <input
                      type="text"
                      id="Form-lname"
                      name="lname"
                      className="form-control"
                      onChange={this.onLnameChange.bind(this)}
                      required
                    />
                    <label htmlFor="Form-lname">Your Last Name</label>
                  </div>
                  <div className="md-form">
                    <i className="fa fa-envelope prefix grey-text" />
                    <input
                      type="text"
                      id="Form-email"
                      className="form-control"
                      autoComplete="true"
                      onChange={this.onEmailChange.bind(this)}
                      required
                    />
                    <label htmlFor="Form-email">Your email</label>
                  </div>
                  {emailError}
                  <div className="md-form">
                    <i className="fa fa-lock prefix grey-text" />
                    <input
                      type="password"
                      id="Form-pass1"
                      className="form-control"
                      onChange={this.onPasswordChange.bind(this)}
                      required
                    />
                    <label htmlFor="Form-pass1">Your password</label>
                  </div>
                  {passwdError}
                  <div className="md-form">
                    <i className="fa fa-pencil prefix grey-text" />
                    <textarea
                      type="text"
                      id="bio"
                      className="md-textarea form-control"
                      onChange={this.onBioChange.bind(this)}
                      rows="2"
                    />
                    <label htmlFor="bio">
                      Bio
                      <span>(optional)</span>{" "}
                    </label>
                  </div>
                  <span htmlFor="">Your Department</span>
                  <div className="md-form">
                    <select
                      className="browser-default"
                      searchable="Search Your department"
                      onChange={this.onDepChange.bind(this)}
                      id="form-department"
                      defaultValue={0}
                      required
                    >
                      <option
                        value="0"
                        disabled
                        style={{
                          color: "grey"
                        }}
                      >
                        Choose Your Department
                      </option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="2">Mathimatics</option>
                      <option value="3">Biology</option>
                      <option value="4">Chemeistry</option>
                      <option value="5">Civil Eng.</option>
                      <option value="6">Sport Science</option>
                      <option value="7">Statistics</option>
                      <option value="8">Physics</option>
                      <option value="9">Information Science</option>
                      <option value="10">Software Eng.</option>
                    </select>
                  </div>
                  <div className="text-center mb-3">
                    <button
                      type="submit"
                      className="btn aqua-gradient btn-rounded z-depth-1a"
                    >
                      Sign Up
                    </button>
                  </div>
                  <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                    or Sign up with:
                  </p>
                  <div className="row my-3 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-white btn-rounded z-depth-1a"
                    >
                      <i className="fa fa-google-plus blue-text" />
                      <span className="text-primary h6">Google</span>
                    </button>
                  </div>
                </div>
                <div className="modal-footer mx-5 pt-3 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Already signed up!
                    <a href="/signin" className="blue-text ml-1">
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupForm;
