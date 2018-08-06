import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./FamilyMember.css";
import TextField from "@material-ui/core/TextField";

export default class FamilyMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditMenu: false
    };
    this.showEditMenu = this.showEditMenu.bind(this);
  }

  showEditMenu() {
    this.setState({ showEditMenu: !this.state.showEditMenu });
  }

  render() {
    return (
      <div className="familyMember" key={this.props.index}>
        <div className="left">
          <Button
            variant="contained"
            color="primary"
            style={{ background: "#64B5F6", height: "10px", width: "10px" }}
            onClick={() => this.props.deleteHandler(this.props.id)}
          >
            Delete
          </Button>

          <br />
          <br />
          <p>{this.props.name}</p>
          <img src={this.props.image} alt="person" />
          <p>{this.props.dob}</p>
        </div>
        <div className="right">
          <Button
            variant="contained"
            color="primary"
            style={{
              height: "10px",
              width: "10px",
              backgroundColor: "#0D47A1"
            }}
            onClick={this.showEditMenu}
          >
            Edit
          </Button>
          {this.state.showEditMenu && (
            <div className="editMenu">
              <div>
                <TextField
                  label="Name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  onChange={this.props.onChangeHandler}
                  margin="normal"
                />

                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    background: "#64B5F6",
                    height: "10px",
                    width: "10px"
                  }}
                  onClick={() => {
                    this.props.updateFamilyName(this.props.id);
                    this.showEditMenu();
                  }}
                >
                  Update
                </Button>
                <div>
                  <TextField
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    onChange={this.props.onChangeHandler}
                    margin="normal"
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      background: "#64B5F6",
                      height: "10px",
                      width: "10px"
                    }}
                    onClick={() => {
                      this.props.updateFamilyDob(this.props.id);
                      this.showEditMenu();
                    }}
                  >
                    Update
                  </Button>
                </div>

                <div>
                  <TextField
                    label="Image URL"
                    name="image"
                    placeholder="Add an image URL"
                    type="text"
                    onChange={this.props.onChangeHandler}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      background: "#64B5F6",
                      height: "10px",
                      width: "10px"
                    }}
                    onClick={() => {
                      this.props.updateFamilyImage(this.props.id);
                      this.showEditMenu();
                    }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
