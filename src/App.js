import React from "react";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SoundList from "./components/SoundList";
import DarkModeButton from "./components/styled/DarkModeButton";
import SubscribeLink from "./components/SubscribeLink";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="appDiv">
                    <div className="PianoPodcastDiv">
                        <h2>Piano Podcast</h2>
                        <SubscribeLink />
                        <DarkModeButton />
                    </div>
                    <SoundList />
                </div>

                <Footer />
            </div>
        );
    }
}

export default App;
