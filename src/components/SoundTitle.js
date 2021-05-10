import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";

export default class SoundTitle extends Component {
  render() {
    return (
      <div className="SoundTitle SoundElement SoundElementText">
        <BrowserRouter>
            <h5><Link to={`${this.props.title}`} style={{ textDecoration: 'none' }}>{this.props.title}</Link></h5>
        </BrowserRouter>
      </div>
    );
  }
}
