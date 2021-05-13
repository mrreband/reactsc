import React, { Component } from "react";
import MidiSequence from "../midi/Waves.json";
import MidiCanvas from "./MidiCanvas.js";
import PlayButton from "./PlayButton.js";
import ProgressBar from "./ProgressBar.js";
import SoundTimer from "./SoundTimer.js";
import SoundTitle from "./SoundTitle.js";

export default class Sound extends Component {
    initMidiNotes() {
        var midiNotes = Array(128).fill(false);
        return midiNotes;
    }

    constructor(props) {
        super(props);
        var midiNotes = this.initMidiNotes();

        this.state = {
            duration: this.props.duration,
            currentTime: 0,
            midiNotes,
            MidiSequence,
        };
    }

    getCurrentTime() {
        return this.props.active
            ? this.props.currentTime
            : this.state.currentTime;
    }

    playPause = () => {
        this.props.playPause(this.props.id);
    };

    setProgress = (pct) => {
        this.props.setProgress(pct);
    };

    updateCurrentTime() {
        const currentTicks = this.getCurrentTime() * 1920;

        const currentNotes = {};
        this.state.MidiSequence.filter(
            (midiNote) =>
                this.state.previousTicks <= midiNote.tick &&
                midiNote.tick <= currentTicks
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
                <div className={`Sound ${
                this.props.active === true ? "active" : ""
            }`}>
                    <PlayButton
                        id={`${this.props.id}`}
                        playing={this.props.active}
                        playPause={this.playPause}
                    />
                    <SoundTitle title={this.props.title} />
                    <SoundTimer
                        duration={this.state.duration}
                        currentTime={ this.getCurrentTime() }
                    />
                </div>
                <ProgressBar
                    duration={this.state.duration}
                    currentTime={ this.getCurrentTime() }
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
