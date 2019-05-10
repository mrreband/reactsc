import React, { Component } from 'react'


class PlayButton extends Component {
  constructor(props){
    super(props);
    this.state = {addClass: false}
  }

  toggle = (e) => {
    e.preventDefault();
    this.setState({ addClass: !this.state.addClass })
    if (this.props.playing === true)
    {
      this.props.pauseSound(this.props.id)
    } else {
      this.props.playSound(this.props.id);
    }
  }

          // onClick={this.onClick}
        // key={`${this.props.id}`}
        // id={`PlayButton_${this.props.id}`}
        // type="button">{this.state.addClass}

  render() {
    let playClass =["play"];
    if(this.state.addClass){
      playClass.push("active")
    }
    return (
      <div className={playClass.join(' ')}
        onClick={this.toggle.bind(this)}
      >{this.state.addClass}
      </div>
    )
  }
}

export default PlayButton