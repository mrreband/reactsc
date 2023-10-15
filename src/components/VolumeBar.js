import React, { Component } from "react";
import volumeIcon from "../img/speaker_icon.svg";

export default class VolumeBar extends Component {
    constructor(props) {
        super(props);
        this.volumeBar = React.createRef();
        this.volumeBarContainer = React.createRef();

        this.state = {
            volume: 100,
        };
    }

    VolumeChange = (event) => {
        this.setState({value: event.target.value});
        this.props.setVolume(event.target.value / 100);
    };

    render() {
        return (
            <div
                className="VolumeBarContainer"
                ref={this.volumeBarContainer}
            >
                <img src={volumeIcon} height="30px" width="30px" alt="" />
                <input className="VolumeBar" type="range" min="0" max="100" onChange={this.VolumeChange}/>

            </div>
        );
    }
}
