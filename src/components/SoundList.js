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
        this.audioPlayer = React.createRef();

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
        if (this.state.currentPlayerId) {
            const currentSongId = this.state.currentPlayerId;
            const currentSong = this.state.SoundData.find(
                (s) => s.id.toString() === currentSongId
            );
            currentSong.active = false;
        }
        this.setState({ currentPlayerId: id.toString() });
    };

    setNextTrack = (id) => {
        var nextId = (id + 1).toString();
        this.updateCurrentPlayer(nextId);
    };

    playPause = (id) => {
        if (id.toString() === this.state.currentPlayerId) {
            this.updateCurrentPlayer("");
            this.audioPlayer.current.pause();
        } else {
            this.updateCurrentPlayer(id);
            this.audioPlayer.current.play();
        }
    };

    render() {
        return (
            <div className="musics">
                <h2>Piano Podcast</h2>
                <LoadingIndicator />
                <audio ref={this.audioPlayer}>
                    {this.state.SoundData.map((sound) => (
                        <source src={sound.url} type="audio/mpeg" />
                    ))}
                </audio>
                {this.state.SoundData.map((sound) => (
                    <Sound
                        active={
                            sound.id.toString() === this.state.currentPlayerId
                        }
                        currentPlayerId={this.state.currentPlayerId}
                        key={sound.id}
                        id={sound.id}
                        title={sound.title}
                        url={sound.url}
                        duration={sound.duration}
                        playPause={this.playPause}
                    />
                ))}
            </div>
        );
    }
}

export default SoundList;
