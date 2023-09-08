import React, { Component } from "react";
import { NavLink, Navigate, Route } from "react-router-dom";
import Axios from "axios";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      emailError: false,
      passwdError: false,
      loginError: false,
    };
  }

  onEmailChange(e) {
    this.setState({
      loginError: false,
    });
    let re =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    if (re.test(String(e.target.value).toLowerCase())) {
      this.setState({
        emailError: false,
        user: {
          email: e.target.value,
          passwd: this.state.user.passwd,
        },
      });
    } else if (e.target.value === "") {
      this.setState({
        emailError: true,
      });
    } else {
      this.setState({
        emailError: true,
      });
    }
  }

  onPasswordChange(e) {
    this.setState({
      loginError: false,
    });
    let re = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm;
    if (re.test(String(e.target.value))) {
      this.setState({
        passwdError: false,
        user: {
          email: this.state.user.email,
          passwd: e.target.value,
        },
      });
    } else if (e.target.value === "") {
      this.setState({
        passwdError: false,
      });
    } else {
      this.setState({
        passwdError: true,
      });
    }
  }

  getUserid() {
    Axios.request({
      method: "get",
      url: "/api/auth/show/current",
    })
      .then((response) => {
        this.user = response.data;
        console.log(response.data.type);
        if (response.data.Type === "1") {
          this.props.history.push("/admin-dashboard?id" + response.data._id);
        } else if (response.data.Type === "3") {
          this.props.history.push("/projects?id=" + response.data._id);
        }
      })
      .catch((error) => {
        // User is not logged in
        <Route exact path="/projects">
          {this.state.loginError ? <LoginForm /> : <Navigate to="/projects" />}
        </Route>;
      });
  }

  signinUser(user) {
    Axios.request({
      method: "post",
      url: "/api/auth/login/local",
      // mode: 'no-cors',
      // headers: {
      // 	'Access-Control-Allow-Origin': '*',
      // 	'Content-Type': 'application/json',
      // },
      // withCredentials: true,
      // supportsCredentials: true,
      // credentials: 'same-origin',
      data: {
        Email: user.email,
        Password: user.passwd,
      },
    })
      .then((response) => {
        if (response.data.message === "success") {
          this.getUserid();
          <Route exact path="/projects">
            {!this.state.loginError ? (
              <Navigate to="/projects" />
            ) : (
              <LoginForm />
            )}
          </Route>;
        } else {
          this.setState({
            loginError: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again",
        });
      });
  }

  googleSignin() {
    window.location.href = "/api/auth/google";
  }
  onSubmit(e) {
    if (this.state.emailError === false && this.state.passwdError === false) {
      this.signinUser(this.state.user);
    }
    e.preventDefault();
  }
  render() {
    // console.log(this.props.history);
    let emailError, passwdError, loginError, connError;
    if (this.state.emailError) {
      emailError = <div className="text-danger"> Invalid Email address </div>;
    }
    if (this.state.passwdError) {
      passwdError = (
        <div className="text-danger">
          Password should be at least one capital letter, one small letter and 8
          character length
        </div>
      );
    }
    if (this.state.loginError) {
      loginError = (
        <div className="text-danger">
          Invalid email or password. Please try again
        </div>
      );
    }
    if (this.state.error) {
      connError = (
        <div
          className="alert alert-danger alert-dismissible fade show text-center"
          role="alert"
        >
          <strong>Error!</strong> We could not sign you in for the moment.This
          is probably a problem with your internet connection Please{" "}
          <a href="/signin"> try again.</a>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    return (
      <div className="container mt-5">
        {connError}
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-5">
            <section className="form-elegant">
              <div className="card">
                <div className="card-header form-header text-center text-white blue-gradient">
                  <h3>
                    <i className="fa fa-lock" />
                    Sign in
                  </h3>
                </div>
                <form action="/home" onSubmit={this.onSubmit.bind(this)}>
                  <div className="card-body mx-4">
                    {loginError}
                    <div className="md-form">
                      <i className="fa fa-envelope prefix grey-text" />
                      <input
                        type="text"
                        id="Form-email1"
                        className="form-control"
                        onChange={this.onEmailChange.bind(this)}
                        required
                      />
                      <label htmlFor="Form-email1"> Your email </label>
                    </div>
                    {emailError}
                    <div className="md-form pb-3">
                      <i className="fa fa-lock prefix grey-text" />
                      <input
                        type="password"
                        id="Form-pass1"
                        className="form-control"
                        required
                        onChange={this.onPasswordChange.bind(this)}
                      />
                      <label htmlFor="Form-pass1"> Your password </label>
                      {passwdError}
                      <p className="font-small blue-text d-flex justify-content-end">
                        Forgot
                        <NavLink
                          to="/forgetPassword"
                          className="blue-text ml-1"
                        >
                          Password ?
                        </NavLink>
                      </p>
                    </div>
                    <div className="text-center mb-3">
                      <button
                        type="submit"
                        onSubmit={this.onSubmit.bind(this)}
                        className="btn blue-gradient btn-rounded z-depth-1a"
                      >
                        Sign in
                      </button>
                    </div>
                    <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                      or Sign in with :
                    </p>
                    <div className="row my-3 d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-white btn-rounded z-depth-1a"
                        onClick={this.googleSignin.bind(this)}
                      >
                        <i className="fa fa-google-plus blue-text" />
                        <span className="text-primary text-center">Google</span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="modal-footer mx-5 pt-3 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Not a member ?
                    <NavLink to="/signup" className="blue-text ml-1">
                      Sign Up
                    </NavLink>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
