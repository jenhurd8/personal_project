import React from "react";
import "./Landing.css";
import { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <h1 className="myHealth">My Health</h1>
        <Link to="/dashboard">
          <button>Enter here</button>
        </Link>
      </div>
    );
  }
}

export default Landing;
