import axios from "axios";
import React, { Component } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";
import withNavigation from "../utils/wrapper/withNavigator";
import { httpService } from "../utils/helpers";
import { BASE_URL } from "../utils/constants";

class AttachedFiles extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      id: "",
    };
    this.quickadd = "Quick Add";
  }

  UNSAFE_componentWillMount() {
    this.getUserid();
  }

  // Get the id of the logged in user
  getUserid() {
    httpService
      .get(`${BASE_URL}/api/auth/show/current`)
      .then((response) => {
        if (response.data._id) {
          this.setState({
            id: response.data._id,
          });
          this.userName(response.data._id);
        }
      })
      .catch((error) => {
        // User is not logged in
        this.props.navigate("/signin");
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

  render() {
    return (
      <div>
        <ProjectNav
          quickadd=""
          sidebar={true}
          details={true}
          id={this.state.id}
          projects={true}
          onLogout={this.onLogout.bind(this)}
          projectid={new URLSearchParams(this.props.location.search).get("id")}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title="Project Files" />
            <br />
            <div className="row justify-content-center ">
              <div className="col-md-8 m-auto" />
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

AttachedFiles.propTypes = {};

export default withNavigation(AttachedFiles);
