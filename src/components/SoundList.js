import React from "react";
import { trackPromise } from "react-promise-tracker";
import parseRss from "../parseRSS";
import SoundData from "./data.json";
import LoadingIndicator from "./LoadingIndicator";
import Sound from "./Sound";

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
            currentSoundId: "",
            currentTime: 0.0,
        };
    }

    async componentWillMount() {
        trackPromise(
            getRssData().then((songs) => {
                this.setState({
                    SoundData: songs,
                });
            })
        );
        this.render();
    }

    currentSound = () => {
        return this.getSoundById(this.state.currentSoundId);
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

    /** set the currentSound and set the active prop */
    setCurrentSound = (id) => {
        if (this.state.currentSoundId) {
            this.toggleActive(this.state.currentSoundId);
        } else {
            this.toggleActive(id);
        }
        this.setState({ currentSoundId: id.toString() });
    };

    /** skip to the next track when one track ends */
    setNextSound = () => {
        const nextId = (parseInt(this.state.currentSoundId) + 1).toString();
        if (this.getSoundById(nextId) !== undefined) {
            this.playPause(nextId);
        }
    };

    /** Set the currentTime from the audio element */
    setCurrentTime() {
        let newTime = this.audioPlayer.current.currentTime;
        this.setState({ currentTime: newTime, currentTicks: newTime * 1920 });
    }

    /** Set the current time from the Progress Bar */
    setProgress = (pct) => {
        const newPosition = this.currentSound().duration * pct;
        this.audioPlayer.current.currentTime = newPosition;
    };

    /** toggle play / pause status, update current sound if the id is different */
    playPause = (id) => {
        if (id.toString() === this.state.currentSoundId) {
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
                            sound.id.toString() === this.state.currentSoundId
                        }
                        currentSoundId={this.state.currentSoundId}
                        currentTime={this.state.currentTime}
                        currentTicks={this.state.currentTicks}
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
