import React from "react";
import SoundData from "./data.json";

class SoundList extends React.Component {
  constructor() {
    super();
    this.state = {
      SoundData
    };
  }

  pauseAllOtherTracks = e => {
    for (var i = 1; i < this.state.SoundData.length; i++) {
      var targetPlayerId = 'SoundData_' + i.toString();
      if (targetPlayerId !== e.target.id) {
        var player = document.getElementById(targetPlayerId);
        player.pause();
      }
    }
  };

  startNextTrack = e => {
    var currentPlayer = document.getElementById(e.target.id);
    currentPlayer.pause();
    currentPlayer.currentTime = 0;

    var currentPlayerId = Number(e.target.id.match(/\d+/)[0]);
    var nextPlayerId = "SoundData_" + (currentPlayerId + 1).toString();
    var nextPlayer = document.getElementById(nextPlayerId);
    if (nextPlayer) nextPlayer.play();
  };

  render() {
    return (
      <div>
        {this.state.SoundData.map(value => (
          <div>
            <h2>{value.title}</h2>
            <audio
              controls
              id={`SoundData_${value.id}`}
              onPlay={this.pauseAllOtherTracks}
              onEnded={this.startNextTrack}
            >
              <source src={value.url} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

export default SoundList;
