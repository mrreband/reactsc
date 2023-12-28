import React, { useRef } from "react";

function ProgressBar(props) {
    const progressBar = useRef(null);
    const progressBarContainer = useRef(null);

    const getProgress = (currentTime, duration) => {
        let currentProgress = Math.min((currentTime / duration) * 100, 100);
        return currentProgress.toString() + "%";
    };

    const ScrubberClick = (e) => {
        var fullWidth = progressBarContainer.current.offsetWidth;
        var newWidth = e.clientX - progressBarContainer.current.offsetLeft;
        var pct = newWidth / fullWidth;
        props.setProgress(pct);
    };

    var currentProgress = getProgress(
        props.currentTime,
        props.duration
    );

    return (
        <div
            className="ProgressBarContainer"
            onClick={ScrubberClick}
            ref={progressBarContainer}
        >
            <div
                className="ProgressBar"
                style={{ width: currentProgress }}
                onClick={ScrubberClick}
                ref={progressBar}
            />
        </div>
    );
}

export default ProgressBar;