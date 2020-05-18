import React, { Component } from "react";
import PlayButton from "./PlayButton.js";
import SoundTitle from "./SoundTitle.js";
import SoundTimer from "./SoundTimer.js";
import ProgressBar from "./ProgressBar.js";

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
                </div>
                <ProgressBar
                    duration={this.state.duration}
                    currentTime={this.state.currentTime}
                />
            </div>
        );
    }
}
