// useSound.js
import { useState, useCallback } from 'react';

export default function useSound(audioPlayer, soundData) {
    const [currentSoundId, setCurrentSoundId] = useState(null);

    const [state, setState] = useState({
        playlists: [],
        currentTime: 0.0
    });

    const getSoundById = useCallback((id) => {
        return soundData.find((s) => s.id.toString() === id.toString());
    }, [soundData]);

    const currentSound = useCallback(() => {
        return getSoundById(currentSoundId);
    }, [getSoundById, currentSoundId]);

    const playPause = useCallback((id) => {
        if (id.toString() === currentSoundId) {
            if (audioPlayer.current.paused) {
                audioPlayer.current.play();
            } else {
                audioPlayer.current.pause();
            }
        } else {
            audioPlayer.current.pause();
            setCurrentSoundId(id.toString());
            const sound = getSoundById(id);
            if (sound !== undefined) {
                audioPlayer.current.src = sound.url;
                audioPlayer.current.play();
            }
        }
    }, [getSoundById, currentSoundId, setCurrentSoundId, audioPlayer]);

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
    }, [audioPlayer]);

    const setNextSound = useCallback(() => {
        const nextId = (parseInt(currentSoundId) + 1).toString();
        setState(prevState => ({ ...prevState, currentTime: 0.0 }));
        playPause(nextId);
    }, [currentSoundId, playPause]);


    return { currentSoundId, currentSound, setCurrentSoundId, getSoundById, setCurrentTime, setProgress, setVolume, setNextSound, playPause, ...state }
}