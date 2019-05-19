import React, { Component } from "react";
import PlayButton from "./PlayButton.js";
import SoundTitle from "./SoundTitle.js";
import SoundTimer from "./SoundTimer.js";
import ProgressBar from "./ProgressBar.js";
import MidiCanvas from "./MidiCanvas.js";
import MidiSequence from "../midi/Waves.json";

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
      currentTicks: 0,
      previousTicks: 0,
      midiNotes: midiNotes,
      MidiSequence
    };
  }

  playSound = () => {
    this.htmlPlayer.current.play();
    this.props.updateCurrentPlayer(this.props.id);
  };

  pauseSound = () => {
    this.htmlPlayer.current.pause();
    this.props.updateCurrentPlayer("");
  };

  updateCurrentTime() {
    this.setState({ previousTicks: this.state.currentTicks });
    console.log(this.state.currentTicks);

    this.setState({
      currentTime: this.htmlPlayer.current.currentTime,
      currentTicks: this.htmlPlayer.current.currentTime * 1920
    });

    var currentNotes = {};
    this.state.MidiSequence.filter(
      midiNote =>
        this.state.previousTicks <= midiNote.tick &&
        midiNote.tick <= this.state.currentTicks
    ).map(function(note) {
      currentNotes[note.noteNumber] = note.noteOn;
    });

    var newMidiNotes = {};
    Object.keys(this.state.midiNotes).map(
      (key, value) =>
        (newMidiNotes[key] =
          key in currentNotes ? currentNotes[key] : this.state.midiNotes[key])
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
            playSound={this.playSound}
            pauseSound={this.pauseSound}
          />
          <SoundTitle title={this.props.title} />
          <SoundTimer
            duration={this.state.duration}
            currentTime={this.state.currentTime}
          />
          <audio
            ref={this.htmlPlayer}
            preload="none"
            key={`${this.props.id}`}
            id={`SoundData_${this.props.id}`}
            onPlay={this.props.pauseAllOtherTracks.bind(this)}
            onEnded={this.props.startNextTrack.bind(this)}
            onTimeUpdate={this.updateCurrentTime.bind(this)}
          >
            <source src={this.props.url} type="audio/mpeg" />
          </audio>
        </div>
        <ProgressBar
          duration={this.state.duration}
          currentTime={this.state.currentTime}
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
