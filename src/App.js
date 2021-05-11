import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SoundList from "./components/SoundList";

class App extends React.Component {
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
                            <Route path="/">
                                <SoundList />
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
