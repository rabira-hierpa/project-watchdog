import React, { PureComponent } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import QuickAddModal from "../components/Tasks/QuickAddModal";
import MainFooter from "../components/Common/MainFooter";
import PageHeader from "../components/Common/PageHeader";
import IncompleteItem from "../components/Milestones/InProgress/IncompleteItem";
import axios from "axios";
import ReviewItem from "../components/Milestones/Review/ReviewItem";
import CompletedItem from "../components/Milestones/Completed/CompletedItem";
// import InProgressList from "../components/Milestones/InProgress/InProgressList";

class Milestones extends PureComponent {
  constructor(props) {
    super(props);
    this.quickadd = "Quick Add";
    this.title = "Milestones";
    this.state = {
      milestones: []
    };
    this.id = "";
  }

  componentWillMount() {}

  componentDidMount() {
    this.getMilestones();
  }

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  // Logout and reset the cookie session
  onLogout() {
    axios
      .request({
        method: "get",
        url: "/api/auth/logout"
      })
      .then(response => {
        console.log(response.data);
        window.location.href = "http://localhost:3000/";
      })
      .catch(error => {
        console.log(error);
      });
  }
  // Get all milestones of a project
  getMilestones() {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "get",
        url: "/api/milestones/all/" + this.id
      })
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            milestones: response.data.MileStone
          },
          () => {
            console.log(this.state.milestones);
          }
        );
      })
      .catch(error => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again"
        });
        console.log(error);
      });
  }
  // Handles the state when new milestone is added
  addMilestone(milestone) {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    console.log(this.id);
    axios
      .request({
        method: "put",
        url: "/api/milestones/" + this.id,
        data: {
          MileStoneTitle: milestone.title,
          MileStoneDescription: milestone.desc,
          DeadLine: milestone.deadline,
          FileLocation: "",
          Status: 1
        }
      })
      .then(response => {
        console.log(response.data);
        let allmilestones = this.state.milestones;
        allmilestones = response.data.MileStone;
        this.setState(
          {
            milestones: allmilestones
          },
          () => {
            console.log(this.state.milestones);
          }
        );
      })
      .catch(error => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again"
        });
        console.log(error);
      });
  }

  // Handles the state when milestone is edited
  onEditMilestone(milestone) {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    console.log(this.id);
    axios
      .request({
        method: "put",
        url: "/api/milestones/single/" + this.id + "/" + milestone.id,
        data: {
          MileStoneTitle: milestone.title,
          MileStoneDescription: milestone.desc,
          DeadLine: milestone.deadline,
          Status: milestone.status
        }
      })
      .then(response => {
        console.log(response.data);
        let allmilestones = this.state.milestones;
        allmilestones = response.data.MileStone;
        this.setState(
          {
            milestones: allmilestones
          },
          () => {
            console.log(this.state.milestones);
          }
        );
      })
      .catch(error => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again"
        });
        console.log(error);
      });
  }

  // Delete a milestone
  onDeleteMilestone(milestone) {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "delete",
        url: "/api/milestones/" + this.id + "/" + milestone.id
      })
      .then(response => {
        console.log(response.data);
        let allmilestones = this.state.milestones;
        allmilestones = response.data.MileStone;
        this.setState(
          {
            milestones: allmilestones
          },
          () => {
            console.log(this.state.milestones);
          }
        );
      })
      .catch(error => {
        this.setState({
          error: true,
          erro_mesg:
            "Some error occured whilet trying to fetch the data! Please try again"
        });
        console.log(error);
      });
  }

  render() {
    let incomplete, review, completed, nomilestones;
    if (this.state.milestones.length > 0) {
      incomplete = this.state.milestones.reverse().map(milestone => {
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
            />
          );
        } else {
          return null;
        }
      });
      review = this.state.milestones.reverse().map(milestone => {
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
            />
          );
        } else {
          return null;
        }
      });
      completed = this.state.milestones.reverse().map(milestone => {
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
            />
          );
        } else {
          return null;
        }
      });
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
          onLogout={this.onLogout.bind(this)}
          {...this.props}
        />
        <QuickAddModal onAddMilestone={this.addMilestone.bind(this)} />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title="Milestones" />
            <br />
            <div className="row justify-content-center ">
              <div className="col-md-8 m-auto">
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-3">
                    <div className="text-center primary-text mb-4">
                      <h3>
                        <i
                          className="fa fa-hourglass-end fg-warning-dark fa-xs"
                          aria-hidden="true"
                        />
                        <strong className="fg-warning-dark ml-2">
                          Incomplete
                        </strong>
                      </h3>
                    </div>
                    {incomplete}
                    <div className="text-center danger-text" />
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
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

Milestones.propTypes = {};

export default Milestones;
