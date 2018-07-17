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
  getUser,
  deleteUser
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
        // console.log(result);
        // console.log(result.value.data.id);
        this.setState({
          id: result.value.data.id,
          email: result.value.data.email,
          displayname: result.value.data.displayname,
          picture: result.value.data.picture
        });
        // console.log(
        //   this.state.id,
        //   this.state.email,
        //   this.state.displayname,
        //   this.state.picture
        // );
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(this.props.getUser);
  }

  loggedIn() {
    if (this.state.email.length > 1) {
      return (
        <div>
          <a href="http://localhost:3001/logout" onClick={() => this.logOut}>
            Log out
          </a>
          Welcome {this.state.displayname}!
          <img id="imgPic" src={this.state.picture} alt="person" />
        </div>
      );
    } else {
      return <a href="http://localhost:3001/login">Login</a>;
    }
  }

  logOut() {
    // this.setState({
    //   email: ""
    // });
    this.props.deleteUser().then(console.log(this.state.email));
    //console.log();
    // "http://localhost:3000/landing"
  }

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
          {this.loggedIn()}
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
    getUser,
    deleteUser
  }
)(Nav);
