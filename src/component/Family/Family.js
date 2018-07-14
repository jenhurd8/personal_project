import React, { Component } from "react";
import "./Family.css";
import Nav from "../../component/Nav/Nav.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  removeFamily,
  addFamily,
  getFamily,
  updateFamily
} from "../../redux/reducer";

class Family extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      dob: "",
      image: "",
      color: "Red",
      showEditMenu: false
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    //this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.showEditMenu = this.showEditMenu.bind(this);
  }

  componentDidMount() {
    this.props.getFamily();
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showEditMenu() {
    this.setState({ showEditMenu: !this.state.showEditMenu });
  }

  onSubmitHandler = e => {
    this.props.addFamily({
      name: this.state.name,
      image: this.state.image,
      dob: this.state.dob,
      themecolor: this.state.color
    });
    window.location.reload();
  };

  //editHandler = e => {};

  deleteHandler(id) {
    this.props.removeFamily(id);
  }

  updateFamily(id) {
    this.props.updateFamily(id, {
      name: this.state.name,
      image: this.state.image,
      dob: this.state.dob,
      themecolor: this.state.color
    });
    window.location.reload();
  }

  render() {
    const { family, isLoading } = this.props;
    let familyArray = isLoading ? (
      <p>Loading...</p>
    ) : (
      family.map((element, index) => {
        return (
          <div className="familyMember" key={index}>
            <div className="left">
              <button onClick={() => this.deleteHandler(element.id)}>
                Delete
              </button>
              <p>{element.name}</p>
              <img src={element.image} alt="person" />
              <p>{element.dob.slice(0, 10)}</p>
              <p>{element.themecolor}</p>
            </div>
            <div className="right">
              <button onClick={this.showEditMenu}>Edit Person</button>
              {this.state.showEditMenu && (
                <div className="editMenu">
                  <div>
                    <p>Change Person Name:</p>
                    <input
                      name="name"
                      type="text"
                      onChange={this.onChangeHandler}
                    />
                    <div>
                      <p>Change Person Date of Birth:</p>
                      <input
                        name="dob"
                        type="date"
                        onChange={this.onChangeHandler}
                      />
                    </div>
                  </div>
                  <div>
                    <p>Change Person Image:</p>
                    <input
                      name="image"
                      type="text"
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div>
                    <p>Change Person Theme Color:</p>
                    <input
                      name="color"
                      type="text"
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <button onClick={() => this.updateFamily(element.id)}>
                    Submit Changes
                  </button>
                </div>
              )}
            </div>
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
  { removeFamily, addFamily, getFamily, updateFamily }
)(Family);
