import React from 'react';
import PlayButton from "./PlayButton.js";
import ProgressBar from "./ProgressBar.js";
import SoundTimer from "./SoundTimer.js";
import SoundTitle from "./SoundTitle.js";

function Sound(props) {
    const playPause = () => {
        props.playPause(props.id);
    };

    const setProgress = (pct) => {
        props.setProgress(pct);
    };

    return (
        <div>

            <div className={`Sound ${props.active === true ? "active" : ""}`}>
                <PlayButton
                    id={`${props.id}`}
                    playing={props.active}
                    playPause={playPause}
                />
                <SoundTitle title={props.title} />
                <SoundTimer
                    duration={props.duration}
                    currentTime={props.active ? props.currentTime : 0}
                />
            </div>
            <ProgressBar
                duration={props.duration}
                currentTime={props.active ? props.currentTime : 0}
                setProgress={setProgress}
            />
        </div>
    );
}

export default Sound;