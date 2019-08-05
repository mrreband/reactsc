import React, { Component } from "react";
import PlayButton from "./PlayButton.js";
import SoundTitle from "./SoundTitle.js";
import SoundTimer from "./SoundTimer.js";
import ProgressBar from "./ProgressBar.js";

export default class Sound extends Component {
  constructor(props) {
    super(props);
    this.htmlPlayer = React.createRef();
    this.state = {
      duration: this.props.duration,
      currentTime: 0
    };
  }

  setActive = () => {
    console.log("setActive: " + this.props.id.toString());
    if (this.props.active === false) {
      this.playSound();
    }
  };

  setInActive = () => {
    console.log("setInactive: " + this.props.id.toString());
    if (this.props.active === true) {
      this.pauseSound();
    }
  };

  playSound = () => {
    console.log("playSound: " + this.props.id.toString());
    this.props.updateCurrentPlayer(this.props.id);
    this.htmlPlayer.current.play();
  };

  pauseSound = () => {
    console.log("pauseSound: " + this.props.id.toString());
    this.htmlPlayer.current.pause();
    this.props.updateCurrentPlayer("");
  };

  setNextTrack = () => {
    console.log("setNextTrack: " + this.props.id.toString());
    this.props.setNextTrack(this.props.id);
  };

  updateCurrentTime() {
    console.log(
      "updateCurrentTime: " +
        this.props.id.toString() +
        " (" +
        this.htmlPlayer.current.currentTime.toString() +
        ")"
    );
    this.setState({ currentTime: this.htmlPlayer.current.currentTime });
  }

  updateCurrentProgress(pct) {
    var newTime = Math.floor(pct * this.state.duration);
    console.log(
      "updateCurrentProgress: " +
        this.props.id.toString() +
        " (" +
        newTime.toString() +
        ")"
    );

    this.htmlPlayer.current.currentTime = newTime;
  }

  render() {
    return (
      <div>
        <div className="Sound">
          <PlayButton
            id={`${this.props.id}`}
            playing={this.props.active}
            playSound={this.setActive}
            pauseSound={this.setInActive}
          />
          <SoundTitle title={this.props.title} />
          <SoundTimer
            duration={this.state.duration}
            currentTime={this.state.currentTime}
          />
          <audio
            ref={this.htmlPlayer}
            preload="none"
            key={`${this.props.id}`}
            id={`SoundData_${this.props.id}`}
            onEnded={this.setNextTrack.bind(this)}
            onTimeUpdate={this.updateCurrentTime.bind(this)}
          >
            <source src={this.props.url} type="audio/mpeg" />
          </audio>
        </div>
        <ProgressBar
          duration={this.state.duration}
          currentTime={this.state.currentTime}
          updateCurrentProgress={this.updateCurrentProgress.bind(this)}
        />
      </div>
    );
  }
}
