import React from "react";
import SoundData from "./data.json";
import Sound from "./Sound";

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
        {this.state.SoundData.map(sound => (
          <Sound 
          key={sound.id} 
          id={sound.id} 
          title={sound.title} 
          url={sound.url} 
          pauseAllOtherTracks={this.pauseAllOtherTracks}
          startNextTrack={this.startNextTrack}/>
        ))}
      </div>
    );
  }
}

export default SoundList;
