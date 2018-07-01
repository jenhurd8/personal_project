import React from "react";
import "./Dashboard.css";
import { Component } from "react";
import Nav from "../../component/Nav/Nav.js";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="dashboard">
          <p> Dashboard</p>
          <br />
          <p>
            Welcome! Add a family member and healthcare provider to get started.
          </p>
          <div className="buttonDiv">
            <Link to="/family">
              <button>Add a family member</button>
            </Link>
            <Link to="/provider">
              <button>Add a healthcare provider</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
