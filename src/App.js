import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Playlist from "./components/Playlist";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <div className="container">
                        <Switch>
                        
                            <Route exact path="/">
                                <Canvas />
                            </Route>
                            
                            <Route path="/playlists/:playlistSlug">
                                <Playlist />
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
