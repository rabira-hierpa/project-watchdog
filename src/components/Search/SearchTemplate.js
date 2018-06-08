import React, { PureComponent } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Axios from "axios";
class SearchTemeplate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      memberNames: []
    };
    this.members = [];
  }

  UNSAFE_componentWillMount(nextState) {
    // console.log(nextState);
    this.props.members.map((member, index) => {
      return this.getUserName(member);
    });
  }

  componentDidMount() {}

  getUserName(member) {
    Axios.request({
      method: "get",
      url: "/api/users/name/" + member
    })
      .then(response => {
        let currentMembers = [...this.state.memberNames];
        currentMembers.push(response.data.Fname);
        this.setState({
          memberNames: currentMembers
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let allmembers;
    if (this.state.memberNames.length > 0) {
      allmembers = this.state.memberNames.map((member, index) => {
        return (
          <span key={index}>
            <i className="fa fa-user-circle fa-lg" aria-hidden="true" />
            &nbsp;
            {this.state.memberNames[index]}
            &nbsp; &nbsp;
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
            <NavLink
              to={"/dashboard?id=" + this.props.id}
              className="card-title"
            >
              <h4>{this.props.title}</h4>
            </NavLink>
            <hr />
            <p className="card-text d-block text-truncate">
              {this.props.description}
            </p>
            {allmembers}
            <a href="#!" className="link-text">
              <h5 className="pull-right">
                Join Project <i className="fa fa-chevron-right" />
              </h5>
            </a>
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

export default withRouter(SearchTemeplate);