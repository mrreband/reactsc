// useSound.js
import { useState, useCallback } from 'react';

export default function useSound(defaultSoundId, SoundData) {
    const [currentSoundId, setCurrentSoundId] = useState(defaultSoundId);

    const currentSound = () => {
        return getSoundById(currentSoundId);
    };

    const getSoundById = useCallback((id) => {
        return SoundData.find((s) => s.id.toString() === id.toString());
    }, [SoundData]);

    const setCurrentSound = useCallback((id) => {
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

    // rest of the hook
    return { currentSoundId, currentSound, setCurrentSoundId, setCurrentSound, getSoundById }
}