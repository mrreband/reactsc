import React, { Component } from "react";
import PlayButton from "./PlayButton.js";
import ProgressBar from "./ProgressBar.js";
import SoundTimer from "./SoundTimer.js";
import SoundTitle from "./SoundTitle.js";

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

    render() {
        return (
            <div>
                <div className={`Sound ${
                this.props.active === true ? "active" : ""
            }`}>
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
