import React, { Component } from 'react'

export default class SoundTitle extends Component {
  render() {
    return (
      <span className="SoundTitle">
        {this.props.title}
      </span>
    )
  }
}
