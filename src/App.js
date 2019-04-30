import React from 'react';
import { PlayButton, Timer } from 'react-soundplayer/components';
import { withCustomAudio } from 'react-soundplayer/addons';

var songs = [
	{
		streamUrl: 'http://feeds.soundcloud.com/stream/610950675-michael-reband-waves.mp3',
		trackTitle: 'Waves'
  },
	{
		streamUrl: 'http://feeds.soundcloud.com/stream/423945819-michael-reband-up-1.mp3',
		trackTitle: 'Up'
	}
];

const AWSSoundPlayer = withCustomAudio((props) => {
	const { trackTitle } = props;

	return (
		<div>
			<PlayButton {...props} />
			<h2 style={{ color: 'blue' }}>{trackTitle}</h2>
			<Timer {...props} />
		</div>
	);
});

class App extends React.Component {
	render() {
		return <AWSSoundPlayer streamUrl={songs[1].streamUrl} trackTitle={songs[1].trackTitle} preloadType="auto" />;
	}
}

export default App;
