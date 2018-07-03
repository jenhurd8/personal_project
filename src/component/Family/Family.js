import React from "react";
import "./Family.css";
import { Component } from "react";
import Nav from "../../component/Nav/Nav.js";
import { Link } from "react-router-dom";
import axios from "axios";

class Family extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      name: "",
      dob: "",
      image: "",
      color: "Red",
      family: []
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:3001/api/family/").then(response => {
      this.setState({
        family: response.data
      });
    });
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    axios
      .post("http://localhost:3001/api/family/", {
        name: this.state.name,
        image: this.state.image,
        dob: this.state.dob,
        themecolor: this.state.color
      })
      .then(response => {
        this.setState({
          family: response.data
        });
      });
  };

  editHandler = e => {};

  deleteHandler(id) {
    axios.delete("http://localhost:3001/api/family/" + id).then(response => {
      this.setState({
        family: response.data
      });
    });
  }

  render() {
    let familyArray =
      this.state.family &&
      this.state.family.map((element, index) => {
        return (
          <div className="familyMember" key={index}>
            <p>{this.state.family[index].name}</p>
            <p>{this.state.family[index].image}</p>
            <p>{this.state.family[index].dob.substring(0, 10)}</p>
            <p>{this.state.family[index].color}</p>
            <button onClick={() => this.editHandler}>Edit</button>
            <button
              onClick={() => this.deleteHandler(this.state.family[index].id)}
            >
              Delete
            </button>
          </div>
        );
      });
    return (
      <div>
        <Nav />
        <div className="family">
          <div className="inputs">
            Add a family member:
            <br />
            <br />
            Name:
            <input
              name="name"
              placeholder="Name"
              type="text"
              onChange={this.onChangeHandler}
            />
            <br />
            Date of Birth:
            <input
              name="dob"
              placeholder="Date of Birth"
              type="date"
              onChange={this.onChangeHandler}
            />
            <br />
            Add a picture:
            <input
              name="image"
              placeholder="Add an image URL"
              type="text"
              onChange={this.onChangeHandler}
            />
            <br />
            Choose a theme color for this person:
            <select
              value={this.state.color}
              name="color"
              onChange={this.onChangeHandler}
            >
              <option color="red">Red</option>
              <option color="blue">Blue</option>
              <option color="yelow">Yellow</option>
            </select>
            <br />
            <button onClick={this.onSubmitHandler}>Submit</button>
            <br />
            <br />
            <br />
            <Link to="/dashboard">
              <button>Cancel</button>
            </Link>
          </div>

          <div className="familyArray">{familyArray}</div>
        </div>
      </div>
    );
  }
}

export default Family;
