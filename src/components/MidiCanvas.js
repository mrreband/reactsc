import React, { Component } from "react";
import MidiNote from "./MidiNote.js";
import MidiSequence from "../midi/Waves.json";

export default class MidiCanvas extends Component {
  initMidiNotes() {
    var midiNotes = [];
    for (var i = 0; i < 128; i++) {
      var midiNote = {
        noteNumber: i,
        noteOn: false
      };
      midiNotes.push(midiNote);
    }
    return midiNotes;
  }

  constructor() {
    super();

    var midiNotes = this.initMidiNotes();
    this.state = {
      midiNotes,
      MidiSequence
    };
  }

  dedupe(list) {
    return Array.from(new Set(list));
  }

  render() {
    //get a list of all notes and their note on status at currentTime
    //192 ticks per second
    var currentTicks = this.props.currentTime * 1920;
    var resolution = 200;
    var minTime = currentTicks - resolution;
    var maxTime = currentTicks + resolution;

    var currentNotes = this.state.MidiSequence.filter(
      midiNote => minTime <= midiNote.tick && midiNote.tick <= maxTime
    );

    var onNotes = currentNotes
      .filter(note => note.noteOn === true)
      .map(function(note) {
        return note.noteNumber;
      });

    console.log(onNotes);
    return (
      <div className="MidiCanvas">
        {this.state.midiNotes.map(midiNote => (
          <MidiNote
            key={`${this.props.id}_${midiNote.noteNumber}`}
            noteNumber={midiNote.noteNumber}
            noteOn={onNotes.includes(midiNote.noteNumber)}
          />
        ))}
      </div>
    );
  }
}
