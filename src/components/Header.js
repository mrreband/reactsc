import React from "react";
import logo from "../img/mr.svg";
import { Spotify } from "./styled/Spotify";
import { SoundCloud } from "./styled/SoundCloud";
import { ApplePodcast } from "./styled/ApplePodcast";
import { RSS } from "./styled/RSS";

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="headerContainer">
                    <a href="/">
                        <h1>
                            <img src={logo} alt="mr.Reband" className="logo" />
                        </h1>
                    </a>

                    <div>
                        <ul className="feeds">
                            <li>
                                <Spotify />
                                <ApplePodcast />
                                <SoundCloud />
                                <RSS />
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
