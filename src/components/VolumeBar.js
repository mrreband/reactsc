import React from 'react';
import volumeIcon from "../img/speaker_icon.svg";

function VolumeBar(props) {
    const VolumeChange = (event) => {
        props.setVolume(event.target.value / 100);
    };

    return (
        <div className="VolumeBarContainer">
            <img src={volumeIcon} height="30px" width="30px" alt="" />
            <input className="VolumeBar" type="range" min="0" max="100" onChange={VolumeChange} />
        </div>
    );
}

export default VolumeBar;