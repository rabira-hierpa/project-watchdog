import React from "react";

const DetailsModal = () => {
  const style = {
    width: "45%",
  };
  return (
    <div
      className="modal fade right show"
      id="detailsModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-full-height modal-right modal-notify modal-info modal-sm"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-white" id="exampleModalLabel">
              Project Title
            </h5>
            <button
              type="button"
              className="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h5 className="mt-2">Team Members</h5>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#!">
                  <i
                    className="fa fa-user-circle-o fa-lg "
                    aria-hidden="true"
                  />
                  &nbsp;
                </a>
                <a href="#!">
                  <i
                    className="fa fa-user-circle-o fa-lg "
                    aria-hidden="true"
                  />
                  &nbsp;
                </a>
                <a href="#!">
                  <i
                    className="fa fa-user-circle-o fa-lg "
                    aria-hidden="true"
                  />
                  &nbsp;
                </a>
                <a href="#!">
                  <i className="fa fa-user-plus fa-lg " aria-hidden="true" />
                  <span className="">Invite</span>
                </a>
              </li>
            </ul>
            <hr className="bg-white" />
            <div className="mt-3">
              <a href="#!">
                <i className="fa fa-clock-o fa-lg " aria-hidden="true" />
                <strong className="">Next deadline Sep 28-2017</strong>
              </a>
            </div>
            <div className="mt-3">
              <a href="#!">
                <i className="fa fa-filter fa-lg " aria-hidden="true" />
                <strong className="">Filter tasks by Milestone</strong>
              </a>
            </div>
            <div className="mt-3">
              <a href="#!">
                <i className="fa fa-list-ul fa-lg " aria-hidden="true" />
                <strong className="">Approve List</strong>
              </a>
            </div>
            <div className="mt-3">
              <a href="#!">
                <i className="fa fa-check-circle-o fa-lg " aria-hidden="true" />
                <strong className="">Completed Tasks</strong>
              </a>
            </div>
            <div className="mt-3">
              <div className="mb-4">
                <a href="#!" className="mb-2">
                  <strong className="">Project Progress</strong>
                </a>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={style}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
            <div className="mt-3">
              <div className="mb-4">
                <a href="#!" className="mb-2">
                  <strong>Activity</strong>
                </a>
              </div>
            </div>
          </div>
          <hr className="bg-white" />
          <div className="modal-footer">
            <div className="container-fluid text-center">
              © 2018 Copyright:
              <a href="index.html" className="">
                ProjectWatchdog.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
