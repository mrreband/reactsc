import React, { Component } from "react";

class ShareButton extends Component {
    constructor(props) {
        super(props);
        this.svg = React.createRef();
    }

    shareLink = (e) => {
        e.preventDefault();
        this.props.share();
    };

    render() {
        return <div className="ShareButton SoundElement">SHARE</div>;
    }
}

export default ShareButton;
