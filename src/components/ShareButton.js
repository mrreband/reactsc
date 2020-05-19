import React, { Component } from "react";

class ShareButton extends Component {
    shareLink = (e) => {
        e.preventDefault();
        this.props.share();
    };

    render() {
        return (
            <div
                className="ShareButton SoundElement"
                onClick={this.shareLink.bind(this)}
            >
                SHARE
            </div>
        );
    }
}

export default ShareButton;
