import React from "react";
import parseRss from "../parseRSS";
import SoundData from "./data.json";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "./LoadingIndicator";
import Playlist from "./Playlist";

function getRssData() {
    var result = parseRss();
    if (result) {
        return result;
    } else {
        return { tracks: SoundData };
    }
}

class Canvas extends React.Component {
    constructor() {
        super();

        this.state = {
            SoundData: [],
            playlists: [],
            currentSoundId: "",
            currentTime: 0.0,
            currentVolume: 1.0,
        };
    }

    async componentWillMount() {
        trackPromise(
            getRssData().then((result) => {
                const { tracks, playlists } = result;
                this.setState({
                    SoundData: tracks,
                    playlists: playlists,
                });
            })
        );
        this.render();
    }

    render() {
        return (
            <div className="musics">
                <LoadingIndicator />

                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Playlist SoundData={this.state.SoundData} Playlists={this.state.playlists} />
                        </Route>
                        <Route path="/playlists/:playlistSlug">
                            <Playlist SoundData={this.state.SoundData} Playlists={this.state.playlists} />
                        </Route>
                        <Route path="/tracks/:trackSlug">
                            <Playlist SoundData={this.state.SoundData} Playlists={this.state.playlists} />
                        </Route>
                    </Switch>
                </Router>

            </div>
        );
    }
}

export default Canvas;
