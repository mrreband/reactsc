import React from "react";
import SoundData from "./data.json";
import Sound from "./Sound";

class SoundList extends React.Component {
  constructor() {
    super();

    this.state = {
      SoundData,
      currentPlayerId: ""
    };
  }

  updateCurrentPlayer = id => {
    console.log("updateCurrentPlayer: " + id.toString());
    this.setState({ currentPlayerId: id.toString() });
  };

  setNextTrack = id => {
    var nextId = (id + 1).toString();
    console.log("setNextTrack: nextId = " + nextId);
    this.setState({ currentPlayerId: nextId });
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
