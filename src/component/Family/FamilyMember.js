import React, { Component } from "react";
import Button from "@material-ui/core/Button";

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
          <p>{this.props.name}</p>
          <img src={this.props.image} alt="person" />
          <p>{this.props.dob}</p>
          <p>{this.props.themecolor}</p>
        </div>
        <div className="right">
          <Button
            variant="contained"
            color="primary"
            onClick={this.showEditMenu}
          >
            Edit Family Member
          </Button>
          {this.state.showEditMenu && (
            <div className="editMenu">
              <div>
                <p>Name:</p>
                <input
                  name="name"
                  type="text"
                  onChange={this.props.onChangeHandler}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.updateFamilyName(this.props.id)}
                >
                  Submit
                </Button>
                <div>
                  <p>Date of Birth:</p>
                  <input
                    name="dob"
                    type="date"
                    onChange={this.props.onChangeHandler}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.updateFamilyDob(this.props.id)}
                  >
                    Submit
                  </Button>
                </div>

                <div>
                  <p>Image URL:</p>
                  <input
                    name="image"
                    type="text"
                    onChange={this.props.onChangeHandler}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.updateFamilyImage(this.props.id)}
                  >
                    Submit
                  </Button>
                </div>

                {/* <div>
                  <p>Theme Color:</p>
                  <select
                    value={this.props.selectColor}
                    name="color"
                    onChange={this.props.onChangeHandler}
                  >
                    <option color="red">Red</option>
                    <option color="blue">Blue</option>
                    <option color="yelow">Yellow</option>
                  </select>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.updateFamilyColor(this.props.id)}
                  >
                    Submit
                  </Button>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
