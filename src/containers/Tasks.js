import React, { Component } from "react";
import axios from "axios";

class Dashboard extends Component {
  getUserid() {
    axios
      .request({
        method: "get",
        url: "/api/auth/show/current"
      })
      .then(response => {
        console.log(response.data);
        if (response.data) {
          // window.location.href = "http://localhost:3000/tasks";
          console.log("user logged in");
          console.log(response.data);
        } else {
          console.log("user logged out");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getUserid();
  }
  render() {
    return (
      <div>
        <h1> Tasks Page </h1>
      </div>
    );
  }
}

export default Dashboard;
