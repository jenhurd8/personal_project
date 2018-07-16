import React from "react";
import "./Nav.css";
import { Component } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
import { connect } from "react-redux";
import {
  getUsersId,
  getUsersEmail,
  getUsersDisplayName,
  getUsersPicture,
  getUser
} from "../../redux/reducer";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      email: "",
      displayname: "",
      picture: ""
    };
    //this.onChangeHandler = this.onChangeHandler.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    // axios.get("/api/user").then(function(response) {
    //   console.log("axios: " + response.data.id);
    //   console.log("axios: " + response.data.displayname);
    // });
    this.props
      .getUser()
      .then(result => {
        console.log(result);
        console.log(result.value.data.id);
        this.setState({
          id: result.value.data.id,
          email: result.value.data.email,
          displayname: result.value.data.displayname,
          picture: result.value.data.picture
        });
        console.log(
          this.state.id,
          this.state.email,
          this.state.displayname,
          this.state.picture
        );
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(this.props.getUser);
  }

  loggedIn() {
    if (true) {
      return <p>test</p>;
      // <a href="http://localhost:3000/#/dashboard">Log out</a>;
    } else {
      return <a href="http://localhost:3001/login">Login</a>;
    }
  }

  logOut() {}

  render() {
    // console.log(this.props.getUserid);
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
          {/* <div className="menuItems">{this.loggedIn}</div> */}
          <div className="menuItems">
            <a href="http://localhost:3001/login">Log in</a>
          </div>
          <Link to="/logout">
            <div className="menuItems">
              <button>Log out</button>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    loading: state.loading
  };
}

export default connect(
  mapStateToProps,
  {
    getUsersId,
    getUsersEmail,
    getUsersDisplayName,
    getUsersPicture,
    getUser
  }
)(Nav);
