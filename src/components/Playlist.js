import React from "react";
import { useParams } from "react-router-dom";
import SoundList from "./SoundList";

function Playlist({ SoundData, Playlists }) {
    const { playlistSlug } = useParams();
    const playlistTracks = () => {
        if (playlistSlug === undefined) return SoundData;
        const filteredTracks = SoundData.filter(
            (s) => s.playlists && s.playlists.includes(playlistSlug)
        );
        if (filteredTracks.length > 0) return filteredTracks;
        return SoundData;
    };

    const playlistTitle = () => {
        const playlist = Playlists.find(
            (s) => s.slug === playlistSlug
        ) || {};
        return playlist.title || "Piano Podcast";
    };

    return (
        <div className="musics">
            <SoundList SoundData={playlistTracks()} Title={playlistTitle()} />
        </div>
    );
}

export default Playlist;