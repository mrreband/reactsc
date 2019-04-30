import React from 'react';
import { PlayButton, Timer } from 'react-soundplayer/components';

// it's just an alias for `withSoundCloudAudio` but makes code clearer
import { withCustomAudio } from 'react-soundplayer/addons';

// audio source
const streamUrl = 'http://feeds.soundcloud.com/stream/610950675-michael-reband-waves.mp3';

// some track meta information
const trackTitle = 'Great song by random artist';

const AWSSoundPlayer = withCustomAudio(props => {
  const { trackTitle } = props;

  return (
    <div>
      <PlayButton {...props} />
      <h2 style={{color:'blue'}}>{trackTitle}</h2>
      <Timer {...props} />
    </div>
  );
});

class App extends React.Component {
  render() {
    return (
      <AWSSoundPlayer
        streamUrl={streamUrl}
        trackTitle={trackTitle}
        preloadType="auto" />
    );
  }
}

export default App;