import React, { Component } from "react";
import PlayButton from "./PlayButton.js";
import SoundTitle from "./SoundTitle.js";
import ShareButton from "./ShareButton.js";
import SoundTimer from "./SoundTimer.js";
import ProgressBar from "./ProgressBar.js";

// todo: add a share icon

export default class Sound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: this.props.duration,
            currentTime: 0,
        };
    }

    playPause = () => {
        this.props.playPause(this.props.id);
    };

    setProgress = (pct) => {
        this.props.setProgress(pct);
    };

    share = () => {
        console.log(`sharing this url: ${this.props.url}`);
    };

    render() {
        return (
            <div>
                <div className="Sound">
                    <PlayButton
                        id={`${this.props.id}`}
                        playing={this.props.active}
                        playPause={this.playPause}
                    />
                    <SoundTitle title={this.props.title} />
                    <SoundTimer
                        duration={this.state.duration}
                        currentTime={
                            this.props.active
                                ? this.props.currentTime
                                : this.state.currentTime
                        }
                    />
                    <ShareButton share={this.share} />
                </div>
                <ProgressBar
                    duration={this.state.duration}
                    currentTime={
                        this.props.active
                            ? this.props.currentTime
                            : this.state.currentTime
                    }
                    setProgress={this.setProgress.bind(this)}
                />
            </div>
        );
    }
}
