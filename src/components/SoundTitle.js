import React, { Component } from "react";

export default class SoundTitle extends Component {
  render() {
    return (
      <div className="SoundTitle SoundElement SoundElementText">
        <h5>{this.props.title}</h5>
      </div>
    );
  }
}
