import React, { Component } from "react";
import PlayButton from "./PlayButton.js";
import ProgressBar from "./ProgressBar.js";
import SoundTimer from "./SoundTimer.js";
import SoundTitle from "./SoundTitle.js";

export default class SoundDetail extends Component {
    constructor(props) {
        super(props);
        console.log({props})

        const trackSlug = this.props.trackSlug;
        const sound = this.props.SoundData.find((s) => {
            return s.slug.toLowerCase() === trackSlug.toLowerCase();
        });

        this.state = {
            duration: this.props.duration,
            active: false,
            currentTime: 0,
            trackSlug,
            sound,
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
                <div className="SoundDetail">
                    <PlayButton
                        id={`${this.state.trackSlug}`}
                        playing={this.state.active}
                        playPause={this.playPause}
                    />
                    <SoundTitle title={this.state.sound.title} />
                    <SoundTimer
                        duration={this.state.sound.duration}
                        currentTime={
                            this.props.active
                                ? this.props.currentTime
                                : this.state.currentTime
                        }
                    />
                </div>
                <ProgressBar
                    duration={this.state.sound.duration}
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
