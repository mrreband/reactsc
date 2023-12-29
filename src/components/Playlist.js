import React, { useState } from "react";

import { useParams } from "react-router-dom";
import Sound from "./Sound";

function Playlist({ SoundData, currentSoundId, Playlists, audioPlayer, playPause, setProgress, currentTime }) {
    // playlist stuff
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
        <div className="playlistDiv">
            <audio ref={audioPlayer}>
                {playlistTracks().map((sound) => (
                    <source
                        src={sound.url}
                        type="audio/mpeg"
                        key={sound.id}
                    />
                ))}
            </audio>

            {playlistTracks().map((sound) => (
                <Sound
                    active={sound.id.toString() === currentSoundId}
                    currentSoundId={currentSoundId}
                    currentTime={currentTime}
                    key={sound.id}
                    id={sound.id}
                    title={sound.title}
                    url={sound.url}
                    duration={sound.duration}
                    playPause={playPause}
                    setProgress={setProgress}
                />
            ))}
        </div>
    );
}

export default Playlist;