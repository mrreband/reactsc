import React, { Component } from "react";

export default class SoundTitle extends Component {
  render() {
    return (
      <div className="SoundTitle SoundElement">
        <h5>{this.props.title}</h5>
      </div>
    );
  }
}
