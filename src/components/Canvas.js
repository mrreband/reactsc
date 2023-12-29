import React, { useState, useEffect, useRef, useCallback } from "react";
import parseRss from "../parseRSS";
import SoundData from "./data.json";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "./LoadingIndicator";
import Playlist from "./Playlist";
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
    const [state, setState] = useState({
        SoundData: [],
        playlists: [],
        currentTime: 0.0,
        currentVolume: 1.0,
    });

    const audioPlayer = useRef(null);
    const { currentSoundId, currentSound, setCurrentSoundId, setCurrentSound, getSoundById } = useSound(null, state.SoundData);

    const playPause = useCallback((id) => {
        if (id.toString() === currentSoundId) {
            if (audioPlayer.current.paused) {
                audioPlayer.current.play();
            } else {
                audioPlayer.current.pause();
            }
        } else {
            audioPlayer.current.pause();
            setCurrentSound(id);
            const sound = getSoundById(id);
            if (sound !== undefined) {
                audioPlayer.current.src = sound.url;
                audioPlayer.current.play();
            }
        }
    }, [getSoundById, currentSoundId, setCurrentSound]);

    const setCurrentTime = useCallback(() => {
        let newTime = audioPlayer.current.currentTime;
        setState(prevState => ({ ...prevState, currentTime: newTime }));
    }, []);

    const setProgress = (pct) => {
        const newPosition = currentSound().duration * pct;
        audioPlayer.current.currentTime = newPosition;
    };

    const setVolume = (pct) => {
        audioPlayer.current.volume = pct;
        setState(prevState => ({ ...prevState, currentVolume: pct }));
    };

    const setNextSound = useCallback(() => {
        const nextId = (parseInt(currentSoundId) + 1).toString();
        setState(prevState => ({ ...prevState, currentTime: 0.0 }));
        playPause(nextId);
    }, [currentSoundId]);

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

            <Router>
                <Switch>
                    <Route exact path={["/", "/playlists/:playlistSlug"]}>
                        <div className="musics">

                            <Playlist
                                audioPlayer={audioPlayer}
                                SoundData={state.SoundData}
                                Playlists={state.playlists}
                                playPause={playPause}
                                setProgress={setProgress}
                                setVolume={setVolume}
                                currentSoundId={currentSoundId}
                                currentTime={state.currentTime}
                            />
                        </div>
                    </Route>
                </Switch>
            </Router>

        </div>
    );
}

export default Canvas;