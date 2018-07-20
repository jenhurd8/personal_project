import React from "react";
import "./Nav.css";
import { Component } from "react";
import { Link } from "react-router-dom";
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
    this.loggedIn = this.loggedIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    console.log(this.props.users);
    if (this.props.users.length === 0) {
      this.props
        .getUser()
        .then(result => {
          this.setState({
            id: result.value.data.id,
            email: result.value.data.email,
            displayname: result.value.data.displayname,
            picture: result.value.data.picture
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        id: this.props.users.id,
        email: this.props.users.email,
        displayname: this.props.users.displayname,
        picture: this.props.users.picture
      });
    }
  }

  loggedIn() {
    if (this.state.email.length > 1) {
      return (
        <div>
          <div id="welcomeMessage">
            Welcome {this.state.displayname}
            {" ! "}
            <img id="imgPic" src={this.state.picture} alt="person" />
          </div>
          <div>
            <a
              id="logoutMessage"
              href="http://localhost:3001/logout"
              onClick={() => this.logOut}
            >
              Log out
            </a>
          </div>
        </div>
      );
    } else {
      return <a href="http://localhost:3001/login">Login</a>;
    }
  }

  logOut() {
    this.props.deleteUser().then(console.log(this.state.email));
  }

  render() {
    return (
      <div className="nav">
        <div className="logo">
          <Link to="/">My Health</Link>
        </div>
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
          <Link to="/charts">Health Data</Link>
        </div>
        {this.loggedIn()}
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
