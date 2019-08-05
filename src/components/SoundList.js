import React from "react";
import SoundData from "./data.json";
import Sound from "./Sound";

class SoundList extends React.Component {
  constructor() {
    super();

    var sounds = SoundData.map(sound => ({
      key: sound.id,
      id: sound.id,
      title: sound.title,
      url: sound.url,
      duration: sound.duration
    }));

    this.state = {
      SoundData,
      sounds: sounds,
      currentPlayerId: ""
    };
  }

  updateCurrentPlayer = id => {
    this.setState({ currentPlayerId: id.toString() });
  };

  pauseAllOtherTracks = e => {
    for (var i = 1; i < this.state.SoundData.length; i++) {
      var targetPlayerId = "SoundData_" + i.toString();
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
    this.setState({ currentPlayerId: (currentPlayerId + 1).toString() });

    var nextPlayerId = "SoundData_" + (currentPlayerId + 1).toString();
    var nextPlayer = document.getElementById(nextPlayerId);
    if (nextPlayer) nextPlayer.play();
  };

  render() {
    var sounds = this.state.sounds.map(sound => (
      <Sound
        active={sound.id.toString() === this.state.currentPlayerId}
        key={sound.id}
        id={sound.id}
        title={sound.title}
        url={sound.url}
        duration={sound.duration}
        pauseAllOtherTracks={this.pauseAllOtherTracks}
        startNextTrack={this.startNextTrack}
        updateCurrentPlayer={this.updateCurrentPlayer}
      />
    ));

    return (
      <div className="musics">
        <h2 className="container">Piano Podcast</h2>
        {sounds}
      </div>
    );
  }
}

export default SoundList;
