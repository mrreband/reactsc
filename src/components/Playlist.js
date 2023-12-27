import React from "react";
import { useParams } from "react-router-dom";
import SoundList from "./SoundList";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class Playlist extends React.Component {
    constructor() {
        super();
        this.state = {
            playlistSlug: "",
            currentSoundId: "",
            currentTime: 0.0,
            currentVolume: 1.0,
        };
    }
    componentDidMount() {
        let { playlistSlug } = this.props.params;
        this.setState({ playlistSlug })
    }

    playlistTracks = () => {
        if (this.state.playlistSlug === undefined) return this.props.SoundData;
        const filteredTracks = this.props.SoundData.filter(
            (s) => s.playlists && s.playlists.includes(this.state.playlistSlug)
        );
        if (filteredTracks.length > 0) return filteredTracks;
        return this.props.SoundData;
    };

    playlistTitle = () => {
        const playlist = this.props.Playlists.find(
            (s) => s.slug === this.state.playlistSlug
        ) || {};
        return playlist.title || "Piano Podcast";
    };

    render() {
        return (
            <div className="musics">
                <SoundList SoundData={this.playlistTracks()} Title={this.playlistTitle()} />
            </div>
        );
    }
}

export default withParams(Playlist);
