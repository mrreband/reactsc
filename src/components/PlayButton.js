import React, { Component } from 'react'
export default class PlayButton extends Component {
 
  onClick = (e) => {
    e.preventDefault();
    if (this.props.playing === true)
    {
      this.props.pauseSound(this.props.id)
    } else {
      this.props.playSound(this.props.id);
    }
  }

  render() {
    return (
      <button 
        onClick={this.onClick}
        key={`${this.props.id}`} 
        id={`PlayButton_${this.props.id}`} 
        type="button"> 
        {this.props.buttonText}
      </button>
    )
  }
}
