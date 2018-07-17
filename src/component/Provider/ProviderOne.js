import React, { Component } from "react";

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
        <button onClick={() => this.props.deleteHandler(this.props.id)}>
          Delete
        </button>
        <div className="drData">
          <p>{this.props.name}</p>
          <br />
          <p>Practice Name: {this.props.specialty}</p>
          <p>{this.props.address}</p>
          <p>Phone: {this.props.phone}</p>
        </div>
        <div className="drPhoto">
          <img src={this.props.photo} alt="provider" />
        </div>
        <button onClick={this.editProviderMenu}>Edit Provider</button>
        {this.state.editProviderMenu && (
          <div className="editMenu">
            <div>
              <p>New Provider Name:</p>
              <input
                name="name"
                type="text"
                onChange={this.props.onChangeHandler}
              />
              <button
                onClick={() => this.props.updateProviderName(this.props.id)}
              >
                Submit
              </button>
              <div>
                <p>New Practice Name:</p>
                <input
                  name="specialty"
                  type="text"
                  onChange={this.props.onChangeHandler}
                />
                <button
                  onClick={() =>
                    this.props.updateProviderPracticeName(this.props.id)
                  }
                >
                  Submit
                </button>
              </div>
            </div>
            <div>
              <p>New Address:</p>
              <input
                name="address"
                type="text"
                onChange={this.props.onChangeHandler}
              />
              <button
                onClick={() => this.props.updateProviderAddress(this.props.id)}
              >
                Submit
              </button>
            </div>
            <div>
              <p>Change Provider Photo:</p>
              <input
                name="photo"
                type="text"
                onChange={this.props.onChangeHandler}
              />
              <button
                onClick={() => this.props.updateProviderPhoto(this.props.id)}
              >
                Submit
              </button>
            </div>
            <div>
              <p>Change Provider Phone:</p>
              <input
                name="phone"
                type="text"
                onChange={this.props.onChangeHandler}
              />
              <button
                onClick={() => this.props.updateProviderPhone(this.props.id)}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
