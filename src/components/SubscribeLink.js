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
            if (os === "Android") {
                subscribeUrl =
                    "https://subscribeonandroid.com/feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss";
                subscribeText = "Subscribe to the podcast";
                logo = rss
            } else {
                // ios
                subscribeUrl =
                    "https://podcasts.apple.com/us/podcast/mr-reband-piano-podcast/id1464272392?uo=4&at=1001lsYj";
                subscribeText = "Subscribe on apple podcasts";
                logo = itunes
            }
        }
        this.state = {
            deviceType,
            os,
            subscribeUrl,
            subscribeText,
            logo
        };
    }
    render() {
        const style = {height: "40px", width: "40px"}
        return (
            <div className="SubscribeLink">
                {this.state.deviceType === "mobile" && (
                    <a href={this.state.subscribeUrl}>
                        <img src={this.state.logo} style={style} alt=""/>
                        <button type="button" className="btn btn-info">
                            {this.state.subscribeText}
                        </button>
                    </a>
                )}
            </div>
        );
    }
}

export default SubscribeLink;
