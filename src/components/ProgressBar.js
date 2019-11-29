import React, { Component } from "react";

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.progressBar = React.createRef();
    this.progressBarContainer = React.createRef();
  }

  getProgress = (currentTime, duration) => {
    let currentProgress = Math.min((currentTime / duration) * 100, 100);
    return currentProgress.toString() + "%";
  };

  setProgress = pct => {
    this.props.updateCurrentProgress(pct);
  };

  ScrubberClick = e => {
    var fullWidth = this.progressBarContainer.current.offsetWidth;
    var newWidth = e.clientX - this.progressBarContainer.current.offsetLeft;
    var pct = newWidth / fullWidth;
    this.setProgress(pct, this.props.duration);
  };

  render() {
    var currentProgress = this.getProgress(
      this.props.currentTime,
      this.props.duration
    );

    return (
      <div
        className="ProgressBarContainer"
        onClick={this.ScrubberClick}
        ref={this.progressBarContainer}
      >
        <div
          className="ProgressBar"
          style={{ width: currentProgress }}
          onClick={this.ScrubberClick}
          ref={this.progressBar}
        />
      </div>
    );
  }
}
