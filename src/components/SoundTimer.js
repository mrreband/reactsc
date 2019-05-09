import React, { Component } from 'react'

export default class SoundTimer extends Component {
  render() {
    return (
      <span>
        {this.props.len}
      </span>
    )
  }
}
