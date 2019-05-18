import React, { Component } from "react";

export default class MidiNote extends Component {
  render() {
    const MidiNoteStyle = {
      display: "inline",
      backgroundColor: this.props.noteOn ? "#000000" : "#ffffff",
      left: this.props.noteNumber * 5,
      padding: "1px"
    };

    return <div className="MidiNote" style={MidiNoteStyle} />;
  }
}
