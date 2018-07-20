import React from "react";
import "./Landing.css";
import { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <h1 className="myHealth">My Health</h1>
        <Link to="/dashboard">
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#0D47A1" }}
          >
            Enter here
          </Button>
        </Link>
      </div>
    );
  }
}

export default Landing;
