import React, { Component } from 'react'

export default class SoundTitle extends Component {
  render() {
    return (
      <h4 className="SoundTitle">
        {this.props.title}
      </h4>
    )
  }
}
