// useSound.js
import { useState, useCallback } from 'react';

export default function useSound(audioPlayer, SoundData) {
    const [currentSoundId, setCurrentSoundId] = useState(null);

    const [state, setState] = useState({
        SoundData: [],
        playlists: [],
        currentTime: 0.0,
        currentVolume: 1.0
    });

    const getSoundById = useCallback((id) => {
        return SoundData.find((s) => s.id.toString() === id.toString());
    }, [SoundData]);

    const currentSound = useCallback(() => {
        return getSoundById(currentSoundId);
    }, [getSoundById, currentSoundId]);

    const setCurrentSound = useCallback((id) => {
        //todo: I don't think we're using this active attribute - playlist calculates active and passes that as a prop to sound
        const toggleActive = (id) => {
            const sound = getSoundById(id);
            sound.active = !sound.active;
        };

        if (currentSoundId) {
            toggleActive(currentSoundId);
        } else {
            toggleActive(id);
        }
        setCurrentSoundId(id.toString());
    }, [currentSoundId, getSoundById]);

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
    }, [getSoundById, currentSoundId, setCurrentSound, audioPlayer]);

    const setCurrentTime = useCallback(() => {
        let newTime = audioPlayer.current.currentTime;
        setState(prevState => ({ ...prevState, currentTime: newTime }));
    }, [audioPlayer]);

    const setProgress = useCallback((pct) => {
        const newPosition = currentSound().duration * pct;
        audioPlayer.current.currentTime = newPosition;
    }, [currentSound, audioPlayer]);

    const setVolume = useCallback((pct) => {
        audioPlayer.current.volume = pct;
        setState(prevState => ({ ...prevState, currentVolume: pct }));
    }, [audioPlayer]);

    const setNextSound = useCallback(() => {
        const nextId = (parseInt(currentSoundId) + 1).toString();
        setState(prevState => ({ ...prevState, currentTime: 0.0 }));
        playPause(nextId);
    }, [currentSoundId, playPause]);


    return { currentSoundId, currentSound, setCurrentSoundId, setCurrentSound, getSoundById, setCurrentTime, setProgress, setVolume, setNextSound, playPause, ...state }
}