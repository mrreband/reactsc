import React, { Component } from "react";

export default class Sound extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <audio
          controls
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
