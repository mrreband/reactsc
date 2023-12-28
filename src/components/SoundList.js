import React, { useState, useRef, useEffect, useCallback } from "react";
import Sound from "./Sound";
import VolumeBar from "./VolumeBar";

function SoundList({ SoundData, Title }) {
    const audioPlayer = useRef(null);

    const [state, setState] = useState({
        currentSoundId: "",
        currentTime: 0.0,
        currentVolume: 1.0,
    });

    const currentSound = () => {
        return getSoundById(state.currentSoundId);
    };

    const getSoundById = useCallback((id) => {
        return SoundData.find((s) => s.id.toString() === id.toString());
    }, [SoundData]);

    const setCurrentSound = useCallback((id) => {
        const toggleActive = (id) => {
            const sound = getSoundById(id);
            sound.active = !sound.active;
        };

        if (state.currentSoundId) {
            toggleActive(state.currentSoundId);
        } else {
            toggleActive(id);
        }
        setState(prevState => ({ ...prevState, currentSoundId: id.toString() }));
    }, [state.currentSoundId, getSoundById]);

    const playPause = useCallback((id) => {
        if (id.toString() === state.currentSoundId) {
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
    }, [getSoundById, state.currentSoundId, setCurrentSound]);

    const setNextSound = useCallback(() => {
        const nextId = (parseInt(state.currentSoundId) + 1).toString();
        playPause(nextId);
    }, [state.currentSoundId, playPause]);

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

    useEffect(() => {
        if (audioPlayer.current) {
            audioPlayer.current.onended = setNextSound;
            audioPlayer.current.ontimeupdate = setCurrentTime;
        }
    }, [setNextSound, setCurrentTime]);

    return (
        <div className="musics">
            <div className="PianoPodcastDiv">
                <h2>{Title}</h2>

                <VolumeBar
                    setVolume={setVolume}
                    volume={state.currentVolume}
                />
            </div>

            <audio ref={audioPlayer}>
                {SoundData.map((sound) => (
                    <source
                        src={sound.url}
                        type="audio/mpeg"
                        key={sound.id}
                    />
                ))}
            </audio>

            {SoundData.map((sound) => (
                <Sound
                    active={sound.id.toString() === state.currentSoundId}
                    currentSoundId={state.currentSoundId}
                    currentTime={state.currentTime}
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

export default SoundList;