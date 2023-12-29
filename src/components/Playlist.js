import Sound from "./Sound";

function Playlist({ tracks, currentSoundId, audioPlayer, playPause, setProgress, currentTime }) {
    return (
        <div className="playlistDiv">
            <audio ref={audioPlayer}>
                {tracks.map((sound) => (
                    <source
                        src={sound.url}
                        type="audio/mpeg"
                        key={sound.id}
                    />
                ))}
            </audio>

            {tracks.map((sound) => (
                <Sound
                    active={sound.id.toString() === currentSoundId}
                    currentSoundId={currentSoundId}
                    currentTime={currentTime}
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

export default Playlist;