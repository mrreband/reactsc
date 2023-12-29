import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Canvas from "./components/Canvas";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path={["/", "/playlists/:playlistSlug"]}>
                            <Canvas />
                        </Route>
                    </Switch>
                </Router>
            </div>
            <Footer />
        </div>
    );
}

export default App;
