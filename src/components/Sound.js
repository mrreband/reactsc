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

  componentDidUpdate() {
    if (
      (this.props.active === true) &
      this.htmlPlayer.current.paused &
      (this.htmlPlayer.current.currentTime === 0)
    ) {
      this.playSound();
    } else if (
      (this.props.active === false) &
      !this.htmlPlayer.current.paused
    ) {
      this.pauseSound();
    }
  }

  setCurrentPlayer = () => {
    if (this.props.currentPlayerId !== this.props.id) {
      this.props.updateCurrentPlayer(this.props.id);
    }
  };

  unsetCurrentPlayer = () => {
    this.props.updateCurrentPlayer("");
  };

  playSound = () => {
    this.htmlPlayer.current.play();
  };

  pauseSound = () => {
    this.htmlPlayer.current.pause();
  };

  setNextTrack = () => {
    this.props.setNextTrack(this.props.id);
  };

  updateCurrentTime() {
    this.setState({ currentTime: this.htmlPlayer.current.currentTime });
  }

  updateCurrentProgress(pct) {
    var newTime = Math.floor(pct * this.state.duration);
    this.htmlPlayer.current.currentTime = newTime;
  }

  render() {
    return (
      <div>
        <div className="Sound">
          <PlayButton
            id={`${this.props.id}`}
            playing={this.props.active}
            playSound={this.setCurrentPlayer}
            pauseSound={this.unsetCurrentPlayer}
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
