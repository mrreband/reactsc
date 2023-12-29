/**
 * Custom hook to manage sound playback.
 *
 * @param {Object} audioPlayer - A ref object pointing to the audio player.
 * @param {Array} soundData - An array of sound objects, each with an id and url.
 *
 * @returns {Object} An object containing:
 * state:
 * - currentSoundId: The id of the currently active track.
 * - setCurrentSoundId: A function to set the currently selected sound id.
 * - currentTime: The current playback time.
 * - setCurrentTime: A function to set the current playback time.
 * auxiliary:
 * - currentSound:
 * - getSoundById:
 * - setProgress: set playback progress by percentage
 * - setVolume: set volume by percentage
 * - setNextSound: increment the CurrentSoundId by 1
 * - playPause: Toggle play/pause for the provided id
 */
import { useState, useCallback } from 'react';

export default function useSound(audioPlayer, soundData) {
    const [currentSoundId, setCurrentSoundId] = useState(null);
    const [currentTime, setCurrentTime] = useState(0.0);

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

    const setProgress = useCallback((pct) => {
        const newPosition = currentSound().duration * pct;
        audioPlayer.current.currentTime = newPosition;
    }, [currentSound, audioPlayer]);

    const setVolume = useCallback((pct) => {
        audioPlayer.current.volume = pct;
    }, [audioPlayer]);

    const setNextSound = useCallback(() => {
        const nextId = (parseInt(currentSoundId) + 1).toString();
        setCurrentTime(0.0);
        playPause(nextId);
    }, [currentSoundId, playPause]);


    return { currentSoundId, currentSound, setCurrentSoundId, getSoundById, setCurrentTime, setProgress, setVolume, setNextSound, playPause, currentTime }
}