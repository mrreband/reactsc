import React from "react";
import spotify from "../img/spotify.svg";


class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="container">
        <div className="logo">
            <h1>mr.Reband</h1>
        </div>
        <div className="bottom">
          <ul className="feeds">
            <li>
                <a href="https://open.spotify.com/artist/2qFU2QneC3YZ32Qd6vGFAj?si=ZP_c9L3LQWCEC_lG_vQk8A">
                  <img src={spotify} alt=""/>
                </a>
            </li>
          </ul>
        </div>
        </div>
      </header>
    );
  }
}

export default Header;
