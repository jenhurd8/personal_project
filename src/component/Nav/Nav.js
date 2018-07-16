import React from "react";
import "./Nav.css";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="logo">My Health</div>
        <div className="menu">
          <div className="menuItems">
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className="menuItems">
            <Link to="/family">Manage Family</Link>
          </div>
          <div className="menuItems">
            <Link to="/provider">Manager Providers</Link>
          </div>
          <div className="menuItems">
            <Link to="/visit">Log a Visit</Link>
          </div>
          <div className="menuItems">
            <a href="http://localhost:3001/login">Login</a>
            <a href="http://localhost:3000/#/dashboard">Log out</a>
          </div>
        </div>
      </div>
    );
  }
}
