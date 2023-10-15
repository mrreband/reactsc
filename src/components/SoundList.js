import React from "react";
import Sound from "./Sound";
import VolumeBar from "./VolumeBar";

class SoundList extends React.Component {
    constructor() {
        super();
        this.audioPlayer = React.createRef();

        this.state = {
            currentSoundId: "",
            currentTime: 0.0,
            currentVolume: 1.0,
        };
    }

    currentSound = () => {
        return this.getSoundById(this.state.currentSoundId);
    };

    getSoundById = (id) => {
        return this.props.SoundData.find(
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
        this.setState({ currentTime: newTime });
    }

    /** Set the current time from the Progress Bar */
    setProgress = (pct) => {
        const newPosition = this.currentSound().duration * pct;
        this.audioPlayer.current.currentTime = newPosition;
    };

    /** Set volume */
    setVolume = (pct) => {
        this.audioPlayer.current.volume = pct;
        this.setState({currentVolume: pct});
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
                <div className="PianoPodcastDiv">
                    <h2>Piano Podcast</h2>

                    <VolumeBar
                        setVolume={this.setVolume.bind(this)}
                        volume={this.state.currentVolume}
                    />
                </div>

                <audio
                    ref={this.audioPlayer}
                    onEnded={this.setNextSound}
                    onTimeUpdate={this.setCurrentTime.bind(this)}
                >
                    {this.props.SoundData.map((sound) => (
                        <source
                            src={sound.url}
                            type="audio/mpeg"
                            key={sound.id}
                        />
                    ))}
                </audio>

                {this.props.SoundData.map((sound) => (
                    <Sound
                        active={
                            sound.id.toString() === this.state.currentSoundId
                        }
                        currentSoundId={this.state.currentSoundId}
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
