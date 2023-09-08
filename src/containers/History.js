import axios from "axios";
import React, { Component } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";

class History extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      userId: "",
      history: [],
    };
    this.quickadd = "Quick Add";
  }

  UNSAFE_componentWillMount() {
    this.getUserid();
    // this.getProjectHistory();
  }

  // Get the id of the logged in user
  getUserid() {
    axios
      .request({
        method: "get",
        url: "/api/auth/show/current",
      })
      .then((response) => {
        this.user = response.data;
        this.setState({
          userId: response.data._id,
        });
      })
      .catch((error) => {
        // User is not logged in
        window.location.href = "http://localhost:3000/signin";
      });
  }
  // Logout and reset the cookie session
  onLogout() {
    axios
      .request({
        method: "get",
        url: "/api/auth/logout",
      })
      .then((response) => {
        console.log(response.data);
        window.location = "http://localhost:3000/";
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Get project history
  getProjectHistory() {
    let id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "get",
        url: "/api/history/" + id,
      })
      .then((response) => {
        this.setState({
          history: response.data.History,
        });
        console.log(this.state.history);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getProjectHistory();
  }

  render() {
    let allHistory;
    if (this.state.history.length > 0) {
      allHistory = this.state.history.reverse().map((history, index) => {
        if (history.Type === "Milestone") {
          return (
            <tr key={index}>
              <td> {new Date(history.Date).toDateString().substr(0, 10)}</td>
              <td> {history.Event}</td>
              <td>
                <span className="badge blue ml-1">
                  {history.Type.toUpperCase()}
                </span>
              </td>
              <td> {history.UserName}</td>
            </tr>
          );
        } else if (history.Type === "Task") {
          return (
            <tr key={index}>
              <td> {new Date(history.Date).toDateString().substr(0, 10)}</td>
              <td> {history.Event}</td>
              <td>
                <span className="badge amber darken-3 fa-lg-4 ml-1">
                  {history.Type}
                </span>
              </td>
              <td> {history.UserName}</td>
            </tr>
          );
        } else {
          return (
            <tr key={index}>
              <td> {new Date(history.Date).toDateString().substr(0, 10)}</td>
              <td> {history.Event}</td>
              <td>
                <span className="badge amber fa-lg-4 ml-1">{history.Type}</span>
              </td>
              <td> {history.UserName}</td>
            </tr>
            // <li key={index} className="list-group-item">{new Date(history.Date).toDateString().substr(0,10) + " - " + history.Event + " by " + history.UserName }</li>
          );
        }
      });
    }
    return (
      <div>
        <ProjectNav
          quickadd=""
          sidebar={true}
          details={true}
          projects={true}
          id={this.state.userId}
          onLogout={this.onLogout.bind(this)}
          projectid={new URLSearchParams(this.props.location.search).get("id")}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title="Project History" />
            <br />
            <div className="row justify-content-center ">
              <div className="col-md-8 m-auto">
                <table className="table table-stripped">
                  <thead className="blue darken-3 text-white">
                    <tr>
                      <th scope="col">
                        <i className="fa fa-calendar pr-2" aria-hidden="true" />{" "}
                        Date
                      </th>
                      <th scope="col">
                        <i className="fa fa-edit pr-2" aria-hidden="true" />{" "}
                        Event
                      </th>
                      <th scope="col">
                        <i className="fa fa-edit pr-2" aria-hidden="true" />{" "}
                        Event Type
                      </th>
                      <th scope="col">
                        <i
                          className="fa fa-user-circle-o pr-2"
                          aria-hidden="true"
                        />{" "}
                        Member
                      </th>
                    </tr>
                  </thead>
                  <tbody>{allHistory}</tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

History.propTypes = {};

export default History;
