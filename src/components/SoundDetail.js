import React, { Component } from "react";

export default class SoundDetail extends Component {
    constructor(props) {
        super(props);
        console.log({props: this.props})

        const sound = this.props.SoundData.find((s) => {
            return s.slug.toLowerCase() === "waves" //this.state.trackSlug.toLowerCase();
        });

        this.state = {
            duration: this.props.duration,
            active: false,
            currentTime: 0,
            trackSlug: sound.slug,
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
                {/* <div className="SoundDetail">
                    <PlayButton
                        id={`${this.Sound().id}`}
                        playing={this.state.active}
                        playPause={this.playPause}
                    />
                    <SoundTitle title={this.Sound().title} />
                    <SoundTimer
                        duration={this.Sound().duration}
                        currentTime={
                            this.props.active
                                ? this.props.currentTime
                                : this.state.currentTime
                        }
                    />
                </div>
                <ProgressBar
                    duration={this.Sound().duration}
                    currentTime={
                        this.props.active
                            ? this.props.currentTime
                            : this.state.currentTime
                    }
                    setProgress={this.setProgress.bind(this)}
                /> */}
            </div>
        );
    }
}
