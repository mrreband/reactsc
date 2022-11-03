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
                                <div class="linkDiv">
                                    <a
                                        className="link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://open.spotify.com/artist/2qFU2QneC3YZ32Qd6vGFAj?si=ZP_c9L3LQWCEC_lG_vQk8A"
                                    >
                                        <Spotify />
                                    </a>
                                </div>
                                <div className="linkDiv">
                                    <a
                                        className="link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://podcasts.apple.com/us/podcast/mr-reband-piano-podcast/id1464272392"
                                    >
                                        <ApplePodcast />
                                    </a>
                                </div>
                                <div class="linkDiv">
                                    <a
                                        className="link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://soundcloud.com/michael-reband"
                                    >
                                        <SoundCloud />
                                    </a>
                                </div>
                                <div class="linkDiv">
                                    <a
                                        className="link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="http://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss"
                                    >
                                        <RSS />
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
