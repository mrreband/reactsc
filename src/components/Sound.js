import React, { Component } from "react";
import PlayButton from "./PlayButton.js";
import SoundTitle from "./SoundTitle.js";
import SoundTimer from "./SoundTimer.js";

export default class Sound extends Component {
  constructor(props) {
    super(props);
    this.htmlPlayer = React.createRef();
    this.state = {
      duration: this.props.duration,
      currentTime: 0
    }
  }

  playSound = () => {
    this.htmlPlayer.current.play();
    this.props.updateCurrentPlayer(this.props.id);
  }
  
  pauseSound = () => {
    this.htmlPlayer.current.pause();
    this.props.updateCurrentPlayer("");
  }

  updateCurrentTime() {
    this.setState({currentTime: Math.ceil(this.htmlPlayer.current.currentTime)});
  }

  render() {
    return (
      <div>
        <PlayButton
          id={`${this.props.id}`}
          playing={this.props.active}
          buttonText={(this.props.active) ? "Pause" : "Play"}
          playSound={this.playSound}
          pauseSound={this.pauseSound}
          />
        <h2>
        <SoundTitle title={this.props.title} />
        </h2>
        <SoundTimer
          duration={this.state.duration}
          currentTime={this.state.currentTime} />
        <audio
          ref={this.htmlPlayer}
          preload="none"
          key={`${this.props.id}`}
          id={`SoundData_${this.props.id}`}
          onPlay={this.props.pauseAllOtherTracks.bind(this)}
          onEnded={this.props.startNextTrack.bind(this)}
          onTimeUpdate={this.updateCurrentTime.bind(this)}
        >
          <source src={this.props.url} type="audio/mpeg" />
        </audio>
      </div>
    );
  }
}
