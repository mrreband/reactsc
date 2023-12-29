import React, { useState, useEffect, useRef, useCallback } from "react";
import parseRss from "../parseRSS";
import SoundData from "./data.json";

import { useParams } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "./LoadingIndicator";
import Playlist from "./Playlist";
import VolumeBar from "./VolumeBar";
import useSound from "../hooks/useSound";

function getRssData() {
    var result = parseRss();
    if (result) {
        return result;
    } else {
        return { tracks: SoundData };
    }
}

function Canvas() {
    const params = useParams();

    const [state, setState] = useState({
        SoundData: [],
        playlists: []
    });

    const audioPlayer = useRef(null);
    const { currentSoundId, setNextSound, setCurrentTime, setVolume, setProgress, playPause, currentTime } = useSound(audioPlayer, state.SoundData);

    const playlistTitle = () => {
        const playlist = state.playlists.find(
            (s) => s.slug === params.playlistSlug
        ) || {};
        return playlist.title || "Piano Podcast";
    };

    const playlistTracks = () => {
        if (params.playlistSlug === undefined) return state.SoundData;
        const playlist = state.playlists.find(pl => pl.slug === params.playlistSlug);
        if (playlist === undefined) return state.SoundData

        const tracks = state.SoundData.filter((s) => playlist.tracks.includes(s.slug))
        return tracks;
    }

    useEffect(() => {
        if (audioPlayer.current) {
            audioPlayer.current.onended = setNextSound;
            audioPlayer.current.ontimeupdate = setCurrentTime;
        }
    }, [setCurrentTime, setNextSound]);



    useEffect(() => {
        trackPromise(
            getRssData().then((result) => {
                const { tracks, playlists } = result;
                setState(prevState => ({
                    ...prevState,
                    SoundData: tracks,
                    playlists: playlists,
                }));
            })
        );
    }, []);

    return (
        <div className="musics">
            <LoadingIndicator />

            <div className="musics">
                <div className="PianoPodcastDiv">
                    <h2>{playlistTitle()}</h2>

                    <VolumeBar setVolume={setVolume} />
                </div>

                <Playlist
                    audioPlayer={audioPlayer}
                    tracks={playlistTracks()}
                    playPause={playPause}
                    setProgress={setProgress}
                    currentSoundId={currentSoundId}
                    currentTime={currentTime}
                />
            </div>

        </div>
    );
}

export default Canvas;