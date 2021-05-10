import React, { Component } from "react";
import MidiSequence from "../midi/Waves.json";
import MidiCanvas from "./MidiCanvas.js";
import PlayButton from "./PlayButton.js";
import ProgressBar from "./ProgressBar.js";
import SoundTimer from "./SoundTimer.js";
import SoundTitle from "./SoundTitle.js";

export default class Sound extends Component {
    initMidiNotes() {
        var midiNotes = {};
        for (var i = 0; i < 128; i++) {
            midiNotes[i] = false;
        }
        return midiNotes;
    }

    constructor(props) {
        super(props);
        var midiNotes = this.initMidiNotes();
        this.htmlPlayer = React.createRef();

        this.state = {
            duration: this.props.duration,
            currentTime: 0,
            midiNotes,
            MidiSequence,
        };
    }

    playPause = () => {
        this.props.playPause(this.props.id);
    };

    setProgress = (pct) => {
        this.props.setProgress(pct);
    };

    updateCurrentTime() {
        this.setState({ previousTicks: this.state.currentTicks });
        console.log(this.state.currentTicks);

        this.setState({
            currentTime: this.htmlPlayer.current.currentTime,
            currentTicks: this.htmlPlayer.current.currentTime * 1920,
        });

        var currentNotes = {};
        this.state.MidiSequence.filter(
            (midiNote) =>
                this.state.previousTicks <= midiNote.tick &&
                midiNote.tick <= this.state.currentTicks
        ).forEach(function (note) {
            currentNotes[note.noteNumber] = note.noteOn;
        });

        var newMidiNotes = {};
        Object.keys(this.state.midiNotes).map(
            (key, value) =>
                (newMidiNotes[key] =
                    key in currentNotes
                        ? currentNotes[key]
                        : this.state.midiNotes[key])
        );

        this.setState({ midiNotes: newMidiNotes });
    }

    render() {
        return (
            <div>
                <div className="Sound">
                    <PlayButton
                        id={`${this.props.id}`}
                        playing={this.props.active}
                        playPause={this.playPause}
                    />
                    <SoundTitle title={this.props.title} />
                    <SoundTimer
                        duration={this.state.duration}
                        currentTime={
                            this.props.active
                                ? this.props.currentTime
                                : this.state.currentTime
                        }
                    />
                </div>
                <ProgressBar
                    duration={this.state.duration}
                    currentTime={
                        this.props.active
                            ? this.props.currentTime
                            : this.state.currentTime
                    }
                    setProgress={this.setProgress.bind(this)}
                />
                <MidiCanvas
                    key={this.props.id}
                    id={`MidiCanvas_${this.props.id}`}
                    midiNotes={this.state.midiNotes}
                />
            </div>
        );
    }
}
