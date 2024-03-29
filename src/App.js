import React from "react";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SoundList from "./components/SoundList";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="container">
                    <SoundList />
                </div>

                <Footer />
            </div>
        );
    }
}

export default App;
