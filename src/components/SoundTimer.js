import React from "react";

function SoundTimer(props) {
  const getDisplayLength = duration => {
    var minutes = Math.floor(duration / 60);
    var remainingSeconds = duration % 60;
    return `${minutes}:${("00" + remainingSeconds).slice(-2)}`;
  };

  var duration = getDisplayLength(props.duration);
  var currentTime = getDisplayLength(Math.ceil(props.currentTime));

    return (
      <div className="SoundTimer SoundElementText">
        <h5>
          {currentTime} / {duration}
        </h5>
      </div>
    );
}

export default SoundTimer;
