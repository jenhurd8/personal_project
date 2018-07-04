import React, { Component } from "react";
import "./Family.css";
import Nav from "../../component/Nav/Nav.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeFamily, addFamily, getFamily } from "../../redux/reducer";

class Family extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      dob: "",
      image: "",
      color: "Red"
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    this.props.getFamily();
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    this.props.addFamily({
      name: this.state.name,
      image: this.state.image,
      dob: this.state.dob,
      themecolor: this.state.color
    });
    window.location.reload();
  };

  editHandler = e => {};

  deleteHandler(id) {
    this.props.removeFamily(id);
  }

  render() {
    const { family, isLoading } = this.props;
    let familyArray = isLoading ? (
      <p>Loading...</p>
    ) : (
      family.map((element, index) => {
        return (
          <div className="familyMember" key={index}>
            <p>{element.name}</p>
            <p>{element.image}</p>
            <p>{element.dob}</p>
            <p>{element.themecolor}</p>
            <button onClick={() => this.editHandler}>Edit</button>
            <button onClick={() => this.deleteHandler(element.id)}>
              Delete
            </button>
          </div>
        );
      })
    );

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

function mapStateToProps(state) {
  return {
    family: state.family,
    loading: state.loading
  };
}

export default connect(
  mapStateToProps,
  { removeFamily, addFamily, getFamily }
)(Family);
