import React, { Component } from "react";

class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.svg = React.createRef();
  }

  toggle = (e) => {
    e.preventDefault();

    var svg = this.svg.current;
    svg.getElementById("circle1").classList.toggle("rotated");
    svg.getElementById("circle2").classList.toggle("rotated");
    this.props.playPause();
  };

  render() {
    return (
      <div className="PlayButtonContainer SoundElement">
        <svg
          className={`PlayButton PlaySvg ${
            this.props.playing === true ? "active" : ""
          }`}
          viewBox="0 0 163 163"
          width="40"
          height="40"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          ref={this.svg}
          onClick={this.toggle.bind(this)}
        >
          <g fill="none" strokeWidth="3" stroke="#000000">
            <circle cx="80" cy="80" r="65" id="circle2" className="circle" />
            <circle cx="80" cy="80" r="60" id="circle1" className="circle" />

            <rect
              x="55"
              y="42.3158594"
              rx="10"
              ry="10"
              width="10"
              height="72.4"
              fill="#455A64"
              className="pause"
              id="pause1"
            />
            <rect
              x="92"
              y="42.3158594"
              rx="10"
              ry="10"
              width="10"
              height="72.4"
              fill="#455A64"
              className="pause"
              id="pause2"
            />

            <path
              d="M105.9,74.4158594
                     L67.2,44.2158594
                     C63.5,41.3158594 58,43.9158594 58,48.7158594
                     L58,109.015859
                     C58,113.715859 63.4,116.415859 67.2,113.515859
                     L105.9,83.3158594
                     C108.8,81.1158594 108.8,76.6158594 105.9,74.4158594
                     L105.9,74.4158594"
              className="play"
              fill="#455A64"
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default PlayButton;
