import React from "react";
import parseRss from "../parseRSS";
import SoundData from "./data.json";
import Sound from "./Sound";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="#455A64" height="100" width="100" />
      </div>
    )
  );
};

function getRssData() {
  var songs = parseRss();
  if (songs) {
    return songs;
  } else {
    return SoundData;
  }
}

class SoundList extends React.Component {
  constructor() {
    super();

    this.state = {
      SoundData: [],
      currentPlayerId: ""
    };
  }

  async componentWillMount() {
    trackPromise(
      getRssData().then(songs => {
        this.setState({
          SoundData: songs
        });
      })
    );
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
    this.updateCurrentPlayer(nextId);
  };

  render() {
    return (
      <div className="musics">
        <h2>Piano Podcast</h2>
        <LoadingIndicator />
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
