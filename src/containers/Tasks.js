import React, { Component } from "react";
import Axios from "axios";
import ProjectNav from "../components/Common/ProjectNav";
import QuickAddModal from "../components/Tasks/QuickAddModal";
import MainFooter from "../components/Common/MainFooter";

class Tasks extends Component {
  // Logout and reset the cookie session
  onLogout() {
    Axios.request({
      method: "get",
      url: "/api/auth/logout"
    })
      .then(response => {
        console.log(response.data);
        window.location = "http://localhost:3000/";
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <ProjectNav
          quickadd="Quick Add"
          sidebar={true}
          onLogout={this.onLogout.bind(this)}
          details={false}
        />
        <QuickAddModal />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <br />
            <div className="row justify-content-center ">
              <div className="col-md-10">
                <div className="row"> </div>
                <div className="text-danger"> </div>
              </div>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

export default Tasks;
