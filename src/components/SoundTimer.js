import React, { Component } from 'react'

export default class SoundTimer extends Component {
  getDisplayLength = (duration) =>
  {
    var minutes = Math.floor(duration / 60);
    var remainingSeconds = duration % 60;
    return `${minutes}:${("00" + remainingSeconds).slice(-2)}`  
  }

  render() {
    var duration = this.getDisplayLength(this.props.duration)
    var currentTime = this.getDisplayLength(this.props.currentTime)

    return (
      <span>
        ----- {currentTime} / {duration} ------
      </span>
    )
  }
}
