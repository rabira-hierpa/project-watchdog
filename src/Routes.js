import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./containers/Landing";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import Projects from "./containers/Projects";
import Tasks from "./containers/Tasks";
import Archive from "./containers/Archive";
import Progress from "./containers/Progress";
import Milestones from "./containers/Milestones";
import Chat from "./containers/Chat";
import Schedule from "./containers/Schedule";
import History from "./containers/History";
import AttachedFiles from "./containers/AttachedFiles";
import ErrorPage from "./components/Error/Error";
import Dashboard from "./containers/Dashboard";
import AdminDashboard from "./containers/Admin";
import Search from "./containers/Search";

class Home extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/projects" component={Projects} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/milestones" component={Milestones} />
        <Route path="/repository" component={Archive} />
        <Route path="/progress" component={Progress} />
        <Route path="/chat" component={Chat} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/history" component={History} />
        <Route path="/files" component={AttachedFiles} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route paht="/search" exact component={Search} />
        <Route component={ErrorPage} />
        {/*
            <Route path="/project/view" component={TaskModal} />
            <Route path="/repository-view/" component={ArchiveDetails} />
        */}
      </Switch>
    );
  }
}

export default Home;
