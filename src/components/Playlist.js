import React, { useState } from "react";

import { useParams } from "react-router-dom";
import Sound from "./Sound";
import VolumeBar from "./VolumeBar";

function Playlist({ SoundData, currentSoundId, Playlists, audioPlayer, playPause, setVolume, setProgress, currentTime }) {
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

    // SoundList stuff
    const [state, setState] = useState({
        currentVolume: 1.0,
    });

    return (
        <div className="musics">
            {/* todo: this dif with title and volumebar do not belong in the playlist component */}
            <div className="PianoPodcastDiv">
                <h2>{playlistTitle()}</h2>

                <VolumeBar
                    setVolume={setVolume}
                    volume={state.currentVolume}
                />
            </div>

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