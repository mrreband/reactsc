import React, { Component } from "react";
import MidiNote from "./MidiNote.js";

export default class MidiCanvas extends Component {
  render() {
    return (
      <div className="MidiCanvas">
        {Object.keys(this.props.midiNotes).map((key, value) => (
          <MidiNote
            key={`${this.props.id}_${key}`}
            noteNumber={key}
            noteOn={this.props.midiNotes[key]}
          />
        ))}
      </div>
    );
  }
}
