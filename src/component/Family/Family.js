import React, { Component } from "react";
import "./Family.css";
import Nav from "../../component/Nav/Nav.js";
import FamilyMember from "./FamilyMember";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  removeFamily,
  addFamily,
  getFamily,
  updateFamily,
  updateFamilyName,
  updateFamilyColor,
  updateFamilyDob,
  updateFamilyImage,
  getUser
} from "../../redux/reducer";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

class Family extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      dob: "",
      image: "",
      color: "Red",
      email: "",
      showEditMenu: false
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.showEditMenu = this.showEditMenu.bind(this);
    this.updateFamilyName = this.updateFamilyName.bind(this);
    this.updateFamilyDob = this.updateFamilyDob.bind(this);
    this.updateFamilyImage = this.updateFamilyImage.bind(this);
    this.updateFamilyColor = this.updateFamilyColor.bind(this);
  }

  componentDidMount() {
    this.props.getUser().then(result => {
      this.setState({
        email: result.value.data.email
      });
    });
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
      themecolor: this.state.color,
      email: this.state.email
    });
    window.location.reload();
    console.log(this.state.email);
  };

  deleteHandler(id) {
    this.props.removeFamily(id);
  }

  updateFamily(id) {
    this.props.updateFamily(id, {
      name: this.state.name,
      image: this.state.image,
      dob: this.state.dob,
      themecolor: this.state.color,
      email: this.state.email
    });
    window.location.reload();
  }

  updateFamilyName(id) {
    this.props.updateFamilyName(id, {
      name: this.state.name
    });
    window.location.reload();
  }

  updateFamilyImage(id) {
    this.props.updateFamilyImage(id, {
      image: this.state.image
    });
    window.location.reload();
  }

  updateFamilyDob(id) {
    this.props.updateFamilyDob(id, {
      dob: this.state.dob
    });
    window.location.reload();
  }

  updateFamilyColor(id) {
    console.log(this.state.color);
    this.props.updateFamilyColor(id, {
      color: this.state.color
    });
    window.location.reload();
  }

  render() {
    const { family, isLoading } = this.props;
    let familyArray = isLoading ? (
      <p>Loading...</p>
    ) : (
      family
        .filter(family => family.email === this.state.email)
        .map((element, index) => {
          return (
            <div key={index}>
              <Grid container>
                <Grid item sm>
                  <Paper
                    style={{
                      padding: 20,
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: "#BBDEFB"
                    }}
                  >
                    <FamilyMember
                      name={element.name}
                      id={element.id}
                      image={element.image}
                      dob={element.dob.slice(0, 10)}
                      // themecolor={element.themecolor}
                      deleteHandler={this.deleteHandler}
                      onChangeHandler={this.onChangeHandler}
                      updateFamilyName={this.updateFamilyName}
                      updateFamilyDob={this.updateFamilyDob}
                      updateFamilyImage={this.updateFamilyImage}
                      updateFamilyColor={this.updateFamilyColor}
                      selectColor={this.state.color}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          );
        })
    );

    return (
      <div>
        <Nav />
        <div className="family">
          <div className="familyInputs">
            Add a family member
            <br />
            <br />
            <TextField
              //id="name"
              label="Name"
              name="name"
              placeholder="Name"
              type="text"
              onChange={this.onChangeHandler}
              margin="normal"
            />
            {/* <input
              name="name"
              placeholder="Name"
              type="text"
              onChange={this.onChangeHandler}
            /> */}
            <br />
            <TextField
              //id="dob"
              label="Date of Birth"
              name="dob"
              // placeholder="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            {/* <input
              name="dob"
              placeholder="Date of Birth"
              type="date"
              onChange={this.onChangeHandler}
            /> */}
            <br />
            <TextField
              //id="image"
              label="Image URL"
              name="image"
              placeholder="Add an image URL"
              type="text"
              onChange={this.onChangeHandler}
              margin="normal"
            />
            {/* <input
              name="image"
              placeholder="Add an image URL"
              type="text"
              onChange={this.onChangeHandler}
            /> */}
            <br />
            {/* Choose a theme color for this person:
            <select
              value={this.state.color}
              name="color"
              onChange={this.onChangeHandler}
            >
              <option color="red">Red</option>
              <option color="blue">Blue</option>
              <option color="yelow">Yellow</option>
            </select> */}
            <br />
            {/* <button onClick={this.onSubmitHandler}>Submit</button> */}
            <Button
              variant="contained"
              //color="primary"
              onClick={this.onSubmitHandler}
              style={{
                background: "#64B5F6",
                height: "10px",
                width: "10px",
                color: "white"
              }}
            >
              Submit
            </Button>
            <br />
            <br />
            <br />
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
    loading: state.loading,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  {
    removeFamily,
    addFamily,
    getFamily,
    updateFamily,
    updateFamilyName,
    updateFamilyColor,
    updateFamilyDob,
    updateFamilyImage,
    getUser
  }
)(Family);
