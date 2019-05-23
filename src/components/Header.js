import React from "react";
import spotify from "../img/spotify.svg";
import soundcloud from "../img/soundcloud.svg";
import itunes from "../img/itunes.svg";
import rss from "../img/rss.svg";
import logo from "../img/mr.svg"
// import itunes from "../img/itunes.svg";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container">
          <a href="/">
            <h1>
              <img src={logo} alt="mr.Reband's logo" className="logo"/>
            </h1>
          </a>
          <div className="bottom">
            <ul className="feeds">
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://open.spotify.com/artist/2qFU2QneC3YZ32Qd6vGFAj?si=ZP_c9L3LQWCEC_lG_vQk8A"
                >
                  <img src={spotify} alt="" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://podcasts.apple.com/us/podcast/mr-reband-piano-podcast/id1464272392"
                >
                  <img src={itunes} alt="" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://soundcloud.com/michael-reband"
                >
                  <img src={soundcloud} alt="" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss"
                >
                  <img src={rss} alt="" />
                </a>
                {/* <img src={itunes} alt="" /> */}
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
