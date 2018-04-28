import React, { Component } from "react";
import PropTypes from "prop-types";

class CreateProject extends Component {
  render() {
    return (
      <div
        className="modal fade mask"
        id="createProjectModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createProjectModalLabel"
        aria-hidden="true"
        style={{ height: "150px !important" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h5 className="modal-title" id="createProjectModalLabel">
                {this.props.title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="">
                <form>
                  <div className="md-form">
                    <label htmlFor="projectTitle">Project Title</label>
                    <input
                      type="email"
                      id="#projectTitle"
                      className="form-control"
                    />
                  </div>
                  <br />
                  <div className="md-form">
                    <label htmlFor="descrpiton">Description</label>
                    <textarea
                      type="text"
                      id="#descrpiton"
                      className="form-control md-textarea"
                      rows="5"
                    />
                  </div>
                  <label htmlFor="date-picker-example">Deadline</label>
                  <div className="md-form">
                    <input
                      placeholder="Selected date"
                      type="text"
                      id="date-picker-example"
                      className="form-control datepicker"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <button className="btn btn-success" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProject.propTypes = {
  title: PropTypes.string
};

export default CreateProject;
