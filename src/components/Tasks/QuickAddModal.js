import React from "react";

const QuickAddModal = props => {
  console.log(props.data);
  return (
    <div
      className="modal fade"
      id="quickAddModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="quickAddModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="quickAddModalLabel">
              Quick Add
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
            <div className="tabs-wrapper">
              <ul className="nav classic-tabs tabs-blue" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link waves-light active"
                    data-toggle="tab"
                    href="#task"
                    role="tab"
                  >
                    <i className="fa fa-th-list fa-2x" aria-hidden="true" />
                    <br /> Task
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link waves-light"
                    data-toggle="tab"
                    href="#milestone"
                    role="tab"
                  >
                    <i className="fa fa-compass fa-2x" aria-hidden="true" />
                    <br /> Milestone
                  </a>
                </li>
              </ul>
            </div>

            <div className="tab-content card">
              <div
                className="tab-pane fade in show active"
                id="task"
                role="tabpanel"
              >
                <form>
                  <label htmlFor="defaultFormLoginEmailEx">Task Name</label>
                  <input
                    type="email"
                    id="defaultFormLoginEmailEx"
                    className="form-control"
                    defaultValue={props.data}
                  />
                  <br />
                  <label htmlFor="materialFormContactMessageEx">
                    Description
                  </label>
                  <div className="md-form">
                    <textarea
                      type="text"
                      id="materialFormContactMessageEx"
                      className="form-control m
									d-textarea"
                      rows="5"
                    />
                  </div>
                  <label htmlFor="date-picker-example">Deadline</label>
                  <div className="md-form">
                    <input
                      placeholder="Selected date"
                      type="text"
                      id="date-picker-example"
                      className="fo
									rm-control datepicker"
                    />
                  </div>
                  <label>Assigned to </label>
                  <select
                    className="mdb-select colorful-select dropdown-primary"
                    multiple
                    searchable="Search here.."
                  >
                    <option value="" disabled selected>
                      Choose member(s)
                    </option>
                    <option value="1">Joe</option>
                    <option value="2">Don</option>
                    <option value="3">Jane</option>
                  </select>
                  <div className="text-center mt-4">
                    <button className="btn btn-indigo" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className="tab-pane fade" id="milestone" role="tabpanel">
                <form>
                  <label htmlFor="defaultFormLoginEmailEx">
                    Mielstone Name
                  </label>
                  <input
                    type="email"
                    id="defaultFormLoginEmailEx"
                    className="form-control"
                  />
                  <br />
                  <label htmlFor="materialFormContactMessageEx">
                    Description
                  </label>
                  <div className="md-form">
                    <textarea
                      type="text"
                      id="materialFormContactMessageEx"
                      className="form-control m
									d-textarea"
                      rows="5"
                    />
                  </div>
                  <label htmlFor="date-picker-example">Deadline</label>
                  <div className="md-form">
                    <input
                      placeholder="Selected date"
                      type="text"
                      id="date-picker-example"
                      className="fo
									rm-control datepicker"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <button className="btn btn-indigo" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;
