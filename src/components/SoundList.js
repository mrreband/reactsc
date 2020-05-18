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

    setCurrentTime() {
        let newTime = this.audioPlayer.current.currentTime;
        this.setState({ currentTime: newTime });
    }

    currentSound = () => {
        return this.getSoundById(this.state.currentPlayerId);
    };

    getSoundById = (id) => {
        return this.state.SoundData.find(
            (s) => s.id.toString() === id.toString()
        );
    };

    toggleActive = (id) => {
        const sound = this.getSoundById(id);
        sound.active = !sound.active;
    };

    setCurrentSound = (id) => {
        if (this.state.currentPlayerId) {
            this.toggleActive(this.state.currentPlayerId);
        } else {
            this.toggleActive(id);
        }
        this.setState({ currentPlayerId: id.toString() });
    };

    setNextSound = () => {
        const nextId = (parseInt(this.state.currentPlayerId) + 1).toString();
        this.playPause(nextId);
    };

    setProgress = (pct) => {
        const newPosition = this.currentSound().duration * pct;
        this.audioPlayer.current.currentTime = newPosition;
    };

    playPause = (id) => {
        if (id.toString() === this.state.currentPlayerId) {
            if (this.audioPlayer.current.paused) {
                this.audioPlayer.current.play();
            } else {
                this.audioPlayer.current.pause();
            }
        } else {
            this.audioPlayer.current.pause();
            this.setCurrentSound(id);
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
                    onEnded={this.setNextSound}
                    onTimeUpdate={this.setCurrentTime.bind(this)}
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
                        setProgress={this.setProgress}
                    />
                ))}
            </div>
        );
    }
}

export default SoundList;
