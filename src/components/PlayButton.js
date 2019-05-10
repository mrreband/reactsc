import React, { Component } from 'react'


class PlayButton extends Component {
  toggle = (e) => {
    e.preventDefault();
    if (this.props.playing === true)
    {
      this.props.pauseSound(this.props.id)
    } else {
      this.props.playSound(this.props.id);
    }
  }

  render() {
    let playClass =["play"];
    if(this.props.playing === true){
      playClass.push("active")
    }
    return (
      <div className={playClass.join(' ')}
        onClick={this.toggle.bind(this)}
      >
      </div>
    )
  }
}

export default PlayButton