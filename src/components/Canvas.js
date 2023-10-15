import React from "react";
import parseRss from "../parseRSS";
import SoundData from "./data.json";
import SoundList from "./SoundList";
import VolumeBar from "./VolumeBar";

import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "./LoadingIndicator";

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
                console.log(this.state.SoundData)
            })
        );
        this.render();
    }

    render() {
        return (
            <div className="musics">
                <LoadingIndicator />

                <SoundList SoundData={this.state.SoundData}/>
            </div>
        );
    }
}

export default Canvas;
