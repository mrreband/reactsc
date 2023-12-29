import React, { useState, useEffect, useRef } from "react";
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

    const [soundData, setSoundData] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState({});

    const audioPlayer = useRef(null);
    const { currentSoundId, currentTime, setNextSound, setCurrentTime, setVolume, setProgress, playPause } = useSound(audioPlayer, soundData);

    const playlistTitle = () => {
        return currentPlaylist.title || "Piano Podcast";
    };

    const playlistTracks = () => {
        if (currentPlaylist.tracks) {
            const tracks = soundData.filter((s) => currentPlaylist.tracks.includes(s.slug))
            return tracks;
        }
        return soundData;
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
                setSoundData(tracks);
                setPlaylists(playlists);
                if (params.playlistSlug !== undefined) {
                    setCurrentPlaylist(playlists.find((pl) => pl.slug === params.playlistSlug) || {});
                }
            })
        );
    }, [params.playlistSlug]);

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
