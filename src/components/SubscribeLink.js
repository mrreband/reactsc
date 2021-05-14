import React from "react";
import itunes from "../img/itunes.svg";
import rss from "../img/rss.svg";
const { GetOS, GetDeviceType } = require("./util");

class SubscribeLink extends React.Component {
    constructor(props) {
        super(props);
        const deviceType = GetDeviceType();
        const os = GetOS();
        let subscribeUrl = "";
        let subscribeText = "";
        let logo = undefined;
        if (deviceType === "mobile") {
            if (os === "Mac/iOS") {
                // ios
                subscribeUrl =
                    "https://podcasts.apple.com/us/podcast/mr-reband-piano-podcast/id1464272392?uo=4&at=1001lsYj";
                subscribeText = "Subscribe on apple podcasts";
                logo = itunes;
            } else {
                subscribeUrl =
                    "http://subscribeonandroid.com/feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss";
                subscribeText = "Subscribe with your podcast app";
                logo = rss;
            }
        }
        this.state = {
            deviceType,
            os,
            subscribeUrl,
            subscribeText,
            logo,
        };
    }
    render() {
        return (
            <div className="SubscribeLink">
                {/* {this.state.deviceType === "mobile" && (
                    <a href={this.state.subscribeUrl}>
                        <button type="button" className="btn btn-info">
                            {this.state.deviceType} | {this.state.os}
                        </button>
                    </a>
                )} */}
            </div>
        );
    }
}

export default SubscribeLink;
