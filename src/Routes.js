import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
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
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/repository" element={<Archive />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/history" element={<History />} />
        <Route path="/files" element={<AttachedFiles />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route paht="/search" exact element={<Search />} />
        <Route element={<ErrorPage />} />
        {/*
            <Route path="/project/view" component={TaskModal} />
            <Route path="/repository-view/" component={ArchiveDetails} />
        */}
      </Routes>
    );
  }
}

export default Home;
