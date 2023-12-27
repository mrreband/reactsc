import React from "react";
import parseRss from "../parseRSS";
import SoundData from "./data.json";
import SoundList from "./SoundList";
import VolumeBar from "./VolumeBar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "./LoadingIndicator";
import Playlist from "./Playlist";

function getRssData() {
    var songs = parseRss();
    if (songs) {
        return songs;
    } else {
        return SoundData;
    }
}

class Canvas extends React.Component {
    constructor() {
        super();

        this.state = {
            SoundData: [],
            currentSoundId: "",
            currentTime: 0.0,
            currentVolume: 1.0,
        };
    }

    async componentWillMount() {
        trackPromise(
            getRssData().then((songs) => {
                this.setState({
                    SoundData: songs,
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
                            <SoundList SoundData={this.state.SoundData} Title="Piano Podcast" />
                        </Route>
                        <Route path="/playlists/:playlistSlug">
                            <Playlist SoundData={this.state.SoundData} />
                        </Route>
                    </Switch>
                </Router>

            </div>
        );
    }
}

export default Canvas;
