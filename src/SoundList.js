import React from "react";
import SoundData from "./data.json";

class SoundList extends React.Component {
  constructor() {
    super();
    this.state = {
      SoundData
    };
  }

  render() {
    return (
      <div>
        {this.state.SoundData.map(value => (
          <div>
            <h2>{value.title}</h2>
            <p>{value.description}</p>
            <p>{value['enclosures'].url}</p>
            <audio controls>
              <source src={value.enclosures[1]} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

export default SoundList;
