import React, { Component } from "react";
import PlayButton from "./PlayButton.js";
import SoundTitle from "./SoundTitle.js";
import SoundTimer from "./SoundTimer.js";

export default class Sound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: this.props.duration,
      currentTime: 0
    }
  }

  playSound = (buttonKey) => {
    document.getElementById(`SoundData_${this.props.id}`).play();
    this.props.playSound(buttonKey);
  }

  pauseSound = (buttonKey) => {
    document.getElementById(`SoundData_${this.props.id}`).pause();
    this.props.pauseSound(buttonKey);
  }

  updateCurrentTime() {
    var audioElement = document.getElementById(`SoundData_${this.props.id}`);
    this.setState({currentTime: Math.ceil(audioElement.currentTime)});
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
          playPauseSound={this.props.playPauseSound}
          /> 
        <SoundTitle title={this.props.title} />
        <SoundTimer 
          duration={this.state.duration} 
          currentTime={this.state.currentTime} />
        <audio
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
