import React from "react";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Canvas extends React.Component {
    constructor() {
        super();
        
        this.state = {
            SoundData: [],
            playlistSlug: "",
            currentSoundId: "",
            currentTime: 0.0,
            currentVolume: 1.0,
        };
    }
    componentDidMount() {
      let { playlistSlug } = this.props.params;
      this.setState({playlistSlug})
      }

    render() {
        return (
            <div className="musics">
              Playlist:  {this.state.playlistSlug}
            </div>
        );
    }
}

export default withParams(Canvas);
