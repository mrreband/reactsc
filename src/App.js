import React from "react";
import { trackPromise } from "react-promise-tracker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import SoundData from "./components/data.json";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SoundDetail from "./components/SoundDetail";
import SoundList from "./components/SoundList";
import parseRss from "./parseRSS";

async function getRssData() {
    var songs = await parseRss();
    console.log({ songs });
    if (songs) {
        return songs;
    } else {
        return SoundData;
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {SoundData: []}
        trackPromise(
            getRssData().then((songs) => {
                this.setState({ SoundData: songs })
            })
        );
        this.render();


    }
    async componentDidMount() {
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <div className="container">
                        <div className="PianoPodcastDiv">
                            <h2>Piano Podcast</h2>
                        </div>

                        <Switch>
                            <Route exact path="/about">
                                <div>this is an about page</div>
                            </Route>
                            <Route
                                exact
                                path="/:trackSlug"
                                render={(props) => (
                                    <SoundDetail
                                        trackSlug={props.match.params.trackSlug}
                                        SoundData={this.state.SoundData}
                                    >
                                        this is a detail page
                                    </SoundDetail>
                                )}
                            ></Route>
                            <Route path="/">
                                <SoundList SoundData={this.state.SoundData} />
                            </Route>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
