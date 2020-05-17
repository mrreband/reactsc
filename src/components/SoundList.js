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
            currentTime: 0.0,
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

    updateCurrentTime() {
        let newTime = this.audioPlayer.current.currentTime;
        console.log(newTime);
        this.setState({ currentTime: newTime });
    }
    updateCurrentProgress(pct) {
        console.log(pct);
        var newTime = Math.floor(pct * this.state.duration);
        this.audioPlayer.current.currentTime = newTime;
    }

    getSoundById = (id) => {
        return this.state.SoundData.find(
            (s) => s.id.toString() === id.toString()
        );
    };

    toggleActive = (id) => {
        const currentSong = this.getSoundById(id);
        currentSong.active = !currentSong.active;
    };

    updateCurrentPlayer = (id) => {
        if (this.state.currentPlayerId) {
            this.toggleActive(this.state.currentPlayerId);
        } else {
            this.toggleActive(id);
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
            const sound = this.getSoundById(id);
            this.audioPlayer.current.src = sound.url;
            this.audioPlayer.current.play();
        }
    };

    render() {
        return (
            <div className="musics">
                <h2>Piano Podcast</h2>
                <LoadingIndicator />
                <audio
                    ref={this.audioPlayer}
                    onEnded={this.setNextTrack}
                    onTimeUpdate={this.updateCurrentTime.bind(this)}
                >
                    {this.state.SoundData.map((sound) => (
                        <source
                            src={sound.url}
                            type="audio/mpeg"
                            key={sound.id}
                        />
                    ))}
                </audio>
                {this.state.SoundData.map((sound) => (
                    <Sound
                        active={
                            sound.id.toString() === this.state.currentPlayerId
                        }
                        currentPlayerId={this.state.currentPlayerId}
                        currentTime={this.state.currentTime}
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
