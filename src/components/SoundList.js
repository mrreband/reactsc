import React from "react";
import parseRss from "../parseRSS";
import SoundData from "./data.json";
import Sound from "./Sound";

class SoundList extends React.Component {
  constructor() {
    super();

    this.state = {
      SoundData: [],
      currentPlayerId: ""
    };
  }

  async componentWillMount() {
    var songs = await parseRss();
    if (songs) {
      this.setState({ SoundData: songs });
    } else {
      this.setState({ SoundData: SoundData });
    }
    this.render();
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

  setNextTrack = id => {
    var nextId = (id + 1).toString();
    console.log("setNextTrack: nextId = " + nextId);
    this.updateCurrentPlayer(nextId);
  };

  render() {
    return (
      <div className="musics">
        <h2 className="container">Piano Podcast</h2>
        {this.state.SoundData.map(sound => (
          <Sound
            active={sound.id.toString() === this.state.currentPlayerId}
            currentPlayerId={this.state.currentPlayerId}
            key={sound.id}
            id={sound.id}
            title={sound.title}
            url={sound.url}
            duration={sound.duration}
            setNextTrack={this.setNextTrack}
            updateCurrentPlayer={this.updateCurrentPlayer}
          />
        ))}
      </div>
    );
  }
}

export default SoundList;
