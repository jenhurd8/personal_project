import React, { Component } from "react";
import "./Family.css";
import Nav from "../../component/Nav/Nav.js";
import FamilyMember from "./FamilyMember";
import { connect } from "react-redux";
import {
  removeFamily,
  addFamily,
  getFamily,
  updateFamilyName,
  updateFamilyDob,
  updateFamilyImage,
  getUser,
  getVisits
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
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    this.props.getUser().then(result => {
      this.setState({
        email: result.value.data.email
      });
    });
    this.props.getFamily();
    this.props.getVisits();
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showEditMenu() {
    this.setState({ showEditMenu: !this.state.showEditMenu });
  }

  resetState() {
    this.setState({
      name: "",
      dob: "",
      image: "",
      color: "Red",
      email: "",
      showEditMenu: false
    });
  }

  onSubmitHandler = e => {
    this.props
      .addFamily({
        name: this.state.name,
        image: this.state.image,
        dob: this.state.dob,
        themecolor: this.state.color,
        email: this.state.email
      })
      .then(
        this.setState({
          name: "",
          dob: "",
          image: "",
          color: "Red",
          email: "",
          showEditMenu: false
        })
      );
  };

  deleteHandler(id) {
    const { visits } = this.props;

    visits.map((element, index) => {
      if (element.family_id === id) {
        alert("You cannot delete a person that is in use on the dashboard!");
      } else {
        this.props.removeFamily(id);
      }
    });
  }

  updateFamilyName(id) {
    this.props
      .updateFamilyName(id, {
        name: this.state.name
      })
      .then(this.resetState());
  }

  updateFamilyImage(id) {
    this.props
      .updateFamilyImage(id, {
        image: this.state.image
      })
      .then(this.resetState());
  }

  updateFamilyDob(id) {
    this.props
      .updateFamilyDob(id, {
        dob: this.state.dob
      })
      .then(this.resetState())
      .then();
  }

  render() {
    console.log(this.props.family);
    console.log(this.state.name);
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
                      dob={
                        element.dob.slice(5, 10) + "-" + element.dob.slice(0, 4)
                      }
                      deleteHandler={this.deleteHandler}
                      onChangeHandler={this.onChangeHandler}
                      updateFamilyName={this.updateFamilyName}
                      updateFamilyDob={this.updateFamilyDob}
                      updateFamilyImage={this.updateFamilyImage}
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
              label="Name"
              name="name"
              placeholder="Name"
              type="text"
              onChange={this.onChangeHandler}
              margin="normal"
              value={this.state.name}
            />
            <br />
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={this.onChangeHandler}
              margin="normal"
              value={this.state.dob}
            />
            <br />
            <TextField
              label="Image URL"
              name="image"
              placeholder="Add an image URL"
              type="text"
              onChange={this.onChangeHandler}
              margin="normal"
              value={this.state.image}
            />
            <br />
            <br />
            <Button
              variant="contained"
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
    user: state.user,
    visits: state.visits
  };
}

export default connect(
  mapStateToProps,
  {
    removeFamily,
    addFamily,
    getFamily,
    updateFamilyName,
    updateFamilyDob,
    updateFamilyImage,
    getUser,
    getVisits
  }
)(Family);
