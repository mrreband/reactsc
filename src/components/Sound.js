import React, { Component } from "react";
import PlayButton from "./PlayButton.js";
import SoundTitle from "./SoundTitle.js";
import SoundTimer from "./SoundTimer.js";

export default class Sound extends Component {
  playSound = (buttonKey) => {
    document.getElementById(`SoundData_${this.props.id}`).play();
  }

  pauseSound = (buttonKey) => {
    document.getElementById(`SoundData_${this.props.id}`).pause();
  }

  render() {
    return (
      <div>
        <PlayButton  
          id={`${this.props.id}`}
          playSound={this.playSound}
          pauseSound={this.pauseSound}
          /> 
        <SoundTitle title={this.props.title} />
        <SoundTimer len={this.props.len} />
        <audio
          preload="none"
          key={`${this.props.id}`}
          id={`SoundData_${this.props.id}`}
          onPlay={this.props.pauseAllOtherTracks.bind(this)}
          onEnded={this.props.startNextTrack.bind(this)}
        >
          <source src={this.props.url} type="audio/mpeg" />

        </audio>
      </div>
    );
  }
}
