import React, { useState, useEffect } from "react";
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

function Canvas() {
    const [state, setState] = useState({
        SoundData: [],
        playlists: [],
        currentSoundId: "",
        currentTime: 0.0,
        currentVolume: 1.0,
    });

    useEffect(() => {
        trackPromise(
            getRssData().then((result) => {
                const { tracks, playlists } = result;
                setState(prevState => ({
                    ...prevState,
                    SoundData: tracks,
                    playlists: playlists,
                }));
            })
        );
    }, []);

    return (
        <div className="musics">
            <LoadingIndicator />

            <Router>
                <Switch>
                    <Route exact path={["/", "/playlists/:playlistSlug"]}>
                        <Playlist SoundData={state.SoundData} Playlists={state.playlists} />
                    </Route>
                </Switch>
            </Router>

        </div>
    );
}

export default Canvas;