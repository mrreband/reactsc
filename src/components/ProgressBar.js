import React, { Component } from "react";

export default class ProgressBar extends Component {
  getProgress = (currentTime, duration) => {
    return (currentTime / duration * 100).toString() + "%";
  };

  render() {
    var currentProgress = this.getProgress(this.props.currentTime, this.props.duration);

    return (
      <div className="ProgressBarContainer">
        <div className="ProgressBar" style={{"width": currentProgress}} />
      </div>
    );
  }
}
