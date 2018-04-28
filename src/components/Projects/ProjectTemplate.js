import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";
class ProjectTemplate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      memberNames: []
    };
    this.members = [];
  }

  componentWillMount(nextState) {
    console.log(nextState);
    this.props.members.map((member, index) => {
      console.log("called getusername");
      this.getUserName(member);
    });
    console.log("called compWillMount in project Template");
  }

  componentDidMount() {
    console.log(this.state.memberNames);
    console.log("called compDidMount in project Template");
  }

  getUserName(member) {
    console.log("[ProjectTemplate.js] Inside getUserName");
    Axios.request({
      method: "get",
      url: "/api/users/name/" + member
    })
      .then(response => {
        console.log(response.data.Fname);
        let currentMembers = [...this.state.memberNames];
        currentMembers.push(response.data.Fname);
        this.setState({
          memberNames: currentMembers
        });
        // this.members.push(response.data.Fname);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let allmembers;
    console.log("called render in project Template");
    if (this.state.memberNames.length > 0) {
      console.log(this.state.memberNames);
      this.state.memberNames.map((member, index) => {
        allmembers = (
          <span>
            <i
              key={index}
              className="fa fa-user-circle fa-lg"
              aria-hidden="true"
            />
            {this.state.memberNames[index]}
          </span>
        );
      });
    }
    return (
      <div className="col-md-4">
        <div className="card hoverable">
          <div className="view overlay" />
          <div className="card-body">
            {
              //<a href="" className="activator p-3 mr-2"><i className="fa fa-share-alt"></i></a>
            }
            <NavLink to={"/tasks?id=" + this.props.id} className="card-title">
              <h4>{this.props.title}</h4>
            </NavLink>
            <hr />
            <p className="card-text d-block text-truncate">
              {this.props.description}
            </p>
            {allmembers}
            <NavLink to={"/tasks?id=" + this.props.id} className="link-text">
              <h5 className="pull-right">
                Open Project <i className="fa fa-chevron-right" />
              </h5>
            </NavLink>
            <br />
            <div
              className="progress"
              style={{ height: "15px" }}
              title={"Progress : " + this.props.progress + "%"}
            >
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                role="progressbar"
                style={{
                  width: this.props.progress + "%",
                  height: "15px"
                }}
                aria-valuenow={this.props.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {this.props.progress}%
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default ProjectTemplate;
