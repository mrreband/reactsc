import React from "react";
import "./App.scss"

import Header from "./components/Header";
import Footer from "./components/Footer";

import SoundList from "./components/SoundList";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <SoundList />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
