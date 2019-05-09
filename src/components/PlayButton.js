import React, { Component } from 'react'

export default class PlayButton extends Component {
  state = {
    playing: false, 
    text: "Play"
  }
  
  onClick = (e) => {
    e.preventDefault();
    if (this.state.playing === true)
    {
      this.props.pauseSound(this.props.id)
      this.setState({playing: false, text: "Play"});
    } else {
      this.props.playSound(this.props.id);
      this.setState({playing: true, text: "Pause"});
    }
  }

  render() {
    return (
      <button 
        onClick={this.onClick}
        key={`${this.props.id}`} 
        id={`PlayButton_${this.props.id}`} 
        type="button"> 
        {this.state.text}
      </button>
    )
  }
}
