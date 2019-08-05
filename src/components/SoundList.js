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

  setNextTrack = id => {
    var nextId = (id + 1).toString();
    console.log("setNextTrack: nextId = " + nextId);
    this.setState({ currentPlayerId: nextId });
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
        setNextTrack={this.setNextTrack}
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
