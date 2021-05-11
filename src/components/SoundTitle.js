import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SoundTitle extends Component {
  render() {
    return (
      <div className="SoundTitle SoundElement SoundElementText">
        <h5><Link to={`${this.props.title}`} style={{ textDecoration: 'none' }}>{this.props.title}</Link></h5>
      </div>
    );
  }
}
