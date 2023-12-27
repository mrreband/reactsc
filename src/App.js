import React from "react";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Canvas from "./components/Canvas";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="container">
                    <Canvas />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
