import React from "react";
import parseRss from "../parseRSS";
import getPlaylist from "../getPlaylist";
import SoundData from "./data.json";
import Sound from "./Sound";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "./LoadingIndicator";

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
      Playlist: [],
      currentPlayerId: "",
    };
  }

  async componentWillMount() {
    trackPromise(
      getRssData().then((songs) => {
        let playlist = getPlaylist(songs);
        console.log(playlist);
        this.setState({
          SoundData: songs,
          Playlist: playlist,
        });
      })
    );
    this.render();
  }

  updateCurrentPlayer = (id) => {
    this.setState({ currentPlayerId: id.toString() });
  };

  pauseAllOtherTracks = (e) => {
    for (var i = 1; i < this.state.SoundData.length; i++) {
      var targetPlayerId = "SoundData_" + i.toString();
      if (targetPlayerId !== e.target.id) {
        var player = document.getElementById(targetPlayerId);
        player.pause();
      }
    }
  };

  setNextTrack = (id) => {
    var nextId = (id + 1).toString();
    this.updateCurrentPlayer(nextId);
  };

  render() {
    return (
      <div className="musics">
        <h2>Piano Podcast</h2>
        <LoadingIndicator />
        <audio>
          {this.state.SoundData.map((sound) => (
            <source src={sound.url} type="audio/mpeg" />
          ))}
        </audio>
        <audio controls>
          <source
            src="https://feeds.soundcloud.com/stream/630013437-michael-reband-star-from-star.mp3"
            type="audio/mpeg"
          />
          <source
            src="https://feeds.soundcloud.com/stream/659235344-michael-reband-then-again.mp3"
            type="audio/mpeg"
          />
        </audio>
      </div>
    );
  }
}

export default SoundList;
