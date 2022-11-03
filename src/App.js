import React from "react";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SoundList from "./components/SoundList";
import SubscribeLink from "./components/SubscribeLink";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="appContainer">
                    <div className="PianoPodcastDiv">
                        <h2>Piano Podcast</h2>
                        <SubscribeLink />
                    </div>
                    <SoundList />
                </div>

                <Footer />
            </div>
        );
    }
}

export default App;
