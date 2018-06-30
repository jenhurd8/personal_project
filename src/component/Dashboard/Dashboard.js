import React from "react";
import "./Dashboard.css";
import { Component } from "react";
import Nav from "../../component/Nav/Nav.js";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Nav />
        <p> Dashboard</p>
        <br />
        <p>
          Welcome! Add a family member and healthcare provider to get started.
        </p>
        <div className="buttonDiv">
          <button>Add a family member</button>
          <button>Add a healthcare provider</button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
