import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { AuthProvider } from "./context/auth.context";
import "./index.css";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
