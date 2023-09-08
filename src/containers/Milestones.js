import axios from "axios";
import React, { PureComponent } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import QuickAddModal from "../components/Tasks/QuickAddModal";
import MainFooter from "../components/Common/MainFooter";
import PageHeader from "../components/Common/PageHeader";
import IncompleteItem from "../components/Milestones/InProgress/IncompleteItem";
import ReviewItem from "../components/Milestones/Review/ReviewItem";
import CompletedItem from "../components/Milestones/Completed/CompletedItem";

class Milestones extends PureComponent {
  constructor(props) {
    super(props);
    this.quickadd = "Quick Add";
    this.title = "Milestones";
    this.state = {
      milestones: [],
      userId: "",
      searchTerm: "",
      type: 0,
    };
    this.id = "";
    this.user = "";
  }

  UNSAFE_componentWillMount() {
    this.getUserid();
  }

  componentDidMount() {
    // this.getUserid();
    this.getMilestones();
  }
  // Get the id of the logged in user
  getUserid() {
    axios
      .request({
        method: "get",
        url: "/api/auth/show/current",
      })
      .then((response) => {
        this.user = response.data._id;
        this.setState({
          userId: response.data._id,
          type: response.data.Type,
        });
        console.log("User id " + this.state.userId);
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
        window.location.href = "http://localhost:3000/";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Get completed milestones
  getCompletedMilesStones() {
    let completed = this.state.milestones.filter((milestones) => {
      return milestones.Status === 3;
    });
    return completed;
  }

  // Get all milestones of a project
  getMilestones() {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "get",
        url: "/api/milestones/all/" + this.id,
      })
      .then((response) => {
        this.setState({
          milestones: response.data.MileStone,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again",
        });
        console.log(error);
      });
  }
  // Handles the state when new milestone is added
  addMilestone(milestone) {
    let id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "put",
        url: "/api/milestones/" + id + "/" + this.state.userId,
        data: {
          MileStoneTitle: milestone.title,
          MileStoneDescription: milestone.desc,
          DeadLine: milestone.deadline, // Change the file gets uploaded
          FileLocation: "",
          Status: 1,
        },
      })
      .then((response) => {
        console.log(response.data.MileStone);
        let allmilestones = this.state.milestones;
        allmilestones = response.data.MileStone;
        this.setState({
          milestones: allmilestones,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again",
        });
        console.log(error);
      });
    this.calcuateProgress();
  }

  // Handles the state when milestone is edited
  onEditMilestone(milestone) {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "put",
        url:
          "/api/milestones/single/" +
          this.id +
          "/" +
          milestone.id +
          "/" +
          this.state.userId,
        data: {
          MileStoneTitle: milestone.title,
          MileStoneDescription: milestone.desc,
          DeadLine: milestone.deadline,
          Status: milestone.status,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Increase project progress when a milestone completes
        if (milestone.status === "3") {
          this.calcuateProgress();
        }
        let allmilestones = this.state.milestones;
        allmilestones = response.data.MileStone;
        this.setState({
          milestones: allmilestones,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured while trying to fetch the data! Please try again",
        });
        console.log(error);
      });
  }
  // Calculate progress on new milestone, completed milestone and deleted milestone
  calcuateProgress() {
    let progress =
      (this.getCompletedMilesStones().length / this.state.milestones.length) *
      100;

    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "put",
        url: "/api/projects/progress/" + this.id,
        data: {
          Progress: progress,
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log("progress added to " + progress);
      })
      .catch((error) => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again",
        });
        console.log(error);
      });
  }

  // Delete a milestone
  onDeleteMilestone(milestone) {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "put",
        url:
          "/api/milestones/delete/" +
          this.id +
          "/" +
          milestone.id +
          "/" +
          this.state.userId,
      })
      .then((response) => {
        console.log(response.data);
        let allmilestones = this.state.milestones;
        allmilestones = response.data.MileStone;
        this.setState({
          milestones: allmilestones,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again",
        });
        console.log(error);
      });
    this.calcuateProgress();
  }

  // Search Milestone
  searchHandler(e) {
    this.setState({
      searchTerm: e.target.value,
    });
    e.preventDefault();
  }

  statusChangeHandler = (milestone) => {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "put",
        url:
          "/api/milestones/single/" +
          this.id +
          "/" +
          milestone._id +
          "/" +
          this.state.userId,
        data: {
          MileStoneTitle: milestone.MileStoneTitle,
          MileStoneDescription: milestone.MileStoneDescription,
          DeadLine: milestone.DeadLine,
          Status: milestone.Status,
        },
      })
      .then((response) => {
        console.log(response.data);
        let allmilestones = this.state.milestones;
        allmilestones = response.data.MileStone;
        this.setState({
          milestones: allmilestones,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again",
        });
        console.log(error);
      });
  };

  onDrageOver = (e) => {
    e.preventDefault();
  };
  onDragStart = (e, id) => {
    // e.preventDefault();
    e.dataTransfer.setData("id", id);
    console.log(id);
  };
  onDrop = (e, status) => {
    let id = e.dataTransfer.getData("id");
    let milestones = this.state.milestones.filter((milestone) => {
      if (milestone._id === id) {
        milestone.Status = status;
        return milestone;
      }
      return null;
    });
    console.log(milestones[0]);
    this.statusChangeHandler(milestones[0]);
    e.preventDefault();
  };
  render() {
    let incomplete, review, completed, nomilestones, search;
    if (this.state.milestones.length > 0) {
      incomplete = this.state.milestones
        .sort((first, second) => {
          return (
            new Date(second.DeadLine).getTime() -
            new Date(first.DeadLine).getTime()
          );
        })
        .filter(searchMilestones(this.state.searchTerm))
        .map((milestone) => {
          if (milestone.Status === 1) {
            return (
              <IncompleteItem
                key={milestone._id}
                id={milestone._id}
                title={milestone.MileStoneTitle}
                desc={milestone.MileStoneDescription}
                deadline={milestone.DeadLine}
                status={milestone.Status}
                onEdit={this.onEditMilestone.bind(this)}
                onDelete={this.onDeleteMilestone.bind(this)}
                onDragStart={this.onDragStart.bind(this)}
              />
            );
          } else {
            return null;
          }
        });
      review = this.state.milestones
        .sort((first, second) => {
          return (
            new Date(second.DeadLine).getTime() -
            new Date(first.DeadLine).getTime()
          );
        })
        .filter(searchMilestones(this.state.searchTerm))
        .map((milestone) => {
          if (milestone.Status === 2) {
            return (
              <ReviewItem
                key={milestone._id}
                id={milestone._id}
                title={milestone.MileStoneTitle}
                desc={milestone.MileStoneDescription}
                deadline={milestone.DeadLine}
                status={milestone.Status}
                onEdit={this.onEditMilestone.bind(this)}
                onDelete={this.onDeleteMilestone.bind(this)}
                onDragStart={this.onDragStart.bind(this)}
              />
            );
          } else {
            return null;
          }
        });
      completed = this.state.milestones
        .sort((first, second) => {
          return (
            new Date(second.DeadLine).getTime() -
            new Date(first.DeadLine).getTime()
          );
        })
        .filter(searchMilestones(this.state.searchTerm))
        .map((milestone) => {
          if (milestone.Status === 3) {
            return (
              <CompletedItem
                key={milestone._id}
                id={milestone._id}
                title={milestone.MileStoneTitle}
                desc={milestone.MileStoneDescription}
                deadline={milestone.DeadLine}
                status={milestone.Status}
                onEdit={this.onEditMilestone.bind(this)}
                onDelete={this.onDeleteMilestone.bind(this)}
                advisor={this.state.type}
              />
            );
          } else {
            return null;
          }
        });
      search = (
        <div className="col-lg-6 col-lg-offset-3">
          <div className="input-group md-form form-sm">
            <input
              id="searchField"
              type="text"
              className="form-control form-control-md text-center "
              placeholder="Search Milestones"
              aria-label="Search"
              onChange={this.searchHandler.bind(this)}
            />
            <div className="input-group-append">
              <span className="form-inline">
                <i
                  className="fa fa-search fa-lg text-primary"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      nomilestones = (
        <div className="col-lg-12">
          <div className="tx-4 text-primary my-5 text-center ">
            <img className="img-fluid" src="./img/beach1.png" alt="Desert" />
            <br />
            <br />
            Looks like you have no milestones. Create a new milestone by click
            on quick add.
          </div>
        </div>
      );
    }
    return (
      <div>
        <ProjectNav
          quickadd="Quick Add"
          sidebar={true}
          details={true}
          projects={true}
          id={this.state.id}
          onLogout={this.onLogout.bind(this)}
          projectid={new URLSearchParams(this.props.location.search).get("id")}
          {...this.props}
        />
        <QuickAddModal
          onAddMilestone={this.addMilestone.bind(this)}
          parent="milestone"
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title="Milestones" />
            <br />
            <div className="row justify-content-center">
              {search}
              <div className="col-lg-10 m-auto py-3">
                <div className="row">
                  <div
                    className="col-lg-4 col-md-6 mb-3"
                    onDragOver={(e) => this.onDrageOver(e)}
                    onDrop={(e) => this.onDrop(e, 1)}
                  >
                    <div className="text-center primary-text mb-4">
                      <h3>
                        <i
                          className="fa fa-hourglass-end fg-warning-dark fa-xs"
                          aria-hidden="true"
                        />
                        <strong className="fg-warning-dark ml-2">
                          In progress
                        </strong>
                      </h3>
                    </div>
                    {incomplete}
                    <div className="text-center danger-text" />
                  </div>
                  <div
                    className="col-lg-4 col-md-6 mb-3"
                    onDragOver={(e) => this.onDrageOver(e)}
                    onDrop={(e) => this.onDrop(e, 2)}
                  >
                    <div className="text-center primary-text mb-4">
                      <h3>
                        <i
                          className="fa fa-tasks fg-danger-dark fa-xs"
                          aria-hidden="true"
                        />
                        <strong className="fg-danger-dark ml-2">Review</strong>
                      </h3>
                    </div>
                    {review}
                    <div className="text-center danger-text" />
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                    <div className="text-center primary-text mb-4">
                      <h3>
                        <i
                          className="fa fa-check-circle-o fa-xs fg-success-dark"
                          aria-hidden="true"
                        />
                        <strong className="fg-success-dark ml-2">
                          Completed
                        </strong>
                      </h3>
                    </div>
                    {completed}
                    <div className="text-center danger-text" />
                  </div>
                  {nomilestones}
                </div>
              </div>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

function searchMilestones(term) {
  return function (x) {
    return (
      x.MileStoneTitle.toLowerCase().includes(term.toLowerCase()) ||
      x.MileStoneDescription.toLowerCase().includes(term.toLowerCase()) ||
      !term
    );
  };
}

Milestones.propTypes = {};

export default Milestones;
