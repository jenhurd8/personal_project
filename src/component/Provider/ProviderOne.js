import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./ProviderOne.css";
import TextField from "@material-ui/core/TextField";

export default class ProviderOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProviderMenu: false
    };
    this.editProviderMenu = this.editProviderMenu.bind(this);
  }

  editProviderMenu() {
    this.setState({ editProviderMenu: !this.state.editProviderMenu });
  }

  render() {
    return (
      <div className="providerDiv" key={this.props.index}>
        <div className="drData">
          <p>{this.props.name}</p>
          <br />
          <p>Practice Name: {this.props.specialty}</p>
          <p>{this.props.address}</p>
          <p>Phone: {this.props.phone}</p>
          <br />
          <Button
            variant="contained"
            color="primary"
            style={{ background: "#64B5F6", height: "40px", width: "60px" }}
            onClick={() => this.props.deleteHandler(this.props.id)}
          >
            Delete
          </Button>
        </div>

        <div className="drPhoto">
          <img src={this.props.photo} alt="provider" />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{
            background: "#0d47a1",
            height: "10px",
            width: "10px"
            // margin: "20px"
          }}
          onClick={this.editProviderMenu}
        >
          Edit
        </Button>

        {this.state.editProviderMenu && (
          <div className="editMenu">
            <div>
              <TextField
                label="Provider Name"
                name="name"
                placeholder="Provider Name"
                type="text"
                onChange={this.props.onChangeHandler}
                margin="normal"
              />
              {/* <p>New Provider Name:</p>
              <input
                name="name"
                type="text"
                onChange={this.props.onChangeHandler}
              /> */}
              <Button
                variant="contained"
                color="primary"
                style={{ background: "#64B5F6", height: "10px", width: "10px" }}
                onClick={() => this.props.updateProviderName(this.props.id)}
              >
                Submit
              </Button>
              <div>
                <TextField
                  label="Practice Name"
                  name="specialty"
                  placeholder="Practice Name"
                  type="text"
                  onChange={this.props.onChangeHandler}
                  margin="normal"
                />
                {/* <p>New Practice Name:</p>
                <input
                  name="specialty"
                  type="text"
                  onChange={this.props.onChangeHandler}
                /> */}
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    background: "#64B5F6",
                    height: "10px",
                    width: "10px"
                  }}
                  onClick={() =>
                    this.props.updateProviderPracticeName(this.props.id)
                  }
                >
                  Submit
                </Button>
              </div>
            </div>
            <div>
              <TextField
                label="Address"
                name="address"
                placeholder="Address"
                type="text"
                onChange={this.props.onChangeHandler}
                margin="normal"
              />
              {/* <p>New Address:</p>
              <input
                name="address"
                type="text"
                onChange={this.props.onChangeHandler}
              /> */}
              <Button
                variant="contained"
                color="primary"
                style={{ background: "#64B5F6", height: "10px", width: "10px" }}
                onClick={() => this.props.updateProviderAddress(this.props.id)}
              >
                Submit
              </Button>
            </div>
            <div>
              <TextField
                label="Provider Photo URL"
                name="photo"
                placeholder="Provider Photo URL"
                type="text"
                onChange={this.props.onChangeHandler}
                margin="normal"
              />
              {/* <p>Change Provider Photo:</p>
              <input
                name="photo"
                type="text"
                onChange={this.props.onChangeHandler}
              /> */}
              <Button
                variant="contained"
                color="primary"
                style={{ background: "#64B5F6", height: "10px", width: "10px" }}
                onClick={() => this.props.updateProviderPhoto(this.props.id)}
              >
                Submit
              </Button>
            </div>
            <div>
              <TextField
                label="Provider Phone"
                name="phone"
                placeholder="Provider Phone"
                type="text"
                onChange={this.props.onChangeHandler}
                margin="normal"
              />
              {/* <p>Change Provider Phone:</p>
              <input
                name="phone"
                type="text"
                onChange={this.props.onChangeHandler}
              /> */}
              <Button
                variant="contained"
                color="primary"
                style={{ background: "#64B5F6", height: "10px", width: "10px" }}
                onClick={() => this.props.updateProviderPhone(this.props.id)}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
