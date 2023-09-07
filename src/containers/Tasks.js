import React, { PureComponent } from "react";
import axios from "axios";
import ProjectNav from "../components/Common/ProjectNav";
import QuickAddModal from "../components/Tasks/QuickAddModal";
import MainFooter from "../components/Common/MainFooter";
import PageHeader from "../components/Common/PageHeader";
import InProgressItem from "../components/Tasks/Inprogress/InProgressItem";
import AddItem from "../components/Tasks/AddItem";
import TodoItem from "../components/Tasks/Todo/TodoItem";
import ReviewItem from "../components/Tasks/Review/ReviewItem";
import CompletedItem from "../components/Tasks/Completed/CompletedItem";

class Tasks extends PureComponent {
  constructor(props) {
    super(props);
    this.quickadd = "Quick Add";
    this.title = "Tasks";
    this.state = {
      tasks: [],
      userId: "",
      searchTerm: "",
    };
    this.id = "";
  }

  UNSAFE_componentWillMount() {
    this.getUserid();
  }

  componentDidMount() {
    this.getTasks();
  }

  // Get the id of the logged in user
  getUserid() {
    axios
      .request({ method: "get", url: "/api/auth/show/current" })
      .then((response) => {
        this.user = response.data._id;
        this.setState({ userId: response.data._id });
      })
      .catch((error) => {
        // User is not logged in
        window.location.href = "http://localhost:3000/signin";
      });
  }
  // Logout and reset the cookie session
  onLogout() {
    axios
      .request({ method: "get", url: "/api/auth/logout" })
      .then((response) => {
        console.log(response.data);
        window.location = "http://localhost:3000/";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Get all tasks of a project
  getTasks() {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "get",
        url: "/api/tasks/all/" + this.id,
      })
      .then((response) => {
        console.log(response.data.Task);
        this.setState({ tasks: response.data.Task });
        console.log(this.state.tasks);
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
  // Handles the state when new task is added
  addTask(task) {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "put",
        url: "/api/tasks/" + this.id + "/" + this.state.userId,
        data: {
          TaskTitle: task.title,
          TaskDescription: task.desc,
          DeadLine: task.deadline,
          AssignedTo: task.assignedTo,
          FileLocation: "",
          Catagory: 1,
        },
      })
      .then((response) => {
        let alltasks = this.state.tasks;
        alltasks = response.data.Task;
        this.setState({ tasks: alltasks });
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

  // Handles the state when task is edited
  onEditTask(task) {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    console.log(this.id);
    axios
      .request({
        method: "put",
        url:
          "/api/tasks/single/" +
          this.id +
          "/" +
          task.id +
          "/" +
          this.state.userId,
        data: {
          TaskTitle: task.title,
          TaskDescription: task.desc,
          DeadLine: task.deadline,
          AssignedTo: task.assignedTo,
          Catagory: task.catagory,
          FileLocation: task.files,
        },
      })
      .then((response) => {
        console.log(response.data);
        let alltasks = this.state.tasks;
        alltasks = response.data.Task;
        this.setState({
          tasks: alltasks,
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

  // Delete a task
  onDeleteTask(task) {
    this.id = new URLSearchParams(this.props.location.search).get("id");
    axios
      .request({
        method: "put",
        url:
          "/api/tasks/delete/" +
          this.id +
          "/" +
          task.id +
          "/" +
          this.state.userId,
        data: {
          TaskTitle: task.title,
        },
      })
      .then((response) => {
        console.log(response.data);
        let alltasks = this.state.tasks;
        alltasks = response.data.Task;
        this.setState({ tasks: alltasks });
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

  // Serch task
  searchHandler(e) {
    console.log("[searchHandler] Search Term " + e.target.value.toString());
    this.setState({
      searchTerm: e.target.value.toString(),
    });
    e.preventDefault();
  }

  render() {
    let todo, incomplete, review, completed, noTasks, search;
    if (this.state.tasks.length > 0) {
      todo = this.state.tasks
        .reverse()
        .filter(searchTask(this.state.searchTerm))
        .map((task) => {
          if (task.Catagory === 1) {
            return (
              <TodoItem
                key={task._id}
                id={task._id}
                title={task.TaskTitle}
                desc={task.TaskDescription}
                deadline={task.DeadLine}
                catagory={task.Catagory}
                files={task.FileLocation}
                user={task.AssignedTo}
                onEdit={this.onEditTask.bind(this)}
                onDelete={this.onDeleteTask.bind(this)}
                currentUser={this.state.userId}
                {...this.props}
              />
            );
          } else {
            return null;
          }
        });
      incomplete = this.state.tasks
        .reverse()
        .filter(searchTask(this.state.searchTerm))
        .map((task) => {
          if (task.Catagory === 2) {
            return (
              <InProgressItem
                key={task._id}
                id={task._id}
                title={task.TaskTitle}
                desc={task.TaskDescription}
                deadline={task.DeadLine}
                catagory={task.Catagory}
                files={task.FileLocation}
                user={task.AssignedTo}
                onEdit={this.onEditTask.bind(this)}
                onDelete={this.onDeleteTask.bind(this)}
                currentUser={this.state.userId}
                {...this.props}
              />
            );
          } else {
            return null;
          }
        });
      review = this.state.tasks
        .reverse()
        .filter(searchTask(this.state.searchTerm))
        .map((task) => {
          if (task.Catagory === 3) {
            return (
              <ReviewItem
                key={task._id}
                id={task._id}
                title={task.TaskTitle}
                desc={task.TaskDescription}
                deadline={task.DeadLine}
                catagory={task.Catagory}
                files={task.FileLocation}
                user={task.AssignedTo}
                onEdit={this.onEditTask.bind(this)}
                onDelete={this.onDeleteTask.bind(this)}
                currentUser={this.state.userId}
                {...this.props}
              />
            );
          } else {
            return null;
          }
        });
      completed = this.state.tasks
        .reverse()
        .filter(searchTask(this.state.searchTerm))
        .map((task) => {
          if (task.Catagory === 4) {
            return (
              <CompletedItem
                key={task._id}
                id={task._id}
                title={task.TaskTitle}
                desc={task.TaskDescription}
                deadline={task.DeadLine}
                catagory={task.Catagory}
                files={task.FileLocation}
                user={task.AssignedTo}
                onEdit={this.onEditTask.bind(this)}
                onDelete={this.onDeleteTask.bind(this)}
                currentUser={this.state.userId}
                {...this.props}
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
              className="form-control form-control-md text-center"
              placeholder="Search Tasks"
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
      noTasks = (
        <div className="col-lg-12">
          <div className="tx-4 text-primary my-5 text-center ">
            <img className="img-fluid" src="./img/beach1.png" alt="Desert" />
            <br />
            <br />
            Looks like you have no tasks.Create a new tasks by click on quick
            add.
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
          onAddTask={this.addTask.bind(this)}
          parent="task"
          projectId={this.id}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title={this.title} />
            <br />
            <div className="row justify-content-center ">
              {search}
              <div className="col-md-10 m-auto">
                <div className="row">
                  <div className="col-lg-3 col-md-6 mb-3">
                    <div className="text-center primary-text">
                      <h3>
                        <i
                          className="fa fa-bookmark-o text-purple fa-xs"
                          aria-hidden="true"
                        />
                        <strong className="text-purple ml-2">Todo</strong>
                      </h3>
                    </div>
                    <AddItem
                      onAddTask={this.addTask.bind(this)}
                      currentUser={this.state.userId}
                    />{" "}
                    {todo}
                    <div className="text-center danger-text">
                      {this.state.erro_mesg}
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
                    <div className="text-center primary-text mb-4">
                      <h3>
                        <i
                          className="fa fa-hourglass-end fg-warning-dark fa-xs"
                          aria-hidden="true"
                        />
                        <strong className="fg-warning-dark ml-2">
                          Inprogress
                        </strong>
                      </h3>
                    </div>
                    {incomplete}
                    <div className="text-center danger-text" />
                  </div>
                  <div className="col-lg-3 col-md-6 mb-3">
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
                  <div className="col-lg-3 col-md-6 mb-3">
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
                  {noTasks}
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
function searchTask(term) {
  console.log(term);
  return function (x) {
    return (
      x.TaskTitle.toLowerCase().includes(term.toLowerCase()) ||
      x.TaskDescription.toLowerCase().includes(term.toLowerCase()) ||
      !term
    );
  };
}
export default Tasks;
